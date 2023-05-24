import { Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import ResponsiveAppBar from '../../Common/CommonAppBar'
import { LoadingButton } from '@mui/lab'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf, number } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCreateItemMutation } from '../../Reducer/Api/ItemApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { CreateItemDto } from '../../Reducer/Features/itemSlice'

const createItemSchema = object({
	name: string().nonempty('Email is required'),
	startPrice: string().nonempty('Price is required'),
	duration: string().nonempty('Duration is required'),
})

type CreateItemInput = TypeOf<typeof createItemSchema>

const CreateItem = () => {
	const [createItem, { isLoading, data, error }] = useCreateItemMutation()
	const authUser = useSelector((state: RootState) => state.authUser)
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<CreateItemInput>({
		resolver: zodResolver(createItemSchema),
	})

	const onSubmitHandler: SubmitHandler<CreateItemInput> = async (values) => {
		try {
			const createDto: CreateItemDto = {
				name: values.name,
				startPrice: +values.startPrice,
				duration: values.duration,
				token: authUser.token!,
				author: authUser.userId!,
			}
			await createItem(createDto)
			console.log('values', createDto)
		} catch (error: any) {
			if (typeof error.data.message === 'string') {
				toast.error('Something went wrong')
			} else {
				for (let err of error.data.message) {
					toast.error(err.charAt(0).toUpperCase() + err.slice(1))
				}
			}
		}
	}

	useEffect(() => {
		if (data) {
			toast.success('Item Created')
			reset()
		}
	}, [data])

	useEffect(() => {
		if (error) {
			if ('data' in error) {
				const { message } = error.data as any
				if (message === 'string') {
					toast.error('Something went wrong')
				} else if (message.length > 0) {
					for (let err of message) {
						toast.error(err.charAt(0).toUpperCase() + err.slice(1))
					}
				}
			}
		}
	}, [error])

	return (
		<Fragment>
			<CssBaseline />
			<ResponsiveAppBar />
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '40px',
						border: `1px solid`,
						borderRadius: '10px',
						backgroundColor: 'white',
						width: '500px',
					}}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<Typography variant='h5' gutterBottom>
						Create Item
					</Typography>
					<TextField
						sx={{ mb: 2 }}
						label='Name'
						fullWidth
						required
						type='text'
						error={!!errors['name']}
						helperText={errors['name'] ? errors['name'].message : ''}
						{...register('name')}
					/>
					<TextField
						sx={{ mb: 2 }}
						label='Start Price'
						fullWidth
						required
						type='number'
						error={!!errors['startPrice']}
						helperText={errors['startPrice'] ? errors['startPrice'].message : ''}
						{...register('startPrice')}
					/>
					<TextField
						sx={{ mb: 2 }}
						label='Duration'
						fullWidth
						required
						type='text'
						error={!!errors['duration']}
						helperText={errors['duration'] ? errors['duration'].message : ''}
						{...register('duration')}
					/>
					<LoadingButton variant='contained' fullWidth type='submit' loading={isLoading} sx={{ py: '0.8rem', mt: '1rem' }}>
						Create
					</LoadingButton>
					<Link to={'/'} children={<Typography>Cancel</Typography>} />
				</form>
			</Container>
		</Fragment>
	)
}

export default CreateItem
