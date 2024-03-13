import { defaultErrorHandler } from './middlewares/error.middlewares';
import express from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'

const app = express()
const port = 3000
app.post('/', (req, res) => {
  res.send('hello world')
})
app.use(defaultErrorHandler)
app.use(express.json())
databaseService.connect();
app.use('/user', userRouter)
app.listen(port, () => {
  console.log(`connet to gateway ${port}`)
})
