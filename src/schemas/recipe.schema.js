// import gql from 'graphql-tag';

// const recipeSchema = gql`
//   input RecipeInput {
//     name: String!
//     description: String!
//     image: String
//     ratings :String
//     ingredients:String!
//     cookingInstructions: String!
//     cookingTimeInMinutes : Int!
//   }

//   # union SingleRecipeResult = Recipe | NotExistsError

//   type Query {
//     recipe(id: ID!): Recipe!
//     getRecipes(amount: Int): [Recipe]
//   }

//   type RecipeSuccess {
//     isSuccess: Boolean
//     message: String!
//   }

//   type Mutation {
//     createRecipe(recipeInput: RecipeInput): Recipe!
//     deleteRecipe(id: ID!): RecipeSuccess
//     editRecipe(id: ID!, recipeInput: RecipeInput): RecipeSuccess
//   }
// `;

// export default recipeSchema;
