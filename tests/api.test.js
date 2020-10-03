const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");

const router = new express.Router();

const secret = process.env.JWT_SECRET;



describe("testing-Api", () => {
    it("Register User", async () => {
      let stateObj = {
          username:"aaa",
          password:"aaa"
        };
      const { body } = await request("http://localhost:3000").post("/users/register").send(stateObj);
      expect(200)
      expect(body.user.username).toEqual("aaa");    
    });
  });

describe("testing-Api", () => {
    it("Login User", async () => {
      let stateObj = {
          username:"aaa",
          password:"aaa"
        };
      const { body } = await request("http://localhost:3000").post("/users/login").send(stateObj);
      expect(200)
      expect(body.user.username).toEqual("aaa");
      console.log(body.user._id);
      const url = `mongodb://127.0.0.1/polling`
      await mongoose.connect(url, { useNewUrlParser: true })
      await User.deleteMany()
      mongoose.connection.close()
    });
    
  });

 

