import { Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import ResponsiveAppBar from '../../Common/CommonAppBar'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { useDepositMutation } from '../../Reducer/Api/UserApi'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { setBalance } from '../../Reducer/Features/userSlice'

const depositSchema = object({
	amount: string().nonempty('Amount is required'),
})

type DepositInput = TypeOf<typeof depositSchema>

const Deposit = () => {
	const dispatch = useDispatch()
	const [deposit, { isLoading, data, error }] = useDepositMutation()
	const authUser = useSelector((state: RootState) => state.authUser)
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<DepositInput>({
		resolver: zodResolver(depositSchema),
	})

	const onSubmitHandler: SubmitHandler<DepositInput> = async (values) => {
		try {
			await deposit({ id: authUser.userId!, deposit: +values.amount, token: authUser.token! })
		} catch (error: any) {
			alert('test')
		}
	}

	useEffect(() => {
		if (data) {
			console.log('data', data)
			dispatch(setBalance({ balance: data.balance }))
			toast.success('Deposited')
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
						Deposit
					</Typography>
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

					<LoadingButton variant='contained' fullWidth type='submit' loading={isLoading} sx={{ py: '0.8rem', mt: '1rem' }}>
						Deposit
					</LoadingButton>
					<Link to={'/'} children={<Typography>Cancel</Typography>} />
				</form>
			</Container>
		</Fragment>
	)
}

export default Deposit
