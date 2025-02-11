import {Sequelize} from "sequelize";

export const sequelize=new Sequelize('demo','newUser','password',{
    host:'127.0.0.1',
    dialect:'mysql'
});
export const dbConnection=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Db connection established');
    } catch (error) {
        console.log('Unable to connect',error);
    }
}