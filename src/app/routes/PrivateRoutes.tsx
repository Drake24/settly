import { Routes, Route, Navigate } from 'react-router-dom';
import Clients from '../pages/client/Clients';
import Dashboard from '../pages/dashboard/Dashboard';

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path='/*' element={<Navigate to='/dashboard' />} />
        </Routes>
    )
}

export default PrivateRoutes;