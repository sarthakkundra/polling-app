const express = require("express");

const Poll = require("../models/poll");
const User = require("../models/user");

const auth = require("../middleware/auth");

const router = new express.Router();

//  Route to show all the polls
router.get("/showPolls", async (req, res) => {
  try {
    const polls = await Poll.find();

    res.status(200).json({ polls });
  } catch (e) {
    res.status(400).json({ message: "Sorry bad request" });
  }
});

//  Route to create a poll
router.post("/createPoll", auth, async (req, res) => {
  try {
    const { id } = req.decoded;

    const user = await User.findById(id);

    const { question, options } = req.body;

    // Create a poll object with the questions and options
    const poll = await Poll.create({
      question,
      user,
      options: options.map((option) => ({ option, votes: 0 })),
    });

    user.polls.push(poll._id);

    await user.save();

    res.status(201).json({ ...poll._doc, user });
  } catch (e) {
    res.status(400).json({ message: "Sorry that seems like a bad request" });
  }
});

//  Route to get all the polls of a user
router.get("/userPolls", auth, async (req, res) => {
  try {
    const { id } = req.decoded;

    const user = await User.findById(id).populate("polls");

    res.status(200).json(user.polls);
  } catch (e) {
    res.status(400).json({ message: "Sorry bad req" + e });
  }
});

//  Route to find a poll
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const polls = await Poll.findById(id).populate("user", ["username", "id"]);

    res.status(200).json(polls);
  } catch (e) {
    res.status(400).json({ message: "Sorry bad request" + e });
  }
});

//  Route to delete a poll
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;

    const poll = await Poll.findById(id);
    if (!poll) {
      throw new Error("No poll found");
    }
    //  Check if the owner of the poll is the person deleting the poll
    if (poll.user.toString() !== userId) {
      throw new Error("Unauthorized, request denied!");
    }

    await poll.remove();

    res.status(202).json(poll);
  } catch (e) {
    res.status(400).json({ message: "Sorry bad request" + e });
  }
});

//  Route to cast a vote
router.post("/:id", auth, async (req, res) => {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;
    const { answer } = req.body;

    if (answer) {
      const poll = await Poll.findById(pollId);
      if (!poll) throw new Error("No poll found");

      //  If anser is one of the options of the poll then add 1 to it's votes
      const vote = poll.options.map((option) => {
        if (option.option === answer) {
          return {
            option: option.option,
            _id: option.id,
            votes: option.votes + 1,
          };
        } else {
          return option;
        }
      });

      //  Check if the user has already voted on that question or not
      if (poll.voted.filter((user) => user.toString() === userId).length == 0) {
        poll.voted.push(userId);
        poll.options = vote;

        await poll.save();
        res.status(202).json(poll);
      } else {
        throw new Error("Sorry already voted");
      }
    } else {
      throw new Error("No answer provided");
    }
  } catch (e) {
    res.status(400).json({ message: `Sorry bad request ${e}` });
  }
});

module.exports = router;
