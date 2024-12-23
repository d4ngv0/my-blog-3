import express from "express";
import BlogController from "../controllers/BlogController.js";
import CommentController from "../controllers/CommentController.js";


const app= express()
const BlogRouter= express.Router();

app.set('view engine', 'ejs')
app.set('views', '../views')


BlogRouter.get("/blogs", BlogController.getBlogs);
BlogRouter.get("/blogs/:id", BlogController.getBlogById);
BlogRouter.put("/blogs/update-blog", BlogController.updateBlog);
BlogRouter.post("/blogs/create-blog", BlogController.insertBlog);
BlogRouter.delete("/blogs/:id", BlogController.deleteBlog);

BlogRouter.get("/blogs/:id/comments", CommentController.getCommentsByBlogId);

BlogRouter.get("/comments", CommentController.getComments);
BlogRouter.get("/comments/:id", CommentController.getCommentById);
BlogRouter.put("/comments/update-comment", CommentController.updateComment);
BlogRouter.post("/comments/create-comment", CommentController.insertComment);
BlogRouter.delete("/comments/:id", CommentController.deleteComment);
export default BlogRouter;