const express = require("express");
const router = express.Router();

const Libro = require("../models/Libro");

const {requiredScopes}  = require("express-oauth2-jwt-bearer");

router.get("/", requiredScopes("read:productos") ,async(req, res, next) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        next(error);
    }
});

router.post("/", requiredScopes("write:productos"), async(req, res, next) =>{
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", requiredScopes("write:productos") , async(req, res, next) =>{
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if(!libro){
            throw {
                message: "Libro no encontrado"
            }
        }
        res.json(libro)
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", requiredScopes("write:productos") ,async(req, res, next) =>{
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: `Libro id: ${req.params.id} eliminado con exito`}) 
    } catch (error) {
        next(error);
    }
});

module.exports = router;