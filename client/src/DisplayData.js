import React, { useState } from "react";
import { useQuery , gql, useLazyQuery, useMutation} from "@apollo/client";



const QUERY_ALL_DATA = gql`
    query getAllUsers{
        users{
        name
        username
        age
        nationality
        }
    }

`;

const GET_MOVIES = gql`
    query getallmovies{
        movies{
            moviename
            YOP
            isinTheatre
        }
    }

`;

const GET_A_MOVIE = gql`
    query Movie($moviename: String){
    movie (moviename: $moviename){
        moviename
        YOP
        isinTheatre
    }
}

`;

const Createuser = gql`
    mutation($input: createUserInput){
    createUser(input: $input) {
        name
        username
        age
        nationality
    }
} 

`;

function DisplayData(){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(null);
    const [nation, setNation] = useState(""); 

    const [movieSearch, setMovieSearch] = useState("");

    const { data, error } = useQuery(QUERY_ALL_DATA);
    const { data: moviedata } = useQuery(GET_MOVIES);

    const [fetch, { data: movieSearchData, error: movieError } ] = useLazyQuery(GET_A_MOVIE);
    const [create] = useMutation(Createuser)

    return(
    <div>
        <div>
            <input type="text" placeholder="Name" onChange={(e) => {
                setName(e.target.value)
            }} 
            />

            <input type="text" placeholder="Username" onChange={(e) => {
                setUsername(e.target.value)
            }} 
            />
            <input type="number" placeholder="age" onChange={(e) => {
                setAge(e.target.value)
            }} 
            />
            <input type="text" placeholder="Nationality" onChange={(e) => {
                setNation(e.target.value)
            }} 
            />
            <button onClick={() => {
                create({
                    variables: {
                        input: {
                        name,
                        username,
                        age: 21,
                        nationality: nation 
                        }
                    }
                })
            }}> Createuser 
            
            </button>
        </div>
        {
            data && data.users.map((user) => {
                return <div> 
                    <h1>Name : { user.name }</h1>
                    <h1>Username : { user.username }</h1>
                    <h1>age : { user.age }</h1>
                    <h1>Nationality : { user.nationality }</h1>
                    <h1> <br/> </h1>
                </div>
            })
        }
        <div>
        {
            moviedata && moviedata.movies.map((movie) => {
                return <div>
                <h1>MovieName : { movie.moviename }</h1>
                </div>
            })
        }
        </div>
        <div>
            <input type="text" palceholder="MovieName" onChange={(e) => {
                setMovieSearch(e.target.value);
                }}/>
            <button onClick={() => {
                fetch({
                    variables:{
                        moviename: movieSearch
                    }
                })
            }}> Get </button>
            <div>
                {
                    movieSearchData && (
                         <div>
                             <h1>moviename: { movieSearchData.movie.moviename }</h1>
                            <h1>YOP: { movieSearchData.movie.YOP }</h1>
                         </div>
                    )
                }
            </div>

        </div>
    </div>
)
}

export default DisplayData