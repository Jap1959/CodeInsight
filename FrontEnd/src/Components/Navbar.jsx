import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import logo from '../Images/Logo_main.png';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import { Alert, CardMedia, Snackbar } from '@mui/material';
import LeaderBoard from './LeaderBoard';

const pages = ['Home', 'Contests', 'LeaderBoard', 'Submissions'];


function    ResponsiveAppBar() {
    const { state } = React.useContext(userContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [settings, setsettings] = React.useState([]);
    const [alert, setAlert] = React.useState({
        severity: '',
        message: '',
    });
    React.useEffect(() => {
        if (state.login === true) {
            setsettings(['Dashboard', 'Profile', 'Logout']);
        } else {
            setsettings(['Login', 'Register', 'Home']);
        }

    }, []);

    const [open, setopen] = React.useState(false);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = async () => {
        try {
            const res = await axios.get('/logout');
            if (res.data.status === 200) {

                setAlert({
                    severity: 'success',
                    message: res.data.message,
                });

                setopen(true);
                setTimeout(() => {
                    setopen(false);
                    window.location.reload();
                }, 3000);
            } else {
                setAlert({
                    severity: 'error',
                    message: 'Try again later',
                });
                setopen(true);
                setTimeout(() => {
                    setopen(false);

                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                key={'error'}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
            <AppBar >
                <Container maxWidth='xl' >
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                            <CardMedia
                                component={"img"}
                                image={logo}
                                height={80}
                                width={"auto"}
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
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
                            >

                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }} >
                                        <Typography textAlign="center" > Home</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Link to={`/Contests`} style={{ textDecoration: 'none', color: 'black' }} >
                                        <Typography textAlign="center" >Contest</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Link to={`/LeaderBoard`} style={{ textDecoration: 'none', color: 'black' }} >
                                        <Typography textAlign="center" >LeaderBoard</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Link to={`/Submissions`} style={{ textDecoration: 'none', color: 'black' }} >
                                        <Typography textAlign="center" > 'Submissions</Typography>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <CodeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CodeInsights
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link to={'/'} style={{ textDecoration: 'none' }} ><Button style={{ color: window.location.pathname === '/Home' ? '#f44336' : 'white' }}

                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button></Link>
                            <Link to={'/Contests'} style={{ textDecoration: 'none' }} ><Button style={{ color: window.location.pathname === `/Contests` ? '#f44336' : 'white' }}

                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Contest
                            </Button></Link>
                            <Link to={'/LeaderBoard'} style={{ textDecoration: 'none' }} ><Button style={{ color: window.location.pathname === `/LeaderBoard` ? '#f44336' : 'white' }}

                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                LeaderBoard
                            </Button></Link>
                            <Link to={`/Submissions`} style={{ textDecoration: 'none' }} ><Button style={{ color: window.location.pathname === `/Submissions` ? '#f44336' : 'white' }}

                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Submissions
                            </Button></Link>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt='R'>
                                        {/* <PersonIcon alt="R"></PersonIcon> */}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
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
                                {settings.map((setting) => (
                                    setting === 'Logout' ? <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={handleLogout} >{setting}</Typography>
                                    </MenuItem> : <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Link to={`/${setting}`} style={{ textDecoration: "none", color: 'black' }}><Typography textAlign="center" >{setting}</Typography></Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 0.11, display: { xs: 'none', md: 'flex' } }}></Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default ResponsiveAppBar;
