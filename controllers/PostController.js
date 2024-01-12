import PostModel from '../models/Post.js'


export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec();

		res.json(posts)
	} catch (err) {
		res.status(500).json({
			message: "There is no posts!"
		})
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndUpdate(
			{ _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: "After" })
			.then(doc => res.json(doc))
			.catch(err => res.status(500).json({ message: "There was no post!" }))
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "There is no post!"
		})
	}
};
export const remove = async (req, res) => {
	try {
		const postId = req.params.id;
		PostModel.findOneAndDelete({
			_id: postId,
		}).then(res.json({
			success: true,
		}))
			.catch(err => res.status(500).json({ message: "Cant delete the post!" }))
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "There is no post!"
		})
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId
		});

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		res.status(500).json({
			message: "Cant create the post!"
		})
	}
}
