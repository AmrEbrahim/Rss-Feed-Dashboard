import Feeds from "../apis/Feeds";
import history from "../history";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
let Parser = require("rss-parser");
let parser = new Parser();

export const fetchRss = url => async dispatch => {
  const response = await parser.parseURL(CORS_PROXY + url);
  dispatch({ type: "GET_RSS", payload: response.items });
};

export const createFeed = formValue => async dispatch => {
  const response = await Feeds.post("/feeds", { ...formValue });
  dispatch({ type: "CREATE_FEED", payload: response.data });
};

export const fetchFeeds = () => async dispatch => {
  const response = await Feeds.get("feeds");
  dispatch({ type: "FETCH_FEEDS", payload: response.data });
};

export const fetchFeed = id => async dispatch => {
  const response = await Feeds.get(`feeds/${id}`);
  dispatch({ type: "FETCH_FEED", payload: response.data });
};

export const deleteFeed = id => async dispatch => {
  await Feeds.delete(`/feeds/${id}`);

  dispatch({ type: "DELETE_FEED", payload: id });
  history.push("/");
};
