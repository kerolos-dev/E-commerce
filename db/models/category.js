import  mongoose   from 'mongoose'
import slugify  from 'slugify'

// Define the schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  
}, { timestamps: true });

// Add post middleware for "deleteOne"
categorySchema.post("deleteOne", { document: true, query: false }, async function(doc) {
  if (doc) {
    console.log(`Category deleted: ${doc}`);
    // Perform any additional cleanup logic here
  }
});

// Create the model
export const CategoryModel = mongoose.model("Category", categorySchema);


