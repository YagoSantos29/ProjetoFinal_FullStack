import { Sequelize } from "sequelize";

const banco = new Sequelize('escola' , 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

export async function setup() {
    try {
        const temp = new Sequelize('', 'root', 'senai', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            logging: false

        });
        await temp.authenticate();

        await temp.query(`
            CREATE DATABASE IF NOT EXISTS Escola
        `);

        logger.info('Banco criado com sucesso!');

        await temp.close();

        await banco.authenticate();

        logger.info('Conectado ao banco');

        await banco.sync({ alter: true });

        logger.info('Tabelas sincronizadas');
    } catch (error) {
        console.error(error);
    }
}
    export default banco;