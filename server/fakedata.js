const UserList = [

    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "canada",
        friends: [
            {
                id: 2,
                name: "Mahi",
                username: "Mahi",
                age: 20,
                nationality: "canada",
            },
            {
                id: 3,
                name: "mahi",
                username: "mahesh",
                age: 22,
                nationality: "NYC",
            } 
        ]
    },
    {
        id: 2,
        name: "Mahi",
        username: "Mahi",
        age: 20,
        nationality: "canada",
    },
    {
        id: 3,
        name: "mahi",
        username: "mahesh",
        age: 22,
        nationality: "NYC",
    },
];

const MovieList = [
    {
        id: 1,
        moviename: "Avangers",
        YOP: 2007,
        isinTheatre: true

    },
    {
        id: 2,
        moviename: "Avangers 2",
        YOP: 2010,
        isinTheatre: false 
    },
    {
        id: 3,
        moviename: "Avangers 3",
        YOP: 2012,
        isinTheatre: true
    }
];

module.exports = { UserList, MovieList } 