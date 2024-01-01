const express = require("express")
const {AddNote,GetNote,GetAllNote,EditNote,DeleteNote} = require("./controller")
const basicAuth = require('./basicAuth')

const router = express.Router();

router.post("/addNote",basicAuth,AddNote);
router.put("/editNote",basicAuth,EditNote);
router.delete("/deleteNote",basicAuth,DeleteNote);
router.get("/getNote", GetNote);
router.get("/getAllNote", GetAllNote);


module.exports = router