import React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function RouteLink({ to, children, ...rest}) {
  return (
    <Link
      href="#"
      component= {
        React.forwardRef((props, ref) => {
          return <RouterLink to={to} ref={ref} {...props} {...rest}/>
        })
      }
    >
      {children}
    </Link>
  );
}

export default RouteLink;