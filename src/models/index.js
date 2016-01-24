export default {
    user: (db) => db.define('user', {
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
    }),
    video: (db) => db.define('video', {})
}
