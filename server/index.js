const { ApolloServer, gql } = require('apollo-server')
const { UserList, MovieList } = require('./fakedata')
const _ = require('lodash')

const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!

    },
    type Movies{
        id: ID
        moviename: String
        YOP: Int
        isinTheatre: Boolean
    }
    type Query{
        users: [User]
        user(id:ID): User
        movies: [Movies]
        movie(moviename:String): Movies
    }
    input createUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    input updateUserInput{
        id: ID!
        newusername: String!
    }

    type Mutation{
        createUser(input: createUserInput): User
        updateUser(input: updateUserInput): User 
        deleteUser(id: ID!): User    
    }

`

const resolvers = {
    Query:{
        users(){
            return UserList;
        },
        user(parent,args){
            const id = args.id
            const user = _.find(UserList, { id })
            return user
        },
        movies(){
            return MovieList
        },
        movie(parent,args){
            const moviename = args.moviename
            const movie = _.find(MovieList, { moviename })
            return movie
        }
        
    },
    Mutation:{
        createUser(parent,args){
            const user = args.input;
            const lastId = UserList[UserList.length-1].id
            user.id = lastId+1
            UserList.push(user)
            return user
        },
        updateUser(parent,args){
            const { id , newusername } = args.input 
            let updatedUser;
            UserList.forEach((user) => {
                if(user.id === Number(id)){
                    user.username = newusername;
                    updatedUser = user;
                }
            })
            return updatedUser;
        },
        deleteUser(parent, args){
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) =>{
    console.log(`Server Running on ${url} `)
}) 