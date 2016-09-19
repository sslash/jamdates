const pgUrl = process.env.DATABASE_URL || 'postgres://postgres@localhost/jamdates_dev';
const rabbitUrl = process.env.CLOUDAMQP_URL || 'amqp://localhost';


const config = Object.assign({
    pgUrl,
    rabbitUrl,
    isDev: process.env.NODE_ENV !== 'production',
},

process.env);

module.exports = config;
