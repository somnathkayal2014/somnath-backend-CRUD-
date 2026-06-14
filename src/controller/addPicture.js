import multerSchema from "../models/multerSchema.js";

export const addPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image type",
      });
    }

    // const imageUrl = `${req.file.filename}`;
    const imageUrl = `http://localhost:8002/upload/${req.file.filename}`;

    const uploadedData = await multerSchema.create({
      picture: imageUrl,
    });
    return res.status(201).json({
      success: true,
      message: "Image Uploaded Successfully",
      uploadedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
