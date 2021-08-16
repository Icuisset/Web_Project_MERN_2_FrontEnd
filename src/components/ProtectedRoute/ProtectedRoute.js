import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  
  const isAuthenticated = localStorage.getItem('jwt');

  return (
    <Route>
      {() =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: './', signin: true }} />
      }
    </Route>
  );
};

export default ProtectedRoute;
