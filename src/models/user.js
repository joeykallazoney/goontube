/**
 * @module Exports a User class which describes the model of user account information.
 * @since 1.0.0
 */
import Sequelize from 'sequelize'
import hash from '../hash'
import config from '../../config'

const legacyPermissionBitMasks = {
    LEAD:       {bitmask: (1      ), legend: 'O'},
    BUMP:       {bitmask: (1  << 1), legend: 'B'},
    DELETE:     {bitmask: (1  << 2), legend: 'D'},
    KICK:       {bitmask: (1  << 3), legend: 'K'},
    BAN:        {bitmask: (1  << 4), legend: 'Q'},
    RESTART:    {bitmask: (1  << 5), legend: 'R'},
    CLEAN:      {bitmask: (1  << 6), legend: 'C'}
}

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
            password:       Sequelize.STRING,
            email:          Sequelize.STRING,
            permissions:    Sequelize.INTEGER,
            ignoring:       Sequelize.STRING,
            last_ip:        Sequelize.STRING,
            karma:          Sequelize.INTEGER,
            bio:            Sequelize.STRING,
            avatar_url:     Sequelize.STRING,
            reset_auth:     Sequelize.STRING,
            start_ban_at:   Sequelize.DATE,
            ban_duration:   Sequelize.INTEGER,
            last_seen_at:   Sequelize.DATE,
            time_spent:     Sequelize.INTEGER,
            json_data:      Sequelize.STRING
        })
    }

    /**
     * @function Class constructor for a User instance.  Given a valid database
     * handle and a username, the server will attempt to populate this object
     * with the latest information from the database.
     */
    constructor(serverContext, username) {
        this._auth   = false
        this._user   = serverContext.data.User.findOne({
            where: {
                username: username
            }
        })
    }

    /**
     * @function Returns whether or not a User has a given permission.
     * @param permission {String} Permission to check the user's privileges for.
     */
    userHasPermission(permission) {
        return false
    }

    /**
     * @function Ensures that changes to this User instance are reflected back
     * to the Sequelize model and synchronized to the server database.
     */
    serialize() {
        try {
            this._user.save()
        } catch (e) {
        }
    }

    /**
     * @function Checks whether or not the given password matches the stored password
     * hash.
     * @param {String} pwdHash is a salted SHA-512 hash of the user's password.
     */
    authenticate(pwdHash) {
        if(null === this._user) {
            return false
        }

        if(pwdHash === this._user.password) {
            return (this._auth = true)
        }
        return false
    }
}

export default User
