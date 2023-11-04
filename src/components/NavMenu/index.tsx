import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { ROUTES } from '../../constants/routes';

import '../../styles/NavMenu/nav-menu.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { signOutThunk } from '../../store/auth/thunk';

export const NavMenu = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      dispatch(signOutThunk(refreshToken));
    }
  };

  return (
    <div className="nav-menu">
      <h4 className="nav-menu__header">Navigation</h4>
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <Link to={ROUTES.train_schedule}>Train Schedule</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={ROUTES.train}>Train</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={ROUTES.station}>Station</Link>
        </li>
      </ul>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => signOut()}
        variant="contained"
      >
        Sign Out
      </Button>
    </div>
  );
};
