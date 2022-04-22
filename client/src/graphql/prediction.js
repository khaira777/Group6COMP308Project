import { gql } from "@apollo/client";

export const PREDICTION_MUTATION = {
  ADD_PREDICTION: gql`
    mutation AddPrediction(
      $Age: Float!
      $RestingBP: Float!
      $Cholesterol: Float!
      $FastingBS: Float!
      $MaxHR: Float!
      $Oldpeak: Float!
    ) {
      addPrediction(
        Age: $Age
        RestingBP: $RestingBP
        Cholesterol: $Cholesterol
        FastingBS: $FastingBS
        MaxHR: $MaxHR
        Oldpeak: $Oldpeak
      ) {
        value
      }
    }
  `,
};
