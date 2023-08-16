import express from "express";
import { addCategoryPage, save, list, remove, edit, update, saveCategory } from '../controller/category.controller.js';
import { verify } from "../middleware/authenticate.js";
const router = express.Router();

router.get("/add", verify, addCategoryPage);
//router.post("/add", verify, save);
router.post("/add", saveCategory)
router.get("/view", verify, list);
router.get("/delete/:id", verify, remove);
router.get("/edit/:id", verify, edit);
router.post("/update", verify, update);


export default router;