import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config();

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE']
}));
app.use(json())

// Serve static files from React build directory
app.use(express.static(join(__dirname, '../client/build')))

app.get('/get-res', (req, res) => {
    res.json({
        message: 'The server is runnig rn.'
    })
})

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/build', 'index.html'))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('The serer is runnig on port', PORT);
})