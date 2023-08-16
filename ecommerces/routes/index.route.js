import express from "express";
import { indexPage, SigninPage, SignUpPage, SignUp, SignIn, SignOut } from "../controller/index.controller.js";
import { verify } from "../middleware/authenticate.js";
const router = express.Router();

// htto://localhost:8000/
router.get("/", indexPage);
router.get("/signin", SigninPage);
router.get("/signUp", SignUpPage);
router.post("/signUp", SignUp);
router.post("/signin", SignIn);
router.get("/signout", verify, SignOut);


export default router;