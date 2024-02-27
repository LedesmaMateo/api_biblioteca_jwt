const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/api_biblioteca_jwt", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const LibroSchema = new mongoose.Schema({
    titulo: String,
    autro: String
}, {collection: "libros"});

const Libro = mongoose.model("Libro", LibroSchema);

module.exports = Libro;