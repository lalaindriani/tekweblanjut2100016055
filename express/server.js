const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
const port = 3333;
const mongoURI = 'mongodb+srv://lalaindriani:lalaindriani@cluster0.g0dsiuf.mongodb.net/?retryWrites=true&w=majority';
const rencanaroute = require('./router/rencanarouter')
const userroute = require('./router/userrouter')
app.use("/data", rencanaroute)
app.use("/user",userroute)

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Rest of your server code goes here
