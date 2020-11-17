import { SUBMIT_FILTER } from "../actions/types";

const initialState = {
  filterText: "",
};

export default (action, state = initialState) => {
  switch (action.type) {
    case SUBMIT_FILTER:
      return {
        ...state,
        filterText: action.payload,
      };
    default:
      return state;
  }
};
