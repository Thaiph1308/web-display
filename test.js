
var sqlite = require('sqlite3').verbose()
let sql_read_all_table = "SELECT * FROM WEGEN_DB"

function read_entire_db(callback){
    let db = new sqlite.Database('test.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    db.serialize(function() {
        db.all(sql_read_all_table, (err, rows) => {
            if (err) {
                return;
            }
            console.log(typeof(rows))
            return callback(rows)
        });
    })
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
function read_db(req, res){
    read_entire_db((data)=>{
        res.json(data)
    })
}
const express = require('express')
const app = express()
const port = 3000
app.get('/', function(req, res) {read_db(req, res)})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))