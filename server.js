const express = require("express");
const { Pool } = require('pg');
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());
// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
    const emailAndPassword = req.params.emailAndPassword.split("-");
        console.log(emailAndPassword)
    pool.query(`SELECT * FROM accounts WHERE email='${emailAndPassword[0]}' AND account_password=crypt('${emailAndPassword[1]}', account_password);`)
    .then(result=>{
        
        
        res.json(result.rows)
    })
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})

app.get("/account/:email", (req,res) => {
    pool.query('SELECT * FROM accounts;')
    .then(result=>{
        res.json(result.rows.filter(account => account.email === req.params.email))})
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})

//Ceate an account
app.post("/account", (req,res)=> {
    pool.query(`INSERT INTO accounts(first_name,last_name,email,account_password, enrolled_courses, notes, pronouns, nickname, settings, classroom_contributions) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}',crypt('${req.body.account_password}', gen_salt('bf')), '{}','{}','','','{}', '{}');`)
    .then(result=>{
        res.json(result)
    })
    .catch(error=> {
        console.error(error);
        res.status(500).json(error)
    })
})


//Update last page viewed
app.post("/last-viewed-page", (req,res)=> {
    pool.query(`UPDATE accounts SET enrolled_courses='{{${req.body.activeCourseCode},${req.body.activeChapterNumber},${req.body.activePageNumber}}}' WHERE email='${req.body.email}';`)
    .then(result => console.log("Result: ", result))
    .catch(err => console.log("Error: ", err))
})

//Update name
app.post("/name", (req,res)=>{
    pool.query(`UPDATE accounts SET first_name='${req.body.new_first_name}', last_name='${req.body.new_last_name}' WHERE email='${req.body.new_first_name}';`)
    .then(result => console.log("Result: ", result))
    .catch(err => console.log("Error: ", err))
})

//--------------------- Courses ------------------------------



app.listen(5000, ()=>{
    console.log('Server is listening on port 5000')
})