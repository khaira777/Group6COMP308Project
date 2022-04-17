import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		nurse: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		bodyTemperature: {
			type: Number,
			required: true,
		},
		bloodPressure: {
			type: Number,
			required: true,
		},
		heartRate: {
			type: Number,
			required: true,
		},
		visitDate: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

schema.statics.getVitalSigns = async function (patientId) {
	return await this.find({ patient: patientId })
		.populate('patient nurse')
		.sort({ visitDate: -1 });
};

export default mongoose.model('VitalSign', schema);
