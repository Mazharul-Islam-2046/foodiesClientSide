import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import { AuthContext } from '../providers/AuthProvider/AuthContext.js'
const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='w-full h-[100vh] flex justify-center items-center'><span className="loading loading-infinity loading-lg"></span></div>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/signin"></Navigate>;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
    children: PropTypes.node
}