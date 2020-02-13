export default (state = [], action) => {
  switch (action.type) {
    case "GET_RSS":
      return action.payload;
    default:
      return state;
  }
};
