const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.get("/Allusers", async function (req, res, next) {
    try {
        const results = await db.query("SELECT * FROM potterUsers")
        res.json(results.rows)
        
    } catch (err) {
        return next(err);
        
    }
});








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

  
  
  router.post("/", async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(req.body.email);
    
    try {
      const results = await db.query("SELECT email FROM students WHERE email=$1", [req.body.email]);
      
      console.log(results);
      console.log("error found");
      if (results.rows.length > 0) {
        res.json({ message: "Already Exists" });
      } else {
        console.log("nothing found");
        const username = "username";
        const queryText = "INSERT INTO students (email, matric_number, jamb_number, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [req.body.email, req.body.matric_number, req.body.jamb_number, hashedPassword];
        const user = await db.query(queryText, values);
  
        const updateToken = jwt.sign({ username }, secret, {
          expiresIn: 60 * 60,
        });
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
    // const hashedPassword = await bcrypt.compare(
    //   req.body.password,
    //   foundUser.rows[0].password
    // );
    // console.log("hashed password-", hashedPassword);
    // console.log("req.body.password-", req.body.password);

    // if (hashedPassword === false) {
    //   return res.json({ message: "Invalid" });
    // } 
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