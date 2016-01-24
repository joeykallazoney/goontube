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
    static schema(db) {
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

    constructor(db, username) {
        this._schema = User.schema(db)
        this._user   = this._schema.findAll({
            where: {
                username: username
            }
        })
    }

    serialize() {
        try {
            this._user.save()
        } catch (e) {
        }
    }

    authenticate(pwdHash) {
        if(null === this._user) {
            return false
        }

        return false
    }
}

export default User
