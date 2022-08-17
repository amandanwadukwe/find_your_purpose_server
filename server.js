const express = require("express");
const { Pool } = require('pg');
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());

const {parsed:config} = dotenv.config();

const pool = new Pool({
    user:config.USER,
    host:config.HOST,
    database:config.DATABASE,
    password:config.PASSWORD,
    port:config.PORT
})

//Returns all courses
app.get("/courses", (req,res) => {
    pool.query('SELECT * FROM courses')
    .then(result=>res.json(result.rows))
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})
//--------------------- Account ------------------------------

//Returns all accounts
app.get("/", (req,res) => {
    pool.query('SELECT * FROM accounts')
    .then(result=>{
        res.json(result.rows)
    })
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})
app.get("/:emailAndPassword", (req,res) => {
    // const emailAndPassword = req.params.emailAndPassword.split("-");
    pool.query('SELECT * FROM accounts')
    .then(result=>{
        const emailAndPassword = req.params.emailAndPassword.split("-");
        // res.json({email:emailAndPassword[0],
        // password:emailAndPassword[1]})
        res.json(result.rows.filter(account => account.email === emailAndPassword[0] && account.account_password === emailAndPassword[1]))
    })
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})

app.get("/account/:email", (req,res) => {
    pool.query('SELECT * FROM accounts')
    .then(result=>res.json(result.rows.filter(account => account.email === req.params.email)))
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})

//Ceate an account
app.post("/account", (req,res)=> {
    pool.query(`INSERT INTO accounts(first_name,last_name,email,account_password, enrolled_courses) VALUES ('${req.first_name}', '${req.last_name}', '${req.email}',crypt('${req.password}', gen_salt('bf')), '{}');`)
})

//--------------------- Courses ------------------------------



app.listen(5000, ()=>{
    console.log('Server is listening on port 5000')
})