import { AppBar, Button, Toolbar, Typography, styled } from '@mui/material'
import React from 'react'
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: "#009879",
})

export default function Header() {
    const navigate = useNavigate()
    const pathname = window.location.pathname

    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }} onClick={() => { navigate('/') }}>Task</Typography>
                <TaskIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                {pathname !== '/transaction' ? <Button variant='contained' color='secondary' sx={{ marginLeft: 'auto' }} onClick={() => { navigate('/transaction') }}>
                    Transaction
                </Button> : null}
                {pathname !== '/reward' ? <Button variant='contained' color='secondary' sx={{ marginLeft: 'auto' }} onClick={() => { navigate('/reward') }}>
                    Reward
                </Button> : null}
                {pathname !== '/new' ?
                    <Button variant='contained' color='secondary' sx={{ marginLeft: 'auto' }} onClick={() => { navigate('/new') }}>
                        New User
                    </Button> : null}
            </StyledToolbar>
        </AppBar>
    )
}
