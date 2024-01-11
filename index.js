import express from 'express';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://asanaa:Zh35936866@cluster0.zvzzyp5.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log("DB ok!"))
	.catch((err) => console.log("Db error", err))

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
	res.send("Hello World!!")
})
app.get('/id', (req, res) => {
	res.send("Hello ID!!")
})

app.post('/auth/login', (req, res) => {
	console.log(req.body);

	const token = jwt.sign({
		email: req.body.email,
		fullName: 'Dector'
	}, "cerector");

	res.json({
		success: true,
		token,
	});
});

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	};

	console.log("Server OK!");
});
