import mongoose from 'mongoose';

const schema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	message: {
		type: String,
	},
	read: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Alert', schema);
