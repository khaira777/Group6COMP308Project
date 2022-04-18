import { gql } from 'apollo-server-core';
import VitalSignModel from '../database/model/vital-sign.js';

// TODO: Add pagination if have time
export const VitalSign = gql`
	type Query {
		getVitalSigns(patientId: String!): [VitalSign]
	}

	type Mutation {
		addVitalSign(vitalSignInput: VitalSignInput!): VitalSign
		removeVitalSign(_id: String!): String
		updateVitalSign(_id: String!, vitalSignInput: VitalSignInput!): VitalSign
	}

	type VitalSign {
		_id: ID!
		nurse: User!
		patient: User!
		bodyTemperature: Float!
		bloodPressure: Int!
		heartRate: Int!
		visitDate: String!
	}

	input VitalSignInput {
		nurseId: String!
		patientId: String!
		bodyTemperature: Float!
		bloodPressure: Int!
		heartRate: Int!
		visitDate: String!
	}
`;

export const vitalSignResolvers = {
	Query: {
		getVitalSigns: async (parent, { patientId }, ctx, info) => {
			return await VitalSignModel.getVitalSigns(patientId);
		},
	},
	Mutation: {
		addVitalSign: async (parent, { vitalSignInput }, ctx, info) => {
			const newVitalSign = await VitalSignModel.create({
				nurse: vitalSignInput.nurseId,
				patient: vitalSignInput.patientId,
				bodyTemperature: vitalSignInput.bodyTemperature,
				bloodPressure: vitalSignInput.bloodPressure,
				heartRate: vitalSignInput.heartRate,
				visitDate: vitalSignInput.visitDate,
			});

			return await newVitalSign.populate('patient nurse');
		},
		removeVitalSign: async (parent, { _id }, ctx, info) => {
			const deleted = await VitalSignModel.remove({ _id });
			return !!deleted.deletedCount ? _id : null;
		},
		updateVitalSign: async (parent, { _id, vitalSignInput }, ctx, info) => {
			const updatedVitalSign = await VitalSignModel.findOneAndUpdate(
				{ _id },
				{
					nurse: vitalSignInput.nurseId,
					patient: vitalSignInput.patientId,
					bodyTemperature: vitalSignInput.bodyTemperature,
					bloodPressure: vitalSignInput.bloodPressure,
					heartRate: vitalSignInput.heartRate,
					visitDate: vitalSignInput.visitDate,
				},
				{ new: true }
			).populate('patient nurse');

			return updatedVitalSign;
		},
	},
};
