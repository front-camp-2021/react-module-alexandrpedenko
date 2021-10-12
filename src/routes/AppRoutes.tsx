import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { publicRoutes, RouteNames } from './routes';

export const AppRouter: FC = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Redirect to={RouteNames.CATEGORY} />
    </Switch>
  );
};
