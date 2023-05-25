import {
	Button,
	CircularProgress,
	Container,
	CssBaseline,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import ResponsiveAppBar from '../../Common/CommonAppBar'
import { useGetAllItemsMutation } from '../../Reducer/Api/ItemApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import BidModal from './BidModal'

export type RowData = {
	id: string
	name: string
	startPrice: number
	currentPrice: number
	duration: string
	status: string
	currentBidder?: string | null
	author: string
	owner: string
}

const Dasbhoard = () => {
	const [getAllItems, { data, isLoading }] = useGetAllItemsMutation()
	const authUser = useSelector((state: RootState) => state.authUser)
	const [rows, setRows] = useState<RowData[]>([])
	const [open, setOpen] = useState<boolean>(false)
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
	const userBalance = useSelector((state: RootState) => state.userDetails.balance)

	useEffect(() => {
		const getAllItemsResponse = async () => {
			await getAllItems({ token: authUser.token! })
		}
		getAllItemsResponse()
	}, [userBalance])

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
					owner: item.author.email,
				}
			})
			setRows(mappedItems)
		}
	}, [data, setRows])

	const clickBidHandler = (id: string) => {
		setOpen(true)
		setSelectedItemId(id)
	}

	const handleClose = () => {
		console.log('close')
		setSelectedItemId(null)
		setOpen(false)
	}

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
								<TableCell>Start Price</TableCell>
								<TableCell>Current Price</TableCell>
								<TableCell>Duration</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Owner</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						{isLoading ? (
							<TableBody>
								<TableRow>
									<TableCell align='center' rowSpan={5}>
										<CircularProgress />
									</TableCell>
								</TableRow>
							</TableBody>
						) : (
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell>{row.startPrice}</TableCell>
										<TableCell>{row.currentPrice}</TableCell>
										<TableCell>{row.duration}</TableCell>
										<TableCell>{row.status}</TableCell>
										<TableCell>{row.owner}</TableCell>
										<TableCell>
											<Button onClick={() => clickBidHandler(row.id)} disabled={row.status === 'Draft'} variant='contained' color='primary'>
												Bid
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
				{selectedItemId && <BidModal open={open} handleClose={handleClose} itemId={selectedItemId} />}
			</Container>
		</Fragment>
	)
}

export default Dasbhoard
