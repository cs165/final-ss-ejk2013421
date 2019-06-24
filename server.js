const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');
var sha1 = require('sha1');

const key = require('./privateSettings.json');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
// const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
const SPREADSHEET_ID = '1E8tN0rzSSECdtp6l9-i5q7RpJKycQPJrewfEnLhzeNs';
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
// const SPREADSHEET_ID = '__YOUR__SPREADSHEET__ID__HERE__';
// const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

// TODO(you): Add at least 1 GET route and 1 POST route.

async function onGet(req, res) {
    const result = await sheet.getRows();
    const rows = result.rows;
    console.log(rows);

    var output=[];

    for(let i=1;i<rows.length;i++){

    }

    for(let i=1;i<rows.length;i++){
        var item={};
        for(let j=0;j<rows[0].length;j++){
            item[rows[0][j]] = rows[i][j];
        }
        output.push(item);
    }

    res.json( output );
}
app.get('/api', onGet);

async function getdate(req, res) {
    const result = await sheet.getRows();
    const rows = result.rows;
    const year  = req.params.year;
    const month  = req.params.month;
    const day = req.params.day;
    console.log(rows);

    var output=[];

    for(let i=1;i<rows.length;i++){
        if(rows[i][1]==year && rows[i][2]==month && rows[i][3]==day)
            output.push(rows[i][5]);
    }

    res.json( output );
}
app.get('/date/:year/:month/:day', getdate);

async function onPost(req, res) {
    const result = await sheet.getRows();
    const rows = result.rows;
    const messageBody = req.body;
    const key = Object.keys(messageBody);
    const value = Object.values(messageBody);

    var row_post=[];

    for(i=0;i<value.length;i++){
        row_post[rows[0].indexOf(key[i])]=value[i];
    }

    console.log("POST the row to sheet : [ " +  row_post +" ]");

    sheet.appendRow(row_post).then(
        function(resp){
            const response=resp["response"];
            console.log(resp);
            res.json( { response })
        });
}
app.post('/api', jsonParser, onPost);

async function getId(req, res) {

    const result = await sheet.getRows();
    const value  = req.params.value;
    const rows = result.rows;
    console.log(rows);

    var output=[];

    for(let i=1;i<rows.length;i++){

    }

    for(let i=1;i<rows.length;i++){
        if(rows[i][1]==value) {
            var item={};
            for (let j = 0; j < rows[0].length; j++) {
                item[rows[0][j]] = rows[i][j];
            }
            output.push(item);
        }
    }

    res.json( output );
}
app.get('/id/:value', getId);
//app.use('/id/:value', getId);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
