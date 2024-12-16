import mongoose, { Types } from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, min: 5, max: 20 },
    slug: { type: String, required: true, unique: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
    image: { id: { type: String }, url: { type: String } },
    category: { type: Types.ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt
  }
);

// Define the model
const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

// Export as a named export
export { subCategoryModel };
