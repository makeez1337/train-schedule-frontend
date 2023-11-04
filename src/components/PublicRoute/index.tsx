import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAuthorized: boolean;
}

const PrivateRoute = ({ isAuthorized }: Props) => {
  return !isAuthorized ? <Outlet /> : <Navigate to="train-schedule" />;
};

export default PrivateRoute;
