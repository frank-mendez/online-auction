import { createSlice } from '@reduxjs/toolkit'
import { Items } from './itemSlice'

type UserState = {
	balance: number
	email: string
	itemsCreated: Items[]
}

const initialState: UserState = {
	email: '',
	balance: 0,
	itemsCreated: [],
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { payload } = action

			state.email = payload.data.email
			state.balance = payload.data.balance ? payload.data.balance : 0
			state.itemsCreated = payload.data.itemsCreated
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
