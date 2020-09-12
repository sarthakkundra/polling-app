import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { getCurrentPoll, getPolls, getUserPolls } from "../../store/actions";

const Polls = ({ auth, polls, getPolls, getUserPolls, getCurrentPoll }) => {
  useEffect(() => {
    console.log("hey1");
    getPolls();
    console.log("hey2");
  }, []);
  const handleClick = (id) => {
    getCurrentPoll(id);
  };
  const poll = polls.map((poll) => (
    <li onClick={() => handleClick(poll._id)} key={poll._id}>
      {poll.question}
    </li>
  ));
  return (
    <Fragment>
      {auth.isAuthenticated && (
        <div>
          <button onClick ={getPolls}>All Polls</button>
          <button onClick ={getUserPolls}>My Polls</button>
        </div>
      )}
      <ul>{poll}</ul>
    </Fragment>
  );
};

export default connect((store) => ({ auth: store.auth, polls: store.polls }), {
  getPolls,
  getUserPolls,
  getCurrentPoll,
})(Polls);
