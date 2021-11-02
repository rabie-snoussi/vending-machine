import { useEffect, ReactChild } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PATHS } from 'shared/constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { getUser } from 'actions/user.action';
import { Navigation } from 'components';
import { User } from 'shared/interfaces';

interface PrivateRoutesProps extends RouteComponentProps {
  children: ReactChild | ReactChild[];
  fetchUser: Function;
  user: User | false;
}

const PrivateRoutes = ({
  children,
  history,
  fetchUser,
  user,
}: PrivateRoutesProps) => {
  useEffect(() => {
    fetchUser();
  }, []);

  if (user === false) history.push(PATHS.SIGNIN);

  if (isEmpty(user)) return <div>Loading...</div>;

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUser: () => dispatch(getUser()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes),
);
