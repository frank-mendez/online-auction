import React from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'

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

const Login = () => {
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
				}}
			>
				<Typography variant='h5' gutterBottom>
					Login
				</Typography>
				<TextField label='Email' type='email' variant='outlined' sx={styles.textField} />
				<TextField label='Password' type='password' variant='outlined' sx={styles.textField} />
				<Button variant='contained' color='primary' sx={styles.button}>
					Login
				</Button>
				<Link to={'/register'} children={<Typography>Sign Up</Typography>} />
			</form>
		</Container>
	)
}

export default Login
