import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeed, deleteFeed } from "../actions";
import ShowModal from "./modal";
import history from "../history";

class FeedDelete extends Component {
  componentDidMount() {
    this.props.fetchFeed(this.props.match.params.id);
  }
  renderContent = () => {
    if (!this.props.feeds) {
      return "Are you sure you want to delete this feed?";
    }
    return `Are you sure you want to delete this feed with Name: ${this.props.feeds.Name}`;
  };
  actions = (
    <React.Fragment>
      <button
        onClick={() => this.props.deleteFeed(this.props.match.params.id)}
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
      <Link
        to={`/rss/${this.props.match.params.id}`}
        type="button"
        className="btn btn-secondary"
      >
        Cancel
      </Link>
    </React.Fragment>
  );
  render() {
    return (
      <ShowModal
        title="Delete Feed"
        content={this.renderContent()}
        actions={this.actions}
        Dismiss={() => history.push(`/rss/${this.props.match.params.id}`)}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { feeds: state.feeds[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchFeed, deleteFeed })(FeedDelete);
