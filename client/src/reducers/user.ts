import { SET_USER, RESET_USER } from 'shared/constants';
import { UserInterface } from 'shared/interfaces';

const INITIAL_STATE = undefined;

interface Action {
  type: string;
  payload?: UserInterface;
}

export default (state = false, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case RESET_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
