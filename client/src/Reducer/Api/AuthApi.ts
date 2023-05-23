import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}/auth/`,
	}),
	endpoints: (builder) => ({
		submitLogin: builder.mutation({
			query: (payload: { email: string; password: string }) => ({
				url: 'login',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useSubmitLoginMutation } = authApi
