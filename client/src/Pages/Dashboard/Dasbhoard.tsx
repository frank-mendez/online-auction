import { Button, Container, CssBaseline } from '@mui/material'
import React, { Fragment } from 'react'
import ResponsiveAppBar from '../../Common/CommonAppBar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Dasbhoard = () => {
	const rows = [
		{ id: '1', name: 'Item 1', currentPrice: 10.0, duration: '1h' },
		{ id: '2', name: 'Item 2', currentPrice: 120.0, duration: '1h' },
		{ id: '3', name: 'Item 3', currentPrice: 130.0, duration: '1h' },
		{ id: '4', name: 'Item 4', currentPrice: 140.0, duration: '1h' },
	]

	return (
		<Fragment>
			<CssBaseline />
			<ResponsiveAppBar />
			<Container>
				<TableContainer sx={{ marginTop: '50px' }} component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Current Price</TableCell>
								<TableCell align='right'>Duration</TableCell>
								<TableCell align='right'>Bid</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right'>{row.currentPrice}</TableCell>
									<TableCell align='right'>{row.duration}</TableCell>
									<TableCell align='right'>
										<Button color='primary'>Bid</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</Fragment>
	)
}

export default Dasbhoard
