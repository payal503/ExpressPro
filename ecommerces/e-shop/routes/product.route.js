import express from "express";
import { addProductPage, list, remove, viewDescription } from "../controller/product.controller.js";
import { verify } from "../middleware/authenticate.js";
import multer from "multer";

const upload = multer({ dest: "public/images/" });

const router = express.Router();
router.get("/add", verify, addProductPage);
router.get("/view", verify, list);
router.get("/delete/:id", verify, remove);
router.get("/view/:productId", verify, viewDescription)
// router.get("/edit/:id", verify, edit);
// router.post("/update", verify, update);
//router.post("/save", upload.single("image"), verify, save);
//router.post("/save", saveProduct);//comment out after initailize of data
export default router;