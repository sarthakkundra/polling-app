const request = require('supertest')
const poll = require("../routes/poll")
const express = require("express");


describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(poll)
      .get('/showPolls')
    expect(res.statusCode).toEqual(200)
    
  })
})
