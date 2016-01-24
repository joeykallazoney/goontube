/**
 * @module Exports a User class which describes the model of user account information.
 * @since 1.0.0
 */
import Sequelize from 'sequelize'
import hash from '../hash'
import config from '../../config'
import { user, video } from './'

const userSchema = user(sequelize)

/**
 * @class Abstracts data and interaction with User accounts.
 * @since 1.0.0
 */
class User {
    constructor(db, username) {
        /*
         * Fill a _user object all fields for the matching user.
         */
        this._user = userSchema.findAll({
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

        if(this._user.password == pwdHash) {
            return true
        }

        return false
    }
}

export default User
