const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const env = require(dotenv);

const swagger = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); 

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./database/connection');

const corsOptions = {
  origin: 'https://cse341-project1-9ars.onrender.com', // http://localhost:8080
  methods: 'GET,POST,PUT,DELETE',
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

const ui = SwaggerUI({});
ui.initOAuth({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  // realm: "your-realms",
  appName: "MongoDB",
  scopeSeparator: " ",
  scopes: "openid profile",
  additionalQueryStringParams: {},
  useBasicAuthenticationWithAccessCodeGrant: true,
  usePkceWithAuthorizationCodeGrant: true
})

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js']; // This is the endpoint file

const { cowsValidationRules, validate } = require('./validator.js')
app.post('/cows', cowsValidationRules(), validate, (req, res) => {
  Cows.create({
    tag : req.body.tag,
    calfTag : req.body.calfTag,
    color : req.body.color,
    birthday : req.body.birthday,
    lostCalves : req.body.lostCalves,
    lateCalves : req.body.lateCalves,
    antibiotics : req.body.antibiotics
  }).then(cows => res.json(cows))
})

const doc = {
  info: {
    version: "1.0.0",
    title: "Cows API Documentation",
    description: "Cattle/cows API MongoDB",
  },
  host: "cse341-project1-9ars.onrender.com", // "localhost:8080", // same for host in swagger_output.json
  basePath: "/",
};

const fs = require('fs');
if (!fs.existsSync(outputFile)) {
  swagger(outputFile, endpointsFiles, doc);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
});

// change schemes in swagger_output.json from https / http 