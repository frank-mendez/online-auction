import * as React from 'react'
import { AppBar, Avatar, Box, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Reducer/Store'
import { logout } from '../Reducer/Features/authSlice'
import { useNavigate } from 'react-router-dom'

const settings = ['Create New Item', 'Deposit', 'Logout']

function ResponsiveAppBar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const user = useSelector((state: RootState) => state.userDetails)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = (key: string) => {
		console.log('key', key)
		if (key === 'Logout') {
			dispatch(logout())
		}

		if (key === 'Create New Item') {
			navigate('/create-item')
		}
		setAnchorElUser(null)
	}

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Online Auction
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						></Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						<Typography>Balance: {user.balance}</Typography>
					</Box>
					<Box ml={'20px'} sx={{ flexGrow: 0 }}>
						<Tooltip title={user.email}>
							<IconButton style={{ color: 'white' }} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem key={user.email}>
								<Typography textAlign='center'>{user.email}</Typography>
							</MenuItem>
							<Divider />
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default ResponsiveAppBar
