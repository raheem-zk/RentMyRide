import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to access URL parameters

function Unblock() {
    const { id } = useParams(); 
    console.log(id,'the user id ');
    const navigate = useNavigate();
    useEffect(() => {
        unblockUser();
    }, []); 

    const unblockUser = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/users/${id}/unblock`)
                .then((res) => {
                    console.log(res.data);
                    navigate(-1)
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

export default Unblock;
