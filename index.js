const express = require('express');
const bodyParser = require('body-parser');
const candyRoutes = require('./routes/candy');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/candy', candyRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
