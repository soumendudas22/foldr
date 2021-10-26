import { Route, Redirect } from 'react-router-dom';

export default function AuthenticatedRoute({ component: C, ...rest }) {
  let token = localStorage.getItem("token");
  const isAuthenticated = token !== undefined && token !== null;
  return (
    <Route {...rest} render={ props =>
        isAuthenticated
          ? <C {...props} />
          : <Redirect to={`/login`} />
        }
    />
  );
}