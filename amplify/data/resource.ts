import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Recipe: a
    .model({
      thumbnail: a.string().required(),
      title: a.string().required(),
      steps: a.string().required(),
      likes: a.hasMany("Like", "recipeId"),
      comments: a.hasMany("Comment", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .authorization((allow) => [allow.owner()]),
  Like: a
    .model({
      count: a.integer().default(0),
      recipeId: a.id(), // Add recipeId field to link to Recipe
      recipe: a.belongsTo("Recipe", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .authorization((allow) => [allow.owner()]),
  Comment: a
    .model({
      content: a.string().required(),
      recipeId: a.id(), // Add recipeId field to link to Recipe
      recipe: a.belongsTo("Recipe", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 7,
    },
  },
});
