import fs from "fs/promises"
import { BASE_STORAGE_NAME } from "../configs/EnvConfig.js";

import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

class CommentService { 
          constructor(){
                    this.STORAGE_PATH= BASE_STORAGE_NAME+"/db.json";
          }
          
          async insertComment(newComment) {
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const comments= JSON.parse(data).comments;

                    const existedComments= comments.filter(comment=> comment.id === newComment.id);
                    if(existedComments.length>0) 
                              throw new BadRequestError(`Comment with id ${newComment.id} already exists`);
                    
                    comments.push(newComment);
                    
                    await fs.writeFile(this.STORAGE_PATH, JSON.stringify({blogs,comments}));
          }
          async getCommentById(id){
            const data= await fs.readFile(this.STORAGE_PATH);
            const comments= JSON.parse(data).comments;
            const searchedComment= comments.filter(comment=>{   
              return comment.id === id;
            }
            );
     
            if(searchedComment.length>0) return searchedComment[0];
            else throw new NotFoundError("Comment not found");
          }

          async getCommentsByBlogId(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const comments= JSON.parse(data).comments;
                    const blogs= JSON.parse(data).blogs;
                    const searchedBlog= blogs.findIndex(blog => {
                      return blog.id === id;
                    })
                    if(searchedBlog===-1) throw new NotFoundError("Blog not found");
                    const searchedComment= comments.filter(comment=>{   
                      return comment.blogId === id;
                    }
                    );
             
                    return searchedComment;

          }

          async getComments(){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const comments= JSON.parse(data).comments;
                    return comments;
          }

          async updateComment(updatedComment){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const comments= JSON.parse(data).comments;

                    const updatedCommentIndex= comments.findIndex(comment=>comment.id=== updatedComment.id);
                    if(updatedCommentIndex != -1){
                              comments[updatedCommentIndex]= updatedComment;
                    }
                    else throw new NotFoundError("Comment not found");

                    fs.writeFile(this.STORAGE_PATH, JSON.stringify({blogs, comments}));
          }

          async deleteComment(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;

                    const comments= JSON.parse(data).comments;
             
                    const updatedComments= comments.filter(comment=>comment.id !== id);
                    const updatedData= JSON.stringify({blogs, comments:updatedComments});
                    fs.writeFile(this.STORAGE_PATH, updatedData);
          }
}

export default new CommentService();