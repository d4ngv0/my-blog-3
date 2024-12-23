import fs from "fs/promises"
import { BASE_STORAGE_NAME } from "../configs/EnvConfig.js";
// import PagingUtil from "../common/PagingUtil.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

class BlogService { 
          constructor(){
                    this.STORAGE_PATH= BASE_STORAGE_NAME+"/db.json";
          }
          
          async insertBlog(newBlog) {
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const comments= JSON.parse(data).comments;

                    const existedBlogs= blogs.filter(blog=> blog.id === newBlog.id);
                    if(existedBlogs.length>0) 
                              throw new BadRequestError(`Blog with id ${newBlog.id} already exists`);
                  
                    blogs.push(newBlog);
                    
                    await fs.writeFile(this.STORAGE_PATH, JSON.stringify({blogs,comments}));
          }

          async getBlogById(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const searchedBlog= blogs.filter(blog=>{   
                      return blog.id === id;
                    });
             
                    if(searchedBlog.length>0) return searchedBlog[0];
                    else throw new NotFoundError("Blog not found");
          }

          async getBlogs(){

                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs
  

                    return blogs
          }

          async updateBlog(updatedBlog){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const comments= JSON.parse(data).comments;
  

                    const updatedBlogIndex= blogs.findIndex(blog=>blog.id=== updatedBlog.id);
                    if(updatedBlogIndex != -1){
                              blogs[updatedBlogIndex]= updatedBlog;
                    }
                    else throw new NotFoundError("Blog not found");

                    fs.writeFile(this.STORAGE_PATH, JSON.stringify({blogs, comments}));
          }

          async deleteBlog(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const blogs= JSON.parse(data).blogs;
                    const comments= JSON.parse(data).comments;
                  
              
                    const updatedBlogs= blogs.filter(blog=>blog.id !== id);
                    const updatedData= JSON.stringify({blogs:updatedBlogs, comments});
                    fs.writeFile(this.STORAGE_PATH, updatedData);
          }
}

export default new BlogService();