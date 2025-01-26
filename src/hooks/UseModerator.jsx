import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';


const UseModerator = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: isModerator,isPending: isModeratorLoading} = useQuery({
        queryKey: ['moderator'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/moderator/${user.email}`);
            return res.data?.moderator;
        }
    })
    return [isModerator,isModeratorLoading]
};

export default UseModerator;