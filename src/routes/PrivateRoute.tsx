import React from "react";
import { Navigate, PathRouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

interface IOwnProps extends PathRouteProps {
  hasAnyAuthorities?: string[];
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
  hasAnyAuthorities = [],
  ...rest
}: IOwnProps) => {
  const { account, credentialHasBeenFetched } = useAppSelector(
    (state) => state.auth,
  );
  //   const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);
  const location = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${(rest as any).path}`,
    );
  }

  if (!credentialHasBeenFetched) {
    return <div></div>;
  }

  if (account) {
    // if (isAuthorized) {
    // return <ErrorBoundary>{children}</ErrorBoundary>;
    // }

    // return (
    //   <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white">
    //     <Result
    //       status="403"
    //       title="403"
    //       subTitle="Sorry, you are not authorized to access this page."
    //       extra={
    //         <Link to={"/login"}>
    //           <Button type="primary">Back Home</Button>
    //         </Link>
    //       }
    //     />
    //   </div>
    // );
    return children;
  }

  return (
    <Navigate
      to={{
        pathname: "/auth",
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );
};

export const hasAnyAuthority = (
  authorities: string[],
  hasAnyAuthorities: string[],
) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

/**
 * Checks authentication before showing the children and redirects to the
 * login page if the user is not authenticated.
 * If hasAnyAuthorities is provided the authorization status is also
 * checked and an error message is shown if the user is not authorized.
 */
export default PrivateRoute;
