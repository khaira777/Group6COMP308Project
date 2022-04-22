import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pulseRate: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bodyTemperature: {
      type: Number,
      required: true,
    },
    respiratoryRate: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ patient: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyInfo", schema);
