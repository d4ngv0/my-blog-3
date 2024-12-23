import CommentService from "../services/CommentService.js";
import BlogController from "./BlogController.js";

class CommentController{
          async insertComment(req, res, next){
                    try{
                              const newComment= req.body;
                              await CommentService.insertComment(newComment);
                              
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async getCommentById(req, res, next){
                    try{

                              const id= Number(req.params["id"]);
                              const comment= await CommentService.getCommentById(id);
                              
                              res.status(200).json(comment);
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

        async getCommentsByBlogId(req, res, next){
            try{

                    const id= Number(req.params["id"]);
                    const comments= await CommentService.getCommentsByBlogId(id);
                    
                    res.status(200).json(comments);
            }
            catch(err){
                    console.log("Error", err.message);
                    if(err.httpCode) res.status(err.httpCode).send(err.message);
                    else res.status(500).send("Unknown error");
            }
        }


          async getComments(req, res, next){
                    try{
                    
                              const comments= await CommentService.getComments();
                              
                              res.status(200).json(comments);
                              
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async updateComment(req, res, next){
                    try{
                              const updatedComment= req.body;
                              await CommentService.updateComment(updatedComment);

                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async deleteComment(req, res, next){
                    try{
                              const id= Number(req.params["id"]);
                              await CommentService.deleteComment(id);
                              
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }
}

export default new CommentController();