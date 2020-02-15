import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "CREATE_FEED":
      return { ...state, [action.payload.id]: action.payload };
    case "FETCH_FEEDS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_FEED":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_FEED":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
