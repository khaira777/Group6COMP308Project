import { gql } from "@apollo/client";

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
  REMOVE_VITAL_SIGN: gql`
    mutation RemoveVitalSign($_id: String!) {
      removeVitalSign(_id: $_id)
    }
  `,
  EDIT_VITAL_SIGN: gql`
    mutation UpdateVitalSign($_id: String!, $vitalSignInput: VitalSignInput!) {
      updateVitalSign(_id: $_id, vitalSignInput: $vitalSignInput) {
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
