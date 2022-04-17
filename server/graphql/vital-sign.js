import { gql } from 'apollo-server-core';
import VitalSignModel from '../database/model/vital-sign.js';

// TODO: Add pagination if have time
export const VitalSign = gql`
	type Query {
		getVitalSigns(patientId: String!): [VitalSign]
	}

	type Mutation {
		addVitalSign(vitalSignInput: VitalSignInput!): VitalSign
	}

	type VitalSign {
		_id: ID!
		nurse: User!
		patient: User!
		bodyTemperature: Float!
		bloodPressure: Float!
		heartRate: Float!
		visitDate: String!
	}

	input VitalSignInput {
		nurseId: String!
		patientId: String!
		bodyTemperature: Float!
		bloodPressure: Float!
		heartRate: Float!
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
			const newVitalSign = new VitalSignModel({
				nurse: vitalSignInput.nurseId,
				patient: vitalSignInput.patientId,
				bodyTemperature: vitalSignInput.bodyTemperature,
				bloodPressure: vitalSignInput.bloodPressure,
				heartRate: vitalSignInput.heartRate,
				visitDate: vitalSignInput.visitDate,
			});

			return await newVitalSign.save();
		},
	},
};
