import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';

const UseAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: isAdmin,isPending: isAdminLoading } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            return res.data?.admin;

        }
    })
    return [isAdmin, isAdminLoading]
};

export default UseAdmin;