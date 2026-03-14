import { useState } from 'react';
import { deactivateUser } from '../../api/userApi';

export default function useDeactivateUser(token, setUsers, setError) {
    const [deactivating, setDeactivating] = useState({});

    const handleDeactivate = async (userId) => {
        setDeactivating((prev) => ({ ...prev, [userId]: true }));
        setError && setError('');
        try {
            await deactivateUser({ userId, token });
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            setError && setError(err.message);
        }
        setDeactivating((prev) => ({ ...prev, [userId]: false }));
    };

    return { deactivating, handleDeactivate };
}
