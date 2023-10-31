import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from './_db.js';
 
// types
import { typeDefs } from "./schema.js";
import { platform } from "os";

// resolvers

            // Even when we are returning the entire object, when user queries form 
            /*
             * query ExampleQuery {
                    games {
                        title
                    }
                } 
                GraphQL takes care of what attributes to return for us
             */
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        // We get access to parent in the resolver chain
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => parent.id === review.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => args.id !== game.id)
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString() // We add a random ID to game
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {
                        ...game,
                        ...args.edits
                    }
                }
                return game
            })

            return db.games.find((game) => game.id === args.id)
        }
    }
}

// server setup
const server = new ApolloServer({
    // Typedefs - structure the map/graph but does not handle any queries
    typeDefs,
    resolvers
    // resolvers
})

const { url } = await startStandaloneServer(server, {
    listen : { port: 4000 }
})

console.log('Server ready at port', url)