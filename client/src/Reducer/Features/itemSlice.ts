import { createSlice } from '@reduxjs/toolkit'

export type Items = {
	name: string
	status: string
	startPrice: number
	currentPrice: number
}

export type CreateItemDto = {
	name: string
	startPrice: number
	duration: string
	author: string
	token: string
}

export type BidItemDto = {
	itemId: string
	bidPrice: number
	bidder: string
	token: string
}

type ItemState = {
	items: Items[]
}

const initialState: ItemState = {
	items: [],
}

export const itemSlice = createSlice({
	name: 'itemSlice',
	initialState,
	reducers: {
		setItems: (state, action) => {
			const { payload } = action

			state.items = payload.data.items
		},
	},
})

export const { setItems } = itemSlice.actions

export default itemSlice.reducer
