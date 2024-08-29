const express = require("express");
const router = express.Router();
const db = require("../db");






router.delete("/deleteUploadedItem", async function (req, res, next) {
    try {
      const queryText = ("DELETE FROM uploadWork WHERE uploadid = $1 and id = $2");
      const values = [req.body.uploadId, req.body.itemId];
      const results = await db.query(queryText, values);

      res.json({ message: "Item Deleted", data: results.rows[0]});
    } catch (err) {
      res.json(err)
        return next(err);
    }
  });

  router.patch("/updateUploadedItem", async (req, res, next) =>{
    try {
        const queryText = ("UPDATE uploadWork SET itemname=$1, price =$2, categoryvalue =$3, itemdescription=$4 WHERE id=$5 RETURNING *")
        const values = [req.body.itemname, req.body.price, req.body.categoryvalue, req.body.itemdescription, req.body.id ];
        const user = await db.query(queryText, values);
        res.json({success: true, data: user.rows[0], message: "Updated",});
        console.log(results);
      // }
    } catch (err) {
      return next(err)
    }
  })





  
 module.exports = router;