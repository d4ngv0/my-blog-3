
import {VIEW_PORT}  from './configs/EnvConfig.js'
import express from 'express'
import cors from 'cors'



const app = express()




app.use(express.json())



app.use(express.urlencoded({ extended: true }))
// app.use('/blogs')
app.use(express.static('public'))

// áp dụng middleware cors() để cho phép các request từ một domain khác
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type'], 
        credentials: true, 
    })
)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('error', { error: 'Something broke!' })
})
app.set('view engine', 'ejs')


app.set('views', './views')


async function safeFetch(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error)
        throw error
    }
}

app.get('/', async (req, res, next) => {
    try {
        const blogs = await safeFetch('http://localhost:3000/blogs')
        res.render('home', { blogs })
    } catch (error) {
        next(error)
    }
})

app.get('/create-blog', async (req, res, next) => {
    try {
        const blogs = await safeFetch('http://localhost:3000/blogs')
        res.render('create-blog', { blogs })
    } catch (error) {
        next(error)
    }
})

app.get('/blogs/:id', async (req, res, next) => {
    try {
        const [blog, comments] = await Promise.all([
            safeFetch(`http://localhost:3000/blogs/${req.params.id}`),
            safeFetch(`http://localhost:3000/blogs/${req.params.id}/comments`)
        ])
        res.render('blog-detail', { blog, comments })
    } catch (error) {
        next(error)
    }
})

app.post('/blogs/:id/create-comment', async (req, res, next) => {
    try {
        const comments = await safeFetch('http://localhost:3000/comments');
        // console.log(comments)
        const data = {
            ...req.body,
            id: comments[comments.length-1].id + 1
        };

        const response = await fetch('http://localhost:3000/comments/create-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

       
        res.status(200).json(data);
    } catch (error) {
        console.error('Error creating comment:', error);
        next(error);
    }
})

app.get('/blogs/:id/edit', async (req, res, next) => {
    try {
        const blog = await safeFetch(`http://localhost:3000/blogs/${req.params.id}`)
        res.render('update-blog', { blog })
    } catch (error) {
        next(error)
    }
})

app.delete('/blogs/:id', async (req, res, next) => {
    try {
        const response = await fetch(`http://localhost:3000/blogs/${req.params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            res.status(201).json('Delete successfully')
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        next(error)
    }
    
})



app.listen(VIEW_PORT, () => {
    console.log(`Example app listening on port ${VIEW_PORT}`)
})