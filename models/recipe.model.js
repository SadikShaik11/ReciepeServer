
import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

const RecipeModel = model('Recipe', recipeSchema);
export default RecipeModel;
