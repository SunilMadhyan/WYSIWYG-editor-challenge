const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {pool} = require('./src/config');
const app = express();
app.use(express.static('./dist/essenvia-frontend-angular-challenge'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getDocuments = (request, response) => {
  if (request.params.id !== "0") {
    console.log(request.params);
    getDocument(request, response)
  } else {
    pool.query('SELECT * FROM documents', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getDocument = (request, response) => {
  pool.query('SELECT * FROM documents where id = $1', [request.params.id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addDocument = (request, response) => {
  pool.query(
    'INSERT INTO documents (document, date) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *',
    [request.body.document],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: result.rows})
    },
  )
}

const updateDocument = (request, response) => {
  pool.query(
    'UPDATE documents set document = $1 where id = $2 RETURNING *',
    [request.body.document, request.body.id],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: result.rows})
    },
  )
}

app
  .route('/documents/:id')
  // GET endpoint
  .get(getDocuments);
  // POST endpoint
app.route('/documents')
  .post(addDocument)
  .put(updateDocument);


app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './dist/essenvia-frontend-angular-challenge'});
});

app.listen(process.env.PORT || 8080);