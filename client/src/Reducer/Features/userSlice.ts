import { createSlice } from '@reduxjs/toolkit'

type UserState = {
	balance: number
	email: string
}

const initialState: UserState = {
	email: '',
	balance: 0,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { payload } = action

			state.email = payload.data.email
			state.balance = payload.data.balance ? payload.data.balance : 0
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
