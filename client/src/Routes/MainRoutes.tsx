import React from 'react'
import Dasbhoard from '../Pages/Dashboard/Dasbhoard'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../Reducer/Store'
import ProtectedRoutes from './ProtectedRoutes'
import CreateItem from '../Pages/CreateItem/CreateItem'

interface RouteItem {
	path: string
	element: JSX.Element
}

const MainRoutes = () => {
	const authUser = useSelector((state: RootState) => state.authUser)
	const rotues: RouteItem[] = [
		{ path: '/', element: <ProtectedRoutes isAuthenticated={authUser.isAuthenticated} children={<Dasbhoard />} /> },
		{ path: '/login', element: <Login /> },
		{ path: '/create-item', element: <ProtectedRoutes isAuthenticated={authUser.isAuthenticated} children={<CreateItem />} /> },
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
