import { body } from 'express-validator'

export const registerValidation = [
	body('email', "Incorrect email format").isEmail(),
	body('password', "Password have to be minimum 5 symbols").isLength({ min: 5 }),
	body('fullName', "Write name").isLength({ min: 3 }),
	body('avatarUrl', "Incorrect link to the avatar").optional().isURL(),
]
