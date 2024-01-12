import express from 'express';

import mongoose from 'mongoose'
import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose.connect(SECRET)
	.then(() => console.log("DB ok!"))
	.catch((err) => console.log("Db error", err))

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
	res.send("Hello World!!")
})

app.post('/auth/login', loginValidation, UserController.login)

app.post('/auth/register', registerValidation, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)


// app.post('/posts', PostController.create)
// app.patch('/posts', PostController.update)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)

app.post('/posts', checkAuth, postCreateValidation, PostController.create)

app.listen(4444, (err) => {
	if (err) console.log(err);

	console.log("Server OK!");
});
