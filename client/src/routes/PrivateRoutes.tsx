import { useState, useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import { PATHS } from 'shared/constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { setUser } from 'actions/user.action';
import { getUserRequest } from 'service/user.service';

interface PrivateRoutesProps extends RouteComponentProps {
  children: ReactElement | [ReactElement];
}

const PrivateRoutes = ({ children, history }: PrivateRoutesProps) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await getUserRequest();

      const { _id, username, role, deposit } = get(response, 'data');
      const user = { _id, username, role, deposit };

      dispatch(setUser(user));
      setLoading(false);
    } catch (e: any) {
      history.push(PATHS.SIGNIN);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default withRouter(PrivateRoutes);
