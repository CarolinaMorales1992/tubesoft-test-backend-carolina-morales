const express = require('express')
const bp = require('body-parser')
const { Sequelize, DataTypes, Model  } = require('sequelize');
const cors = require('cors')
const app = express()
const port = 3000
const sequelize = new Sequelize('postgres://postgres:admin@localhost/chronometerdb') 

const finalTime = sequelize.define("finaltimes", {
    time: DataTypes.TEXT   
});

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.post('/save-time', cors(), async (req, res) => {
    //await sequelize.sync({ force: true });
    const time = finalTime.build({ time: req.body.time });
    await time.save();
  res.send('Time was saved to the database!!' )
})

app.listen(port, async () => {
    
  console.log(`Example app listening at http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})

