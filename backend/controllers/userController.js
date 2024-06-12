import db from "../utils/db.js";


export const registerController = async (req, res) => {
  try {
    const {
      stream,
      university,
      course,
      name,
      fname,
      mname,
      dob,
      mobile,
      email,
      aadhar,
      marital,
      category,
      nationality,
      religion,
      gender,
      iboard,
      hboard,
      state,
      hper,
      hypass,
      hsub,
      iper,
      iypass,
      isub,
      gdeg,
      gboard,
      gper,
      gypass,
      gsub,
      dboard,
      dper,
      dypass,
      dsub,
      district,
      paddress,
      pincode,
      courseIT
    } = req.body;

    if (!district) {
      res.status(500).send({ message: "district not found" + district })
      // console.log('dis' + district)
    }

    // Check if the user already exists based on email or Aadhar number
    const checkExist = "SELECT * FROM users WHERE email = ? OR aadhar = ?";
    const existValues = [email, aadhar];

    db.query(checkExist, existValues, (err, result) => {
      if (err) {
        console.error("Error checking existing user:", err);
        return res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      }
      if (result.length > 0) {
        return res.status(200).send({
          success: false,
          message: "User already registered",
        });
      }

      // User doesn't exist, proceed with registration
      const insertQuery = `
        INSERT INTO users (
          stream, university, course, name, fname, mname, dob, mobile, email, aadhar,
          marital, category, nationality, religion, gender, iboard, hboard, state,
          hper, hypass, hsub, iper, iypass, isub, gdeg, gboard, gper, gypass, gsub,
          dboard, dper, dypass, dsub, district, paddress,pincode,courseIT
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
      `;
      const insertValues = [
        stream, university, course, name, fname, mname, dob, mobile, email, aadhar,
        marital, category, nationality, religion, gender, iboard, hboard, state,
        hper, hypass, hsub, iper, iypass, isub, gdeg, gboard, gper, gypass, gsub,
        dboard, dper, dypass, dsub, district, paddress, pincode, courseIT
      ];

      db.query(insertQuery, insertValues, (err, resultData) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return res.status(500).send({
            success: false,
            message: "Failed to register user" + err,
          });
        }
        return res.status(201).send({
          success: true,
          message: "User registered successfully",
        });
      });
    });
  } catch (error) {
    console.error(`Error in register Controller: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};


// get board data from backend

export const boardController = async (req, res) => {
  try {
    const getBoardData = "Select * from boards";
    db.query(getBoardData, (err, result) => {
      if (err) {
        res.status(502).send({
          success: false,
          message: "something wrong to getting board data",
        });
      }
      res.status(200).send({
        success: true,
        message: "Data successfully fetch",
        result,
      });
    });
  } catch (error) {
    console.log("Something wrong to getting board data ", error);
  }
};

//  state data controller
export const stateController = async (req, res) => {
  try {
    const stateData = "select * from statelist";
    db.query(stateData, (err, result) => {
      if (err) {
        res.status(502).send({
          success: false,
          message: "Something wrong to accesss state from database",
        });
      }
      return res.status(200).send({
        success: true,
        message: "State successfully accessed",
        result,
      });
    });
  } catch (error) {
    console.log(`Something wrong to accessing state ${error}`);
  }
};

//  district data controller
export const districtController = async (req, res) => {
  try {
    const { xstate } = req.body;
    const districtData = "SELECT name FROM districts WHERE state = ?";

    db.query(districtData, [xstate], (err, result) => {
      if (err) {
        return res.status(502).json({
          success: false,
          message:
            "Something went wrong while accessing district data from the database",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Districts successfully accessed",
        result,
      });
    });
  } catch (error) {
    console.error("Something went wrong in district controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// get ast data ff  
export const astController = async (req, res) => {
  try {
    const data = "select * from courseit"
    db.query(data, (err, result) => {
      if (err) return res.status(500).send({
        success: false,
        message: "Something wrong ",
        err
      })
      return res.status(200).send({
        success: true,
        message: "successfully get",
        result
      })
    })
  } catch (error) {
    console.log(error)
  }
}

// get university course according to university
export const uniCourseController = async (req, res) => {
  try {
    const { xuniversity } = req.body;

    if (!xuniversity) {
      return res.status(400).send({ success: false, message: "University name is required" });
    }

    const sql = "SELECT * FROM unicourse WHERE ucode = ?";
    db.query(sql, [xuniversity], (err, result) => {
      if (err) {
        return res.status(500).send({ success: false, message: "Failed to access university course controller", err });
      }

      if (result.length > 0) {
        return res.status(200).send({ success: true, message: "Successfully accessed", result });
      } else {
        return res.status(404).send({ success: false, message: "No courses found for the specified university" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};


// export const numberController = async (req, res) => {
//   try {
//     const sql = 'select id, VEName,VMob1 from volunteer'
//     db.query(sql, (err, result) => {
//       if (err) {
//         return res.status(500).send({
//           success: false,
//           message: 'wrong to access data from table',
//           err
//         })
//       }
//       return res.status(200).send({
//         success: true,
//         message: 'Successfully data accessed',
//         result
//       })
//     })
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: 'Somthing wrong to number Controller',
//       error:error.message
//     })
//   }
// }
export const suggetionController = async (req, res) => {
  try {
    const { VMob1 } = req.body;
    if (!VMob1) {
      return res.status(400).send({ error: "VMob1 required" });
    }
    const sql = "SELECT VMob1 FROM volunteer WHERE VMob1 LIKE ?";
    const queryParam = `%${VMob1}%`;
    db.query(sql, [queryParam], (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal Error',
          error: err.message
        });
      }
      res.status(200).send({
        success: true,
        message: 'Successfully accessed',
        result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong in suggestionController',
      error: error.message
    });
  }
}


//  get All detial
export const getAllDetailController = async (req, res) => {
  try {
    const { NoOfFormsKN } = req.body
    if (!NoOfFormsKN) {
      return res.status(400).send({ error: "NoOfFormsKN required" });
    }
    const sql = `Select * from  incomingform where NoOfFormsKN like ?`
    const queryParam = `%${NoOfFormsKN}%`;
    db.query(sql, [queryParam], (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal Error',
          error: err.message
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Successfully get',
        result
      });
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong in get all detail controller',
      error: error.message
    });
  }
}
//  get All detial delte controller
export const deleteController = async (req, res) => {
  try {
    const { Id } = req.params;
    if (!Id) {
      return res.status(400).send({ error: "Id required" });
    }
    const sql = "delete from incomingform where Id=?"
    db.query(sql, [Id], (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal Error',
          error: err.message
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Successfully Deteted',
        result
      });
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong in deletion controller',
      error: error.message
    });
  }
}

// get updation part
export const updateController = async (req, res) => {
  try {
    const { Id } = req.params
    const { NoOfFormsKN } = req.body
    if (!NoOfFormsKN) {
      return res.status(400).send({ error: "NoOfFormsKN required" });
    }
    const sql = "update incomingform set NoOfFormsKN=? where Id=?"
    db.query(sql, [NoOfFormsKN,Id], (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal Error',
          error: err.message
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Successfully Update',
        result
      });
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong in updation controller',
      error: error.message
    });
  }
}