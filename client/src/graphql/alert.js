import { gql } from "@apollo/client";

export const ALERT_MUTATION = {
  SEND_ALERT: gql`
    mutation SendAlert($message: String!) {
      sendAlert(message: $message) {
        _id
        user
        message
        read
        createdAt
      }
    }
  `,
};
