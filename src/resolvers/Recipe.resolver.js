/**
 * @logger function 
 * @description : to log track the APi Activity
 */
import { logger } from '../helpers/logger.js';
import RecipeModel from '../models/recipe.model.js';
import RecipeHelper from '../helpers/recipe.helper.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';

const recipeResolver = {
  Query: {
    recipe: async (parent, { id }, contextValue) => {
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        throwCustomError(
          `Recipe with id ${id} does not exist.`,
          ErrorTypes.NOT_FOUND
        );
      }
      return {
        id: recipe._id,
        ...recipe._doc,
      };
    },

    getRecipes: async (parent, args, contextValue) => {
      try {
        // contextValue.req.logger.info('Inside Recipe Resolver: getRecipes Method');
        const amount = args.amount;
        const allRecipes = await RecipeModel.find()
          .sort({ createdAt: -1 })
          .limit(amount);
        return allRecipes;
      } catch (error) {
        console.log(error);
        logger.error('Inside Recipe Resolver: error while getting all the recipes');
        throwCustomError('Error while fetching recipes.', ErrorTypes.INTERNAL_SERVER_ERROR);
      }
    },
  },

  Mutation: {
    createRecipe: async (_, { recipeInput }, contextValue) => {
      try {
        logger.info("inside Mutations : createRecipe method")
        const newRecipe = await RecipeModel.create(recipeInput)
        return newRecipe;
      } catch (err) {
        return err
      }
    },

    deleteRecipe: async (_, { id }, contextValue) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
      if (!isExists) {
        throwCustomError(
          `Recipe with id ${id} does not exist.`,
          ErrorTypes.NOT_FOUND
        );
      }
      const isDeleted = (await RecipeModel.deleteOne({ _id: id })).deletedCount;
      return {
        isSuccess: isDeleted,
        message: 'Recipe deleted.',
      };
    },

    editRecipe: async (_, { id, recipeInput: { name, description } }, { user }) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
      if (!isExists) {
        throwCustomError(
          `Recipe with id ${id} does not exist.`,
          ErrorTypes.NOT_FOUND
        );
      }
      const isEdited = (
        await RecipeModel.updateOne(
          { _id: id },
          { name: name, description: description }
        )
      ).modifiedCount;
      return {
        isSuccess: isEdited, // return 1 if something is edited, 0 if nothing is edited
        message: 'Recipe edited.',
      };
    },

  },
  

};


export default recipeResolver;
