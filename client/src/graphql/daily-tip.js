import { gql } from "@apollo/client";

export const DAILY_TIP_QUERY = {
  GET_ALL_DAILY_TIPS: gql`
    query GetAllDailyTips {
      dailyTips {
        _id
        user {
          _id
          name
        }
        content
        createdAt
      }
    }
  `,
};

export const DAILY_TIP_MUTATION = {
  ADD_DAILY_TIP: gql`
    mutation AddDailyTip($content: String!) {
      addDailyTip(content: $content) {
        _id
        user {
          _id
          name
        }
        content
        createdAt
      }
    }
  `,
};
