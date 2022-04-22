import { gql } from "@apollo/client";

export const DAILY_INFO_QUERY = {
  GET_DAILY_INFO: gql`
    query getDailyInfo {
      dailyInfo {
        _id
        pulseRate
        bloodPressure
        weight
        bodyTemperature
        respiratoryRate
        date
      }
    }
  `,
};

export const DAILY_INFO_MUTATION = {
  ADD_DAILY_INFO: gql`
    mutation addDailyInfo($dailyInfoInput: DailyInfoInput!) {
      addDailyInfo(dailyInfo: $dailyInfoInput) {
        _id
        date
        pulseRate
        bloodPressure
        weight
        bodyTemperature
        respiratoryRate
        patient {
          _id
          name
          email
        }
      }
    }
  `,
  UPDATE_DAILY_INFO: gql`
    mutation updateDailyInfo($_id: ID!, $dailyInfoInput: DailyInfoInput!) {
      updateDailyInfo(_id: $_id, dailyInfo: $dailyInfoInput) {
        _id
        date
        pulseRate
        bloodPressure
        weight
        bodyTemperature
        respiratoryRate
        patient {
          _id
          name
          email
        }
      }
    }
  `,
};
