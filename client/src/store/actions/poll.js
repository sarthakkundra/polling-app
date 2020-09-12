import { SET_POLLS, SET_CURRENT_POLL } from "../types";
import { addError, removeError } from "./error";
import api from "../../services/api";


import axios from 'axios';

export const setPolls = (polls) => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = (poll) => ({
  type: SET_CURRENT_POLL,
  poll,
});

export const getPolls = () => {
  return async (dispatch) => {
    try {
      const polls = await axios.get('poll/showPolls')

      dispatch(setPolls(polls.data.polls));
      dispatch(removeError());
    } catch (e) {
      console.log(e)
      const {error} = e.response.data;
      dispatch(addError(error));
    }
  };
};

export const getUserPolls = () => {
  return async (dispatch) => {
    try {
      const polls = await api("get", "/poll/userPolls");
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (e) {
      const error = e.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createPoll = (data) => {
  return async (dispatch) => {
    try {
      const poll = await api("'post", "/poll/createPoll", data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (e) {
      const error = e.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentPoll = (path) => {
  return async (dispatch) => {
    try {
      const poll = await axios.get(`poll/${path}`);
      dispatch(setCurrentPoll(poll.data));
      dispatch(removeError());
    } catch (e) {
      const error = e.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const vote = (path, data) => {
  return async (dispatch) => {
    try {
      const poll = api("post", `/poll/${path}`, data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (e) {
      const error = e.response.data;
      dispatch(addError(error.message));
    }
  };
};
