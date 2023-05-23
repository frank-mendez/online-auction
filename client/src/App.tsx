import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainRoutes from './Routes/MainRoutes'

function App() {
	return (
		<BrowserRouter>
			<Toaster position='bottom-center' />
			<MainRoutes />
		</BrowserRouter>
	)
}

export default App
