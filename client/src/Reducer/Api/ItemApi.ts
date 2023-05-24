import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BidItemDto, CreateItemDto } from '../Features/itemSlice'

export const itemApi = createApi({
	reducerPath: 'itemApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}/item`,
	}),
	endpoints: (builder) => ({
		createItem: builder.mutation({
			query: (payload: CreateItemDto) => ({
				url: '/create',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
				method: 'POST',
				body: payload,
			}),
		}),
		getUserItems: builder.mutation({
			query: (payload: { token: string; id: string }) => ({
				url: `/${payload.id}`,
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}),
		}),
		getAllItems: builder.mutation({
			query: (payload: { token: string }) => ({
				url: `/`,
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}),
		}),
		bidItem: builder.mutation({
			query: (payload: BidItemDto) => ({
				url: '/bid',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
				body: payload,
			}),
		}),
	}),
})

export const { useCreateItemMutation, useBidItemMutation, useGetAllItemsMutation, useGetUserItemsMutation } = itemApi
