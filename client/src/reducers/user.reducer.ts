import { ACTIONS } from 'shared/constants';
import { User } from 'shared/interfaces';

interface Action {
  type: string;
  payload?: User | false;
}

export default (state = {}, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return action.payload;
    case ACTIONS.RESET_USER:
      return false;
    default:
      return state;
  }
};
