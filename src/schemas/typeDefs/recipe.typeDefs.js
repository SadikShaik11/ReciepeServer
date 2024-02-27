import gql from 'graphql-tag';

const recipeTypeDefs = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: String
    image:String
    ratings:String
  }
`;
export default recipeTypeDefs;
