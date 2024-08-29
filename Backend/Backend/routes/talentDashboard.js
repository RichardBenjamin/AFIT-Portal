const express = require("express");
const router = express.Router();
const db = require("../db");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary")
const uploadImage = require("../utilites/index")
const upload = multer({
  dest: "./uploads"
});



router.get("/", async function (req, res, next) {
    try {
        const results = await db.query("SELECT * FROM formX")
        res.json(results.rows)
        
    } catch (err) {
        return next(err);
        
    }
});


router.post("/:email", upload.single("images"), async (req, res, ) =>{
  console.log(req.file);
  const path = req.file.path
  console.log(path);
 
  try {
    const result = await uploadImage(req.file.path);
    // const queryText = ("INSERT INTO potterUsers (firstname, lastname, phone, photo) VALUES ($1, $2, $3, $4) RETURNING *")
    const queryText = ("UPDATE potterUsers SET firstname=$1, lastname=$2, phone=$3, photo=$4 WHERE email=$5 RETURNING *")
    console.log("line 35", result);
    const values = [req.body.firstname, req.body.lastname, req.body.phone, req.params.email, result.url];
    const results = await db.query(queryText, values);
    res.json({success: true, data: results.rows[0], message: "Success"});
    console.log("line 44", results);
  } catch (err) {
    throw (err);
  }
})




router.post("/upload/itemvalues", upload.single("images"), async (req, res, ) =>{
  console.log(req.file);
  const path = req.file.path
  console.log(path);
 
  try {
    const result = await uploadImage(req.file.path);
    const queryText = ("INSERT INTO uploadWork (itemName, dateValue, categoryValue, itemDescription, images, suitableFor, uploadId, price, localName) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *")
    console.log(result);
    console.log("line 56");
    const values = [req.body.itemName, req.body.dateValue, req.body.categoryValue, req.body.itemDescription, result.url, req.body.suitableFor, req.body.uploadId, req.body.price, req.body.localName];
    const results = await db.query(queryText, values);
    res.json(results.rows[0]);
    console.log(results.rows[0].images);
  } catch (err) {
    throw (err);
  }
})











router.post("/updating/:id", upload.single("images"), async (req, res, ) =>{
  try {
        const queryText = ("INSERT INTO potterUsers (firstname, lastname, phone, photo) VALUES ($1, $2, $3, $4) WHERE id=$5 RETURNING *")
    const values = [req.body.firstname, req.body.lastname, req.body.phone, req.body.photo, req.params.id];
    const results = await db.query(queryText, values);
    res.json({success: true, data: results.rows[0], message: "Success",});
  } catch (err) {
    throw (err);
  }
})













module.exports = router;



















































































































// router.post("/", upload.single("images"), async (req, res, ) =>{
//   console.log(req.file);
//   const path = req.file.path
//   console.log(path);
 
//   try {
//     const result = await uploadImage(req.file.path);
//     // const queryText = ("UPDATE potterUsers SET firstname =$1, lastname =$2, phone=$3, photo=$4 WHERE email=$5 RETURNING *")
//         const queryText = ("INSERT INTO potterUsers (firstname, lastname, phone, photo) VALUES ($1, $2, $3, $4) RETURNING *")
//     console.log(result);
//     const values = [req.body.firstname, req.body.lastname, req.body.phone, result.url];
//     const results = await db.query(queryText, values);
//     res.json({success: true, data: results.rows[0], message: "Success",});
//     console.log(results);
//     console.log("next", result.url);
//     console.log("line 40", results.rows[0]);
//   } catch (err) {
//     throw (err);
//   }
// })










// router.post("/", upload.single("images"), async (req, res, ) =>{
//   console.log(req.file);
//   const path = req.file.path
//   console.log(path);
//   console.log("line 50");
 
//   try {
//     const result = await uploadImage(req.file.path);
//     const queryText = ("INSERT INTO form (jobtitle, skills, about, locationx, language, rate, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *")
//     console.log(result);
//     console.log("line 56");
//     const values = [req.body.jobtitle, req.body.skills, req.body.about, req.body.locationx, req.body.language, req.body.rate, result.url];
//     const results = await db.query(queryText, values);
//     console.log(results.rows[0]);
//     res.json(results.rows[0]);
//     console.log("line 61");
//     console.log("next", result.url);
//     console.log(results.rows[0].images);
//   } catch (err) {
//     throw (err);
//   }
// })






