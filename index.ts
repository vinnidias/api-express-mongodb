//config inicial 

require('dotenv/config');
import express from "express";
import mongoose from "mongoose";
import cors from "cors"

const customerRoutes = require("./routes/customerRoutes");
const registerUserRouter = require("./routes/registerUserRoute");
const authLoginRoute = require ("./routes/authLoginRoute");


const app = express();

const dbKey = process.env.DB_KEY
const dbUser = process.env.DB_USER

const port = process.env.PORT || 3000;

//Lendo JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST,DELETE');
    
    next();
});

app.use(cors());


app.use(express.json());

app.use("/customer", customerRoutes);

app.use("/auth/register", registerUserRouter);

app.use("/auth/login" , authLoginRoute)


// rota inicial/enpoint



app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${port}` })

})

//mogo db conection 

//eviar a porta
mongoose.connect(`mongodb+srv://${dbUser}:${dbKey}@cluster0.nbr0s.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(port);
    console.log("mongodb is connected")
  })
  .catch((err) => console.log("mongodb connect fail:", err))

