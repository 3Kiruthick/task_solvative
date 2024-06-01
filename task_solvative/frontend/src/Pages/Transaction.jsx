import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../Components'
import axios from 'axios';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Transaction() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/rewardhistory')
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const revertTransaction = async (id) => {
        try {
            const response = await axios.post('http://localhost:5000/revertTransaction', { id });  // Replace with your API endpoint
            toast.success('Transaction Reverted');
            navigate('/')
        } catch (error) {
            toast.error('Transaction Revertion Failed');
        }
    }

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Header />
            <Stack direction={"row"} spacing={2} justifyContent={"center"} margin={10}>
                <Box>
                    <Typography variant='h4'>Transaction List</Typography>
                    <table>
                        <thead>
                            <tr>
                                <th>From Name</th>
                                <th>To Name</th>
                                <th>Reward</th>
                                <th>Date</th>
                                <th>Revert</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fromName}</td>
                                    <td>{item.toName}</td>
                                    <td>{item.reward}</td>
                                    <td>{item.date}</td>
                                    <td onClick={() => revertTransaction(item._id)}><ReplyAllIcon sx={{ cursor: 'pointer' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Stack>
        </Box>
    )
}
