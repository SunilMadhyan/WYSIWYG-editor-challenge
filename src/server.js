const express = require('express');
const app = express();
app.use(express.static('../dist/essenvia-frontend-angular-challenge'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: '../dist/essenvia-frontend-angular-challenge'});
});

app.listen(process.env.PORT || 8080);