import { body } from 'express-validator'

export const registerValidation = [
	body('email', "Incorrect email format").isEmail(),
	body('password', "Password have to be minimum 5 symbols").isLength({ min: 5 }),
	body('fullName', "Write name").isLength({ min: 3 }),
	body('avatarUrl', "Incorrect link to the avatar").optional().isURL(),
];

export const loginValidation = [
	body('email', "Incorrect email format").isEmail(),
	body('password', "Password have to be minimum 5 symbols").isLength({ min: 5 }),
];
export const postCreateValidation = [
	body('title', "Write the title of the article!").isLength({ min: 3 }).isString(),
	body('text', "Write the text of the article!").isString({ min: 10 }),
	body('tags', "Incorrect format of the tags(write the array)!").optional().isString(),
	body('imageUrl', "Incorrect link to the picture").optional().isString(),
];
