import mongoose from "mongoose";

const multerSchema = new mongoose.Schema(
  {
    picture: {
      type: "string",
    },
  },
  { timestamps: true },
);
export default mongoose.model("picture", multerSchema);
