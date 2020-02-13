import React, { Component } from "react";
import { fetchRss, fetchFeed } from "./../actions/index";
import { connect } from "react-redux";
import { Markup } from "interweave";

class RssContent extends Component {
  async componentDidMount() {
    console.log("content wait");
    await this.props.fetchFeed(this.props.match.params.id);
    console.log("content done");
    this.props.fetchRss(this.props.feeds.URL);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.rss === this.props.rss) {
      console.log("content update");
      this.props.fetchRss(this.props.feeds.URL);
    }
  }
  handleImage = image => {
    if (image === true) {
      return <img src={image} className="mr-3" alt="ALtImage" />;
    } else {
      return <img src="/small.png" className="mr-3 img-fluid" alt="ALtImage" />;
    }
  };
  render() {
    if (!this.props.rss) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        {this.props.rss.map(rss => (
          <div
            className="media border border-top-0"
            key={rss.guid || rss.id || rss.pubDate}
          >
            {this.handleImage(rss.image)}
            <div className="media-body">
              <h4 className="mt-0">{rss.title}</h4>
              <div className="container">
                <Markup content={rss.content} />
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    rss: state.fetch,
    feeds: state.feeds[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchRss, fetchFeed })(RssContent);
