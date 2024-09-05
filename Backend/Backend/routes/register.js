const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.get("/Allusers", async function (req, res, next) {
    try {
        const results = await db.query("SELECT * FROM students")
        res.json(results.rows)
        
    } catch (err) {
        return next(err);
        
    }
});


  
  
  router.post("/", async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(req.body.email);
    
    try {
      const emailresults = await db.query("SELECT email FROM students WHERE email=$1", [req.body.email]);
      const MatricNumberResults = await db.query("SELECT matric_number FROM students WHERE matric_number=$1", [req.body.matric_number]);
      const JambRegNumberResults = await db.query("SELECT jamb_number FROM students WHERE jamb_number=$1", [req.body.jamb_number]);

      if (emailresults.rows.length > 0) {
        res.json({ message: "Email already Exists" });
        console.log("Email already exists");

      } else if (MatricNumberResults.rows.length > 0) {
        res.json({ message: "Matric number already exists" });
        console.log("matric number already exists");

      } else if (JambRegNumberResults.rows.length > 0) {
        res.json({ message: "Jamb Reg Number already Exists" });
        console.log("Jamb Reg Number already exists");

      } else {
        const queryText = "INSERT INTO students (email, matric_number, jamb_number, password, names) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [req.body.email, req.body.matric_number, req.body.jamb_number, hashedPassword, req.body.names];
        const user = await db.query(queryText, values);
        
        
        
        console.log("success---");
        res.json({ success: true, data: user.rows[0], message: "Success" });
      }
      
    } catch (err) {
      return next(err);
    }
  });
  











































    router.post("/post/:email", async (req, res, next) =>{
      try {
          const queryText = ("INSERT INTO potterUsers (firstname, lastname, phone) VALUES ($1, $2, $3) WHERE email=$4 RETURNING*")
          const values = [req.body.firstname, req.body.lastname, req.body.phone, req.params.email ];
          const user = await db.query(queryText, values);
          res.json({success: true, data: user.rows[0], message: "Success",});
          console.log(results);
      } catch (err) {
        return next(err)
      }
    })
  
    
  
  
    router.patch("/update/:email", async (req, res, next) =>{
      try {
        // const results = await db.query("SELECT * FROM potterUsers WHERE email=$1", [req.params.email]);
          const queryText = ("UPDATE potterUsers SET firstname =$1, lastname =$2, phone=$3 WHERE email=$4 RETURNING *")
          const values = [req.body.firstname, req.body.lastname, req.body.phone,  req.params.email];
          const user = await db.query(queryText, values);
          res.json({success: true, data: user.rows[0], message: "Success",});
          console.log(results);
        // }
      } catch (err) {
        return next(err)
      }
    })
  
    
  router.patch("/updateprofile/:id", async (req, res, next) =>{
    try {
        const queryText = ("UPDATE potterUsers SET firstname =$1, lastname =$2, phone=$3, name=$4, email=$5 WHERE id=$6 RETURNING *")
        const values = [req.body.firstname, req.body.lastname, req.body.phone, req.body.name, req.body.email, req.params.id ];
        const user = await db.query(queryText, values);
        res.json({success: true, data: user.rows[0], message: "Success",});
        console.log(results);
      // }
    } catch (err) {
      return next(err)
    }
  })
    
  router.patch("/updateprofile2/:id", async (req, res, next) =>{
    try {
        const queryText = ("UPDATE potterUsers SET name=$1, email=$2 WHERE id=$3 RETURNING *")
        const values = [req.body.name, req.body.email, req.params.id ];
        const user = await db.query(queryText, values);
        res.json({success: true, data: user.rows[0], message: "Success",});
        console.log(results);
      // }
    } catch (err) {
      return next(err)
    }
  })


  router.patch("/changepassword/:id", async (req, res, next) =>{
    const foundUser = await db.query("SELECT password FROM students WHERE id=$1", [req.params.id])
    console.log("user password-",foundUser.rows[0].password);

    if (1 == 1){
      let hashedPassword2 = await bcrypt.hash(req.body.password2, saltRounds)
      console.log("line 123", hashedPassword2);
      try {
          const queryText = ("UPDATE students SET password=$1 WHERE id=$2 RETURNING *")
          const values = [hashedPassword2, req.params.id ];
          const user = await db.query(queryText, values);
          res.json({success: true, data: user.rows[0], message: "Success"});
          console.log(results);
        } catch (err) {
        return next(err)
      }
    }
  }
  )


  


module.exports = router;





  // router.post("/", async (req, res, next) =>{
  //   let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  //   console.log(req.body.email);
  //   try {
  //     const results = await db.query("SELECT email FROM students WHERE email=$1", [req.body.email]);

  //     // const results = await db.query("SELECT email FROM students WHERE email=$1", [req.body.email]);

      
  //     console.log(results);
  //     console.log("error found");
  //     if (results.rows.length > 0) {
  //       res.json({ message: "Already Exists" });
  //     } else {
  //       console.log("nothing found");
  //       const username = "username"
  //       const queryText = ("INSERT INTO students (email, matric_number, jamb_number, password VALUES ($1, $2, $3, $4) RETURNING *")
  //       const values = [req.body.email, req.body.matric_number, req.body.jamb_number, hashedPassword];
  //       const user = await db.query(queryText, values);

  //       const updateToken = jwt.sign({ username }, secret, {
  //         expiresIn: 60 * 60,
  //       });
  //       res.json({success: true, data: user.rows[0], message: "Success",});
  //     }
  //   } catch (err) {
  //     return next(err)
  //   }
  // })
