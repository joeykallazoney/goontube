/**
 * @module Exports a User class which describes the model of user account information.
 * @since 1.0.0
 */
import Sequelize from 'sequelize'
import hash from '../hash'
import config from '../../config'

/**
 * @class Abstracts data and interaction with User accounts.
 * @since 1.0.0
 */
class User {
    /**
     * @function Given a valid database handle, return an object mapping of
     * its schema definition for Sequelize.
     * @param db {Sequelize} Valid Sequelize database handle.
     */
    static createSchema(db) {
        return db.define('user', {
            username:       Sequelize.STRING,
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
        }
    }

    /**
     * @function Class constructor for a User instance.  Given a valid database
     * handle and a username, the server will attempt to populate this object
     * with the latest information from the database.
     */
    constructor(db, username) {
        this._schema = User.createSchema(db)
        this._user   = this._schema.findAll({
            where: {
                username: username
            }
        })
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

        }
        return false
    }
}

export default User
