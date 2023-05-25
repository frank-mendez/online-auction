import { Modal, Box, Typography, CircularProgress, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useBidItemMutation, useGetItemDetailsMutation } from '../../Reducer/Api/ItemApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BidItemDto, ItemDetails, setCurrentItem } from '../../Reducer/Features/itemSlice'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { setBalance } from '../../Reducer/Features/userSlice'

type ModalProps = {
	handleClose: () => void
	open: boolean
	itemId: string
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	borderRadius: '12px',
	p: 4,
}

const bidSchema = object({
	amount: string().nonempty('Amount is required'),
})

type BidInput = TypeOf<typeof bidSchema>

const BidModal = (props: ModalProps) => {
	const dispatch = useDispatch()
	const [getItemDetails, { data, isLoading }] = useGetItemDetailsMutation()
	const [bidItem, { data: bidData, isLoading: bidLoading, error }] = useBidItemMutation()
	const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null)
	const authUser = useSelector((state: RootState) => state.authUser)
	const currentItem = useSelector((state: RootState) => state.itemDetails.currentItem)
	const userBalance = useSelector((state: RootState) => state.userDetails.balance)

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<BidInput>({
		resolver: zodResolver(bidSchema),
	})

	const onSubmitHandler: SubmitHandler<BidInput> = async (values) => {
		try {
			const bidItemDto: BidItemDto = {
				itemId: props.itemId,
				bidPrice: +values.amount,
				bidder: authUser.userId!,
				token: authUser.token!,
			}
			await bidItem(bidItemDto)
		} catch (error: any) {
			alert('test')
		}
	}

	useEffect(() => {
		if (bidData) {
			console.log('bidData', bidData)
			dispatch(setCurrentItem(bidData))
			dispatch(setBalance({ balance: userBalance - bidData.currentPrice }))
			toast.success('Bid Submitted')
			reset()
		}
	}, [bidData])

	useEffect(() => {
		if (error) {
			if ('data' in error) {
				const { message } = error.data as any
				toast.error(message)
			}
		}
	}, [error])

	useEffect(() => {
		const getItemDetailResponse = async () => {
			await getItemDetails({ token: authUser.token!, itemId: props.itemId })
		}
		getItemDetailResponse()
	}, [])

	useEffect(() => {
		if (data) {
			console.log('data', data)
			dispatch(setCurrentItem(data))
			setItemDetails(data)
		}
	}, [data])

	return (
		<Modal open={props.open} onClose={props.handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
			<Box sx={style}>
				{isLoading ? (
					<CircularProgress />
				) : (
					<Fragment>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							{currentItem && currentItem.name ? currentItem.name : ''}
						</Typography>
						<Typography id='modal-modal-description' sx={{ mt: 2, mb: 5 }}>
							Current Price: {currentItem && currentItem.currentPrice ? currentItem.currentPrice : '0'} <br />
							Start Price: {currentItem && currentItem.startPrice ? currentItem.startPrice : '0'}
							<br />
							Duration: {currentItem && currentItem.duration ? currentItem.duration : ''} <br />
							Item Owner: {itemDetails && itemDetails.author.email ? itemDetails.author.email : ''} <br />
							Status: {currentItem && currentItem.status ? currentItem.status : ''} <br />
							Current Bidder: {itemDetails && itemDetails.currentBidder && itemDetails.currentBidder.email
								? itemDetails.currentBidder.email
								: ''}{' '}
							<br />
						</Typography>
						<form onSubmit={handleSubmit(onSubmitHandler)}>
							<TextField
								sx={{ mb: 2 }}
								label='Amount'
								fullWidth
								required
								type='text'
								error={!!errors['amount']}
								helperText={errors['amount'] ? errors['amount'].message : ''}
								{...register('amount')}
							/>

							<LoadingButton variant='contained' fullWidth type='submit' loading={bidLoading} sx={{ py: '0.8rem', mt: '1rem' }}>
								Submit Bid
							</LoadingButton>
						</form>
					</Fragment>
				)}
			</Box>
		</Modal>
	)
}

export default BidModal
