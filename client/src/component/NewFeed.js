import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createFeed, fetchFeeds } from "../actions";

class NewFeed extends Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <p className="text-danger p-0 m-0">
          <small>{error}</small>
        </p>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" className="form-control" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };
  handleSubmit = async formValue => {
    await this.props.createFeed(formValue);
    document.querySelectorAll(".bg-darkBlue").forEach(div => {
      div.classList.add("bg-babyBlue");
      div.classList.remove("bg-darkBlue");
    });
  };
  render() {
    return (
      <div className="mt-5">
        <div className="bg-darkBlueContainer d-flex align-items-center p-1">
          <div className="py-2 pl-2">
            <i className="fa fa-plus text-white"></i>
          </div>
          <p className="text-white font-weight-bold py-2 pl-1 m-0">
            Add New Feed
          </p>
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
          className="bg-white p-4 border"
        >
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <Field
                name="Name"
                component={this.renderInput}
                label="Feed Name:"
              />
            </div>
            <div className="col-md-12 col-lg-5">
              <Field
                name="URL"
                component={this.renderInput}
                label="Feed URL:"
              />
            </div>
            <div className="col mt-1 d-flex align-items-end">
              <button className="btn btn-primary">Add Feed</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const validate = formValue => {
  const errors = {};
  if (!formValue.Name) {
    errors.Name = "Please enter Feed Name";
  }
  if (!formValue.URL) {
    errors.URL = "Please enter a URL";
  }
  return errors;
};

const mapStateToProps = state => {
  return { feeds: Object.values(state.feeds) };
};

const formWrapped = reduxForm({ form: "NewFeed", validate })(NewFeed);

export default connect(mapStateToProps, { createFeed, fetchFeeds })(
  formWrapped
);
