import { createSlice } from '@reduxjs/toolkit'

export interface ItemDetails {
	_id: string
	name: string
	status: string
	startPrice: number
	currentPrice: number
	duration: string
	author: Author
	createdAt: string
	updatedAt: string
	__v: number
	currentBidder: Author
}

export interface Author {
	_id: string
	email: string
}

export interface Author {
	_id: string
	email: string
}

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
	currentItem?: ItemDetails | null
}

const initialState: ItemState = {
	items: [],
	currentItem: null,
}

export const itemSlice = createSlice({
	name: 'itemSlice',
	initialState,
	reducers: {
		setItems: (state, action) => {
			const { payload } = action

			state.items = payload.data.items
		},
		setCurrentItem: (state, action) => {
			const { payload } = action

			state.currentItem = payload
		},
	},
})

export const { setItems, setCurrentItem } = itemSlice.actions

export default itemSlice.reducer
