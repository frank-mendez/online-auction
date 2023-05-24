import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
	token?: string | null
	isAuthenticated: boolean
	userId?: string | null
}

const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
	userId: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null
			state.userId = null
			state.isAuthenticated = false
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userId')
		},
		setAuthUser: (state, action) => {
			const { payload } = action

			localStorage.setItem('accessToken', payload.data.access_token)
			localStorage.setItem('userId', payload.data.id)

			state.token = payload.data.access_token
			state.userId = payload.data.id
			state.isAuthenticated = true
		},
	},
})

export const { logout, setAuthUser } = authSlice.actions

export default authSlice.reducer
