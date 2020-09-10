import React from "react";
import { connect } from "react-redux";

const Error = ({ error }) => <div>{error && <div>{error.message}</div>}</div>;

export default connect((store) => ({ error: store.error }))(Error);
