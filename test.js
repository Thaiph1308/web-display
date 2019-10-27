
var sqlite = require('sqlite3').verbose()
var cors = require('cors')
let sql_read_all_table = "SELECT * FROM WEGEN_DB"
var convert = require('xml-js');

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
            for (i = 0 ; i < rows.length; i++){
                rows[i]['Payload'] = JSON.parse(rows[i]['Payload'])
            }
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
    res.set('Content-Type', 'text/json')
    read_entire_db((data)=>{
        res.json(data[1])
        console.log(data[1])
    })
}
const express = require('express')
const app = express()
app.use(cors())
const port = 8080

app.get('/', (req, res) => (read_db(req,res)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))