import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Data, filmInt} from "../reducer/film";





export const filmsApi = createApi({
    reducerPath: 'films/filmsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
    endpoints: (builder) => ({
        getAllFilms: builder.query({
            query: (page)=>`list_movies.json?page=${page}`


        }),
        getSuggestions: builder.query({
            query: (id)=>`movie_suggestions.json?movie_id=${id}`

        }),
        getFilm: builder.query({
            query: (id)=>`movie_details.json?movie_id=${id}&with_images=true&with_cast=true`

        }),

    }),
})

export const {useGetAllFilmsQuery,useGetSuggestionsQuery,useGetFilmQuery}=filmsApi