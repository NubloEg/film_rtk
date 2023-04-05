import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";



export const filmsApi = createApi({
    reducerPath: 'films/filmsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
    endpoints: (builder) => ({
        getAllFilms: builder.query({
            query:()=> ({
                url:'list_movies.json'
            }),

        }),
        getSuggestions: builder.query({
            query: (id)=>`movie_suggestions.json?movie_id=${id}`

        }),
        getCast: builder.query({
            query: (id)=>`movie_details.json?movie_id=${id}&with_images=true&with_cast=true`

        })
    }),
})

export const {useGetAllFilmsQuery,useGetSuggestionsQuery,useGetCastQuery}=filmsApi