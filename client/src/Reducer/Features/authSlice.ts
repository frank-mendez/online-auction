import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
	token?: string | null
	isAuthenticated: boolean
}

const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null
			state.isAuthenticated = false
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userId')
		},
		setAuthUser: (state, action) => {
			const { payload } = action

			localStorage.setItem('accessToken', payload.data.access_token)
			localStorage.setItem('userId', payload.data.id)

			state.token = payload.data.access_token
			state.isAuthenticated = true
		},
	},
})

export const { logout, setAuthUser } = authSlice.actions

export default authSlice.reducer
