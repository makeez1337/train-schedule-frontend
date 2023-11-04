import { Navigate, Outlet } from 'react-router-dom';

import { NavMenu } from '../NavMenu';

import '../../styles/PrivateRoute/private-route.scss';

interface Props {
  isAuthorized: boolean;
}

const PrivateRoute = ({ isAuthorized }: Props) => {
  return isAuthorized ? (
    <div className="wrapper">
      <NavMenu />
      <Outlet />
    </div>
  ) : (
    <Navigate to="sign-in" />
  );
};

export default PrivateRoute;
