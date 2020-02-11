//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require( 'pg' );

//uses
app.use(express.static( 'server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//globals
const port = 5000;

//db setup
const pool = new pg.Pool({
    database: 'music',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
});//end pool
//server up
app.listen(port, ()=>{
    console.log('server up on', port);
    
})//end server up 

//routes