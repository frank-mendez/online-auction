import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}/users/`,
	}),
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (payload: { email: string; password: string }) => ({
				url: '',
				method: 'POST',
				body: payload,
			}),
		}),
		deposit: builder.mutation({
			query: (payload: { id: string; deposit: number; token: string }) => ({
				url: 'deposit',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
				body: payload,
			}),
		}),
	}),
})

export const { useRegisterUserMutation, useDepositMutation } = userApi
