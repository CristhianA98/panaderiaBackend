const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Paths API
    this.paths = {
      auth: "/api/auth",
      usuario: "/api/usuario",
      producto: "/api/producto",
      orden: "/api/orden"
    };

    //Middlewares
    this.middlewares();

    //Rutas App
    this.routes();

    /* Conectar BD */
    this.conectarDB();
  }

  middlewares() {
    /* Habilitar Cors */
    this.app.use(cors());

    /* Body Parse */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    /* FILE UPLOAD*/
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuario, require("../routes/usuario"));
    this.app.use(this.paths.producto, require("../routes/producto"));
    this.app.use(this.paths.orden, require("../routes/orden"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Puerto: ", this.port);
    });
  }
}

module.exports = Server;
