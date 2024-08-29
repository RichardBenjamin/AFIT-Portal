const express = require("express");
const router = express.Router();
const db = require("../db");



router.get("/category/:searchValue", async (req, res, next) => {
    try {
      const results = await db.query(`
    SELECT * FROM uploadWork
    WHERE itemname ILIKE '%${req.params.searchValue}%'
    OR categoryvalue ILIKE '%${req.params.searchValue}%'
    OR localname ILIKE '%${req.params.searchValue}%'
  `);
  
      console.log(results.rows);
        res.json(results.rows)
    } catch (err) {
        return next(err);
    }
  })



  
module.exports = router;
  