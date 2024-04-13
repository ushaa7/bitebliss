const { Sequelize, }  = require('@sequelize/core');


const sequelize = new Sequelize(
 'bytebliss',
 'root',
 '1234',
  {
    host: 'localhost',
    dialect: 'mysql'
  },
);


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
   
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize