import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import config from './config';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { useAppSelector } from './hooks/reduxHooks';
import { ROUTES } from './constants/routes';
import { SignIn } from './pages/SignIn';
import { Train } from './pages/Train';
import { TrainSchedule } from './pages/TrainSchedule';
import { EditTrainSchedule } from './pages/EditTrainSchedule';
import { Station } from './pages/Station';

function App() {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  console.log(config);

  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicRoute isAuthorized={isAuthorized} />}>
          <Route path={ROUTES.sign_in} element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
          <Route path={ROUTES.train_schedule} element={<TrainSchedule />} />
          <Route
            path={`${ROUTES.train_schedule}/:id`}
            element={<EditTrainSchedule />}
          />
          <Route path={ROUTES.train} element={<Train />} />
          <Route path={ROUTES.station} element={<Station />} />
          <Route path="*" element={<Navigate to={ROUTES.sign_in} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
