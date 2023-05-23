import React, { useEffect } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate } from 'react-router-dom'
import { useSubmitLoginMutation } from '../../Reducer/Api/AuthApi'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../Reducer/Features/authSlice'

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	textField: {
		margin: '10px',
		width: '100%',
	},
	button: {
		margin: '20px',
	},
}

const loginSchema = object({
	email: string().nonempty('Email is required').email('Email is invalid'),
	password: string()
		.nonempty('Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
})

type LoginInput = TypeOf<typeof loginSchema>

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [submitLogin, { isLoading, data }] = useSubmitLoginMutation()
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
		try {
			await submitLogin({ username: values.email, password: values.password }).unwrap()
		} catch (error: any) {
			if (typeof error.data.message === 'string') {
				toast.error('Invalid Credentials')
			} else {
				for (let err of error.data.message) {
					toast.error(err.charAt(0).toUpperCase() + err.slice(1))
				}
			}
		}
	}

	useEffect(() => {
		if (data) {
			toast.success('Sucess!')
			reset()
			console.log('data', data)
			dispatch(setAuthUser(data))
			navigate('/')
		}
	}, [data])

	return (
		<Container maxWidth='xs' sx={styles.root}>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '20px',
					border: `1px solid`,
					borderRadius: '10px',
					backgroundColor: 'white',
					width: '500px',
				}}
				onSubmit={handleSubmit(onSubmitHandler)}
			>
				<Typography variant='h5' gutterBottom>
					Login
				</Typography>
				<TextField
					sx={{ mb: 2 }}
					label='Email'
					fullWidth
					required
					type='email'
					error={!!errors['email']}
					helperText={errors['email'] ? errors['email'].message : ''}
					{...register('email')}
				/>
				<TextField
					sx={{ mb: 2 }}
					label='Password'
					fullWidth
					required
					type='password'
					error={!!errors['password']}
					helperText={errors['password'] ? errors['password'].message : ''}
					{...register('password')}
				/>
				<LoadingButton variant='contained' fullWidth type='submit' loading={isLoading} sx={{ py: '0.8rem', mt: '1rem' }}>
					Login
				</LoadingButton>
				<Link to={'/register'} children={<Typography>Sign Up</Typography>} />
			</form>
		</Container>
	)
}

export default Login
