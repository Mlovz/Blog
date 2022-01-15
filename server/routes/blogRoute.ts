import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);
router.get("/home/blog", blogCtrl.getHomeBlogs);
router.get("/blogs/:category_id", blogCtrl.getBlogsByCategory);

router.get("/blogs/user/:id", blogCtrl.getBlogsByUser);

router.get("/blog/:id", blogCtrl.getBlog);

export default router;
