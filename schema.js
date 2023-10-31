export const typeDefs = `#graphql
    type Game {
        id: ID!, # ! at the end of the type name is indicating that the field is required (it cannot be null)
        title: String!, #name: type
        platform: [String!]!, 
        reviews: [Review!]
    }
    # to indicate that platforms is array of Strings, Here we need 2 ! as the array is required and the 
    # string inside the array can also not be null.
    

    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author
    }

    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!]
    }
    # We have to define the type Query every time it is re quired for every server/typedef
    type Query{
        reviews: [Review], # We create entrypoints for out data
        review(id: ID!): Review,
        games: [Game],
        game(id: ID!): Game,
        authors: [Author],
        author(id: ID!): Author
    }
    # We have to define mutations and how the parameters and return types should look
    type Mutation {
        deleteGame(id: ID!) : [Game],
        addGame(game: AddGameInput!): Game,
        updateGame(id: ID!, edits: EditGameInput!) : Game
    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    input EditGameInput {
        title: String,
        platform: [String!]
    }
`

// Data types in graphql int, float, string, boolean, ID we  use
// We can also make new types

