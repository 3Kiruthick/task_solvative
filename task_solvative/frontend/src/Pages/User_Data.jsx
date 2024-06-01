import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../Components'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function User_Data() {

    const location = useLocation();
    const userData = location?.state?.singleUser;
    const allUserData = location?.state?.allUser;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setUserDetails(userData)
        }, 500)
    }, [userData])

    const [formData, setFormData] = useState({
        fromName: '',
        toName: '',
        amount: '',
        from: '',
        to: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (e) => {
        const selectedUserId = e.target.value;
        const selectedUser = allUserData.find(user => user._id === selectedUserId);
        setFormData({
            ...formData,
            toName: selectedUser.name,
            to: selectedUserId,
            from: userDetails._id,
            fromName: userDetails.name
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/transfer', formData);  // Replace with your API endpoint
            toast.success('Transfer successful');
            navigate('/');
        } catch (error) {
            toast.error('There was an error making the transfer');
        }
    };

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Header />
            <Stack direction={"row"} spacing={2} justifyContent={"center"} margin={10}>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 4,
                            p: 3,
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: 3,
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Transfer Money
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        fullWidth
                                        variant="outlined"
                                        value={userDetails.name}
                                        disabled
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">To Account</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.toName}
                                            label="name"
                                            onChange={handleSelectChange}
                                        >
                                            {allUserData.map((user, ui) => (
                                                <MenuItem key={ui} value={user._id}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="amount"
                                        label="Amount"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Stack>
        </Box>
    )
}
