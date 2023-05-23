import React from 'react'
import Dasbhoard from '../Pages/Dashboard/Dasbhoard'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import { Route, Routes, useLocation } from 'react-router-dom'

interface RouteItem {
	path: string
	element: JSX.Element
}

const MainRoutes = () => {
	const rotues: RouteItem[] = [
		{ path: '/', element: <Dasbhoard /> },
		{ path: '/login', element: <Login /> },
		{ path: '/register', element: <Register /> },
	]

	return (
		<Routes>
			{rotues.map((route) => {
				return <Route key={route.path} path={route.path} element={route.element} />
			})}
		</Routes>
	)
}

export default MainRoutes
