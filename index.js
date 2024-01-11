import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js'

import UserModel from './models/User.js';

mongoose.connect(LINK)
	.then(() => console.log("DB ok!"))
	.catch((err) => console.log("Db error", err))

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
	res.send("Hello World!!")
})

app.post('/auth/login', async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return req.status(404).json({ message: 'incorrect user!' });
		};

		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
	} catch (err) {

	}
})

app.post('/auth/register', registerValidation, async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		};

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			passwordHash: hash,
			avatarUrl: req.body.avatarUrl,
		});

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id
			},
			"secret123",
			{
				expiresIn: '30d',
			},
		);
		const { passwordHash, ...userData } = user._doc;
		console.log(user._doc.createdAt);
		res.json({
			...userData,
			token
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Cant register"
		})
	}
});

app.listen(4444, (err) => {
	if (err) console.log(err);

	console.log("Server OK!");
});
