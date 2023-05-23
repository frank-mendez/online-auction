import React, { useEffect } from 'react'
import { Container, Typography, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { useRegisterUserMutation } from '../../Reducer/Api/UserApi'
import toast from 'react-hot-toast'

const registerSchema = object({
	email: string().nonempty('Email is required').email('Email is invalid'),
	password: string()
		.nonempty('Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
})

type RegisterInput = TypeOf<typeof registerSchema>

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

const Register = () => {
	const [registerUser, { isLoading, data }] = useRegisterUserMutation()
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
		try {
			await registerUser(values).unwrap()
		} catch (error: any) {
			if (typeof error.data.message === 'string') {
				toast.error('Email already in use')
			} else {
				for (let err of error.data.message) {
					toast.error(err.charAt(0).toUpperCase() + err.slice(1))
				}
			}
		}
	}

	useEffect(() => {
		if (data) {
			toast.success('User Registered')
			reset()
		}
	}, [data])

	return (
		<Container maxWidth='xs' sx={styles.root}>
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
					Register
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
					Register
				</LoadingButton>
				<Link to={'/login'} children={<Typography>Already have an account?</Typography>} />
			</form>
		</Container>
	)
}

export default Register
