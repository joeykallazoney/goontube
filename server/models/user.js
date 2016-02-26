/**
 * @module Exports a User class which describes the model of user account information.
 * @since 1.0.0
 */
import Sequelize from 'sequelize'
import hash from '../../shared/hash'
import config from '../../config'

/* Flags that line up in order with oldtubes' permission bitmasks for users */
const bitOrderedLegacyPermissionFlags = [
    'LEAD',
    'BUMP',
    'DELETE',
    'KICK',
    'BAN',
    'RESTART',
    'CLEAN',
    'SKIP',
    'LOCK',
    'RANDOM',
    null,
    'SETSKIP',
    'POS',
    'MOTD',
    'PURGE',
    'AUTOLEAD',
    'AUTOSKIP',
    'POLL',
    'BLACKLIST',
    'IMPORT',
    'ADD',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

/**
 * @class Abstracts data and interaction with User accounts.
 * @since 1.0.0
 */
class User {
    /**
     * @function Given a valid database handle, return an object mapping of
     * its schema definition for Sequelize.
     * @param {Sequelize} db - Valid Sequelize database handle.
     */
    static createSchema(db) {
        return db.define('user', {
            username: {
                type:           Sequelize.STRING,
                primaryKey:     true
            },
            password:           Sequelize.STRING,
            email:              Sequelize.STRING,
            permissions:        Sequelize.INTEGER,
            ignoring:           Sequelize.STRING,
            last_ip:            Sequelize.STRING,
            karma:              Sequelize.INTEGER,
            bio:                Sequelize.STRING,
            avatar_url:         Sequelize.STRING,
            reset_auth:         Sequelize.STRING,
            start_ban_at:       Sequelize.DATE,
            ban_duration:       Sequelize.INTEGER,
            last_seen_at:       Sequelize.DATE,
            time_spent:         Sequelize.INTEGER,
            json_data:          Sequelize.STRING
        }, {
            tableName:          'users',
            timestamps:         false
        })
    }

    /**
     * @function Takes an integer value and returns its equivalent list of permissions.
     * @param {number} permissions - An integer from oldtubes representing user permissions.
     * @returns A list of strings representing permissions granted by the provided value.
     */
    static toPermissionsList(oldPermissions) {
        let permissions = []
        for(let i = 0; i < 32; i++) {
            if(((oldPermissions >>> i) & 0x1)
            && null !== bitOrderedLegacyPermissionFlags[i]) {
                permissions.push(bitOrderedLegacyPermissionFlags[i])
            }
        }

        return permissions
    }

    /**
     * @function Class constructor for a User instance.  Given a valid database
     * handle and a username, the server will attempt to populate this object
     * with the latest information from the database.
     */
    constructor(serverContext) {
        this.context    = serverContext
    }

    /**
     * @function Returns whether or not a User has a given permission.
     * @param permission {String} Permission to check the user's privileges for.
     */
    userHasPermission(permission) {
        try {
            if(this._permissions.includes(permission.toUpperCase())) {
                return true
            }
        } catch(e) {
        }

        return false
    }

    hasLegacyPasswordHash() {
        if(null !== this.user
        && null !== this.user.password
        && this.user.password.length == 32) {
            return true
        }

        return false
    }

    static create(context, username, hash, email) {
        return new Promise((res, rej) => {
            if(null === hash || !hash.length) {
                rej('Hash missing?')
                return
            }

            if(null === username || username.length < 3) {
                rej('Usernames must be at least three characters long.')
                return
            }

            // TODO: calculate extra salt w a server secret 
            context.data
                .User
                .create({
                    username:       username,
                    password:       hash,
                    email:          '',
                    permissions:    0,
                    ignoring:       '',
                    last_ip:        '',
                    karma:          0,
                    bio:            '',
                    start_ban_at:   0,
                    ban_duration:   0,
                    last_seen_at:   Date.now(),
                    time_spent:     0,
                    json_data:      ''
                })
                .then(user => {
                    console.log(`New user created: ${username}`)
                    res(user)
                })
                .catch((err) => {
                    console.dir(err)

                    if(err.name === 'SequelizeUniqueConstraintError') {
                        rej(`username is already in use.`)
                    }
                })
        })
    }

    loadByUsername(username) {
        return new Promise((res, rej) => {
            this.context.data
                .User
                .findOne({ where: { username: username } })
                .then(user => {
                    if(user) {
                        this.user = user
                        this.username = user.dataValues.username

                        if(this.hasLegacyPasswordHash()) {
                            this.legacy = true
                        }

                        res(this)
                        return
                    } else {
                        rej(null)
                        return
                    }
                })
        }, (err) => {
            console.log(`Failed to populate from database: ${err.toString()}`)
            rej(err)
        })
    }

    serialize() {
        try {
            this.user.save()
        } catch (e) {
        }
    }

    /**
     * @function Checks whether or not the given password matches the stored password
     * hash.
     * @param {String} pwdHash is a salted SHA-512 hash of the user's password.
     */
    authenticate(pwdHash) {
        if(null === this.user) {
            return false
        }

        if(pwdHash !== this.user.password) {
            return false
        }

        this._legacyPermission = User.toPermissionsList(this.user.permissions)
        this._permissions = [...this._legacyPermission]
        this._auth = true
        return true
    }
}

export default User
