import BlogService from "../services/BlogService.js";
import express from "express"




class BlogController{
          async insertBlog(req, res, next){
                    try{
                              const newBlog= req.body;
                              await BlogService.insertBlog(newBlog);
                              
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async getBlogById(req, res, next){
                    try{

                              const id= Number(req.params["id"]);
                              const blog= await BlogService.getBlogById(id);
                          
                              res.status(200).json(blog);
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async getBlogs(req, res, next){
                    try{
                    
                              const blogs= await BlogService.getBlogs();
                              
                            
                              res.status(200).json(blogs);
                              
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async updateBlog(req, res, next){
                    try{
                              const updatedBlog= req.body;
                              await BlogService.updateBlog(updatedBlog);
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async deleteBlog(req, res, next){
                    try{
                              
                              const id= Number(req.params["id"]);
                          
                              await BlogService.deleteBlog(id);
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }
}

export default new BlogController();