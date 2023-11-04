import express from 'express';
import productsRouter from './routes/products.router.js'
import "./dao/configDB.js"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import carritosRouter from './routes/carts.router.js';
import { messageModel } from './dao/models/message.models.js';
import viewsRouter from "./routes/views.router.js"
import bodyParser from 'body-parser';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }}) 
);

app.engine("handlebars", engine({ allowProtoMethodsByDefault: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", engine());

// Ruta productos
app.use("/api/products", productsRouter);

// Ruta para carritos
app.use('/api/carts', carritosRouter);

// Ruta views
app.use("/api", viewsRouter )

// Puerto
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}`);
  });
  
  const socketServer = new Server(httpServer);
  const messages = [];

  socketServer.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("newUser", (user) => {
      socket.broadcast.emit("userConnected", user);
      socket.emit("connected");
    });

      socket.on("message", async (infoMessage) => {
        try {
          const message = new messageModel({
            user_email: infoMessage.name,
            user_message: infoMessage.message,
          });
         await message.save();
        } catch (error) {
          console.error("Error al guardar el mensaje en la base de datos:", error);
        }

        messages.push(infoMessage);
        socketServer.emit("chat", messages);
    });
  });