import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PATHS } from 'shared/constants';
import PrivateRoutes from './PrivateRoutes';

const Signin = lazy(() => import('pages/signin'));
const Signup = lazy(() => import('pages/signup'));
const Home = lazy(() => import('pages/home'));
const Error = lazy(() => import('pages/error'));

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Redirect from={PATHS.ROOT} exact to={PATHS.HOME} />
      <Route path={PATHS.SIGNIN} exact component={Signin} />
      <Route path={PATHS.ERROR} exact component={Error} />
      <Route path={PATHS.SIGNUP} exact component={Signup} />
      <PrivateRoutes>
        <Route path={PATHS.HOME} exact component={Home} />
      </PrivateRoutes>
    </Switch>
  </Suspense>
);

export default Routes;