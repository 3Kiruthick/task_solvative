import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        "_id": "665ac6158e23cd4d625db502",
        "name": "vimal",
        "p5": 100,
        "reward": 0,
        "date": "2024-06-01T06:56:21.640Z",
        "__v": 0
    },
    {
        "_id": "665acc46f662ecbc72a7d782",
        "name": "nivesh",
        "p5": 100,
        "reward": 0,
        "date": "2024-06-01T07:22:46.068Z",
        "__v": 0
    }
];

export default function UserList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/listallusers')
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


    return (
        <Fragment>
            <Box>
                <Typography variant='h4'>UserList</Typography>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>P5</th>
                            <th>Reward</th>
                            <th>Date</th>
                            <th>Transfer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} >
                                <td>{item.name}</td>
                                <td>{item.p5}</td>
                                <td>{item.reward}</td>
                                <td>{item.date}</td>
                                <td onClick={() => navigate(`/${item._id}`, { state: { singleUser: item, allUser: data } })}><AccountBalanceWalletIcon sx={{ cursor: 'pointer' }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Fragment>
    )
}
