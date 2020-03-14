import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFeeds } from "../actions";

class Sidebar extends Component {
  componentDidMount() {
    console.log("sidebar");
    this.props.fetchFeeds();
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.feeds === this.props.feeds) {
  //     this.props.fetchFeeds();
  //   }
  // }
  handleClick = SelectedDiv => {
    if (SelectedDiv.tagName.toLowerCase() === "a") {
      document.querySelectorAll(".bg-darkBlue").forEach(div => {
        div.classList.add("bg-babyBlue");
        div.classList.remove("bg-darkBlue");
      });
      SelectedDiv.parentElement.classList.add("bg-darkBlue");
      SelectedDiv.parentElement.classList.remove("bg-babyBlue");
    }
  };
  render() {
    return (
      <div className="flex-column col-xl-3 col-md-3 col-sm-12 bg-darkBlueContainer p-0 d-flex">
        <div
          className="collapse show navbar-collapse flex-column"
          id="navbarNav"
        >
          <div className="d-flex flex-column justify-content-center align-items-center h-25 px-1">
            <Link to={"/"}>
              <p className="text-white font-weight-bold h2">MY FEED</p>
            </Link>
          </div>
          <div className="navbar-nav flex-column">
            {console.log(this.props.feeds)}
            {this.props.feeds.map(feed => (
              <div
                className="d-flex justify-content-between align-items-center bg-babyBlue mt-1 px-2"
                key={feed.id}
              >
                <Link
                  onClick={e => this.handleClick(e.currentTarget)}
                  to={`/rss/${feed.id}`}
                  className="btn text-light text-left"
                >
                  {feed.Name}
                </Link>
                <div className="d-flex align-items-center">
                  <Link
                    onClick={e =>
                      this.handleClick(
                        e.currentTarget.parentElement.parentElement
                      )
                    }
                    to={`/delete/${feed.id}`}
                  >
                    <i className="fa fa-times btn-sm btn-primary mr-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { feeds: Object.values(state.feeds) };
};
export default connect(mapStateToProps, { fetchFeeds })(Sidebar);
