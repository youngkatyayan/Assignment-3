import express from "express";
import {
  registerController,
  boardController,
  stateController, districtController,
  astController,
  uniCourseController,
  // numberController,
  suggetionController,
  getAllDetailController,deleteController,updateController
} from "../controllers/userController.js";

const router = express.Router();

// router
router.post("/register", registerController);

// fetch data
router.get("/getdata", boardController);
router.get("/statedata", stateController)
router.post("/districtData", districtController)
router.get('/astdata', astController)
router.post('/universitycourse',uniCourseController)
// lakhnavi
// router.get('/get-info', numberController)
router.post('/get-sugg', suggetionController)
router.post('/get-alldetail', getAllDetailController)
router.delete('/delete/:Id', deleteController)
router.put('/get-update/:Id', updateController)
export default router;
