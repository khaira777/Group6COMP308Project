import { Alert, alertResolvers } from "./alert.js";
import { DailyInfo, dailyInfoResolvers } from "./daily-info.js";
import { DailyTip, dailyTipResolvers } from "./daily-tip.js";
import { User, userResolvers } from "./user.js";
import { VitalSign, vitalSignResolvers } from "./vital-sign.js";
import { Prediction, predictionResolvers } from "./ai-part.js";

export const typeDefs = [
  User,
  DailyTip,
  Alert,
  VitalSign,
  DailyInfo,
  Prediction,
];
export const resolvers = [
  userResolvers,
  dailyTipResolvers,
  alertResolvers,
  vitalSignResolvers,
  dailyInfoResolvers,
  predictionResolvers,
];
