import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = (props: { isAuthenticated: boolean; children: JSX.Element }) => {
	if (props.isAuthenticated) {
		return props.children
	}

	return <Navigate to='/login' />
}

export default ProtectedRoutes
