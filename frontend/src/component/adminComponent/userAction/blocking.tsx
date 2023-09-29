import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to access URL parameters

function Block() {
    const { id } = useParams(); 
    const navigate = useNavigate()
    useEffect(() => {
        blockUser();
    }, []); 

    const blockUser = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/users/${id}/block`)
                .then((res) => {
                    console.log(res.data);
                    navigate(-1);
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <></>
    );
}

export default Block;
