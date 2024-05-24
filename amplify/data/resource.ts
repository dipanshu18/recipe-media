import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Recipe: a
    .model({
      recipeId: a.id().required(),
      thumbnail: a.string().required(),
      title: a.string().required(),
      body: a.string().required(),
      likes: a.hasMany("Like", "recipeId"),
      comments: a.hasMany("Comment", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .authorization((allow) => [allow.owner()]),
  Like: a
    .model({
      likeId: a.id().required(), // Add a unique identifier for Like model
      count: a.integer(),
      recipeId: a.id().required(), // Add recipeId field to link to Recipe
      recipe: a.belongsTo("Recipe", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .identifier(["likeId"])
    .authorization((allow) => [allow.owner()]),
  Comment: a
    .model({
      commentId: a.id().required(), // Add a unique identifier for Comment model
      content: a.string().required(),
      recipeId: a.id().required(), // Add recipeId field to link to Recipe
      recipe: a.belongsTo("Recipe", "recipeId"),
      owner: a.string().authorization((allow) => allow.owner()),
    })
    .identifier(["commentId"])
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
