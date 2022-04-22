import { gql } from "apollo-server-express";
import AlertModel from "../database/model/alert.js";

export const Alert = gql`
  type Mutation {
    sendAlert(message: String!): Alert
  }

  type Alert {
    _id: ID!
    user: String
    message: String
    read: Boolean
    createdAt: String
  }
`;

export const alertResolvers = {
  Mutation: {
    sendAlert: async (parent, args, ctx, info) => {
      const { message } = args;
      const { userId } = ctx;
      if (!userId) {
        throw new Error("You must be logged in to send an alert");
      }

      const alert = new AlertModel({ message, user: userId });
      return await alert.save();
    },
  },
};
