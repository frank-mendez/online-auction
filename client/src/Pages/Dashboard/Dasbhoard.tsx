import { Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import ResponsiveAppBar from '../../Common/CommonAppBar'
import { useGetAllItemsMutation } from '../../Reducer/Api/ItemApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'

export type RowData = {
	id: string
	name: string
	startPrice: number
	currentPrice: number
	duration: string
	status: string
	currentBidder?: string | null
	author: string
}

const Dasbhoard = () => {
	const [getAllItems, { data, isLoading }] = useGetAllItemsMutation()
	const authUser = useSelector((state: RootState) => state.authUser)
	const [rows, setRows] = useState<RowData[]>([])

	useEffect(() => {
		const getAllItemsResponse = async () => {
			await getAllItems({ token: authUser.token! })
		}
		getAllItemsResponse()
	}, [])

	useEffect(() => {
		if (data && data.length > 0) {
			const mappedItems: RowData[] = data.map((item: any) => {
				return {
					id: item._id,
					name: item.name,
					status: item.status,
					startPrice: item.startPrice,
					currentPrice: item.currentPrice,
					duration: item.duration,
					author: item.author._id,
				}
			})
			setRows(mappedItems)
		}
	}, [data, setRows])

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
