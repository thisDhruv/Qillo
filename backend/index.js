const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
connectToMongo();

const app = express();
const port = 4500;

app.use(cors());
app.use(express.json()) //a middleware, used to get the body from post request

//endPoints
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


//function to listen at port 3000
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})