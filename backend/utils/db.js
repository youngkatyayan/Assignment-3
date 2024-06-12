import mysql from 'mysql'

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"registration"
})
export default db;