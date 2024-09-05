const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.get("/", async function (req, res, next) {
    try {
        const results = await db.query("SELECT * FROM students")
        res.json(results.rows)
        
    } catch (err) {
        return next(err);
        
    }
});





router.post("/", async (req, res, next) => {
    try {

        const foundUser = await db.query(
          "SELECT * FROM students WHERE matric_number = $1 OR email = $2 OR jamb_number = $3", 
          [req.body.email, req.body.email, req.body.email]
        );

        if (foundUser.rows.length == 0) {
          console.log("invalid");
            return res.json({ message: "Invalid" });
        }
        const hashedPassword = await bcrypt.compare(
            req.body.password,
            foundUser.rows[0].password
          );
          if (hashedPassword === false) {
            console.log("wrong password");
            return res.json({ message: "Invalid" });
          }
          const email = foundUser.rows[0].email
          const Matric_number = foundUser.rows[0].matric_number 
          const id = foundUser.rows[0].id
          const name = foundUser.rows[0].names
          const jambRegNumber = foundUser.rows[0].jamb_number
          console.log(foundUser.rows);
          const token = jwt.sign({ email }, secret, {
            expiresIn: 60 * 60,
          });
            console.log("logged");
          return res.json({ token, message: "logged",  email, Matric_number, id, name, jambRegNumber});

        } catch (err) {
          return next(err)
    }
})




router.post("/emailCheck", async (req, res, next) => {
    try {

        const foundUser = await db.query(
          "SELECT * FROM students WHERE email = $1", 
          [req.body.email]
        );
        console.log(req.body.email);
        console.log(foundUser.rows);

        if (foundUser.rows.length == 0) {
          console.log("not found");
            return res.json({ message: "Invalid" });
        } else{
          console.log("found");
          return res.json({ message: "logged"});
        }


        } catch (err) {
          return next(err)
    }
})










// 



































































































































// router.post("/", async (req, res, next) => {
//     try {
        // const foundUser = await db.query("SELECT * FROM users WHERE email=$1", [req.body.email])
//         res.json(foundUser.rows.length)
//         if (foundUser.rows.length == 0) {
//             console.log("not found");
//             return res.json({ message: "Invalid" });
//         }
//         const username = foundUser.rows[0].name
//         console.log("name", username);
//         const hashedPassword = await bcrypt.compare(
//             req.body.password,
//             foundUser.rows[0].password
//           );
//           if (hashedPassword === false) {
//             console.log("wrong password");
//             return res.json({ message: "Invalid" });
//           }
//           console.log(username);
//           return res.json({message: "logged", username});
//         } catch (err) {
//           return next(err)
//     }
// })












// exports.login = async (req, res, next) => {
//     try {
//       const foundUser = await getUserByEmail(req.body.email);
//       const username = foundUser.rows[0].name
//       if (foundUser.rows.length === 0) {
//         return res.json({ message: "Invalid" });
//       }
//       const hashedPassword = await bcrypt.compare(
//         req.body.password,
//         foundUser.rows[0].password
//       );
//       if (hashedPassword === false) {
//         return res.json({ message: "Invalid" });
//       }
//       return res.json({message: "logged", username});
//     } catch (err) {
//       return next(err);
//     }
//   };


//   exports.getUserByEmail = async (email) => {
//     return await db.query("SELECT * FROM users WHERE email=$1", [email]);
//   };


module.exports = router;





