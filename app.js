var express = require('express');
var requestModule = require('request');
var path = require('path');
const PORT = process.env.PORT || 3000
var app = express();

const API_KEY = '17aab5868beba24d0eb5d21e4a5dd751';



//Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/recipes.html');
})
app.get('/recipes.html', (request, response) => {
  response.sendFile(__dirname + '/views/recipes.html');
})
app.get('/index.html', (request, response) => {
  response.sendFile(__dirname + '/views/recipes.html');
})

app.get('/recipes', (request, response) => {
  let ingredient = request.query.ingredient;
  if(!ingredient) {
    return response.json({message: 'Please enter an ingredient name'})
  }
  const url= `http://www.food2fork.com/api/search?q=${ingredient}&key=${API_KEY}` 
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})

module.exports = app;