import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locationLatitude: {
      type: Number,
      required: true,
    },
    locationLongitude: {
      type: Number,
      required: true,
    },
    numberOfRides: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);
