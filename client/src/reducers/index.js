import { combineReducers } from "redux";
import fetchRss from "./fetchRss";
import fetchFeeds from "./feeds";
import { reducer } from "redux-form";

export default combineReducers({
  fetch: fetchRss,
  form: reducer,
  feeds: fetchFeeds
});
