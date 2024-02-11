const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const swagger = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); 

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./database/connection');

const corsOptions = {
  origin: 'http://localhost:8080', // https://cse341-lesson1-75nj.onrender.com
  methods: 'GET,PUT,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('js'));
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8080;
mongodb.initDb((err, db) => {
    if (err) {
        console.log('Error connecting to the database');
        console.log(err);
      } else {
        console.log('Connected to the database');
        
        //app.listen(port) etc 
      }
});
app.get(mongodb);

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js']; // This is the endpoint file

const doc = {
  info: {
    version: "1.0.0",
    title: "Your API Documentation",
    description: "Description of your API",
  },
  host: "localhost:8080", // "cse341-lesson1-75nj.onrender.com"
  basePath: "/",
};

const fs = require('fs');
if (!fs.existsSync(outputFile)) {
  swagger(outputFile, endpointsFiles, doc);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
});
