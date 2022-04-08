import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ['NURSE', 'PATIENT'],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', schema);
