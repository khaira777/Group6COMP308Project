import { gql } from '@apollo/client';

export const VITAL_SIGN_QUERY = {
	GET_VITAL_SIGNS: gql`
		query getVitalSigns($patientId: String!) {
			getVitalSigns(patientId: $patientId) {
				_id
				nurse {
					_id
					name
					email
				}
				patient {
					_id
					name
					email
				}
				bodyTemperature
				bloodPressure
				heartRate
				visitDate
			}
		}
	`,
};

export const VITAL_SIGN_MUTATION = {
	ADD_VITAL_SIGN: gql`
		mutation AddVitalSign($vitalSignInput: VitalSignInput!) {
			addVitalSign(vitalSignInput: $vitalSignInput) {
				_id
				nurse {
					_id
				}
				patient {
					_id
				}
				bodyTemperature
				bloodPressure
				heartRate
				visitDate
			}
		}
	`,
};
