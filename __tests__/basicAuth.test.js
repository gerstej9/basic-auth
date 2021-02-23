'use strict';

require('@code-fellows/supergoose');
const { response } = require('express');
const supertest = require ('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
const base64 = require('base-64');


describe('testing server for signup', () =>{
  it ('should create a user account', async () => {
    const response = await request.post('/signup').send({
      username: 'Steven',
      password: 'Frank'
    });
    expect(response.status).toEqual(201);
    expect(response.body.password).toBeDefined();
    expect(response.body.username).toEqual('Steven')
  });
});

describe('testing server for signup assertion requirement', () =>{
  it ('should throw error for missing username', async () => {
    const response = await request.post('/signup').send({
      username: '',
      password: 'Frank'
    });
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('Need username');
  });
});

describe('testing server for signup assertion requirement', () =>{
  it ('should throw error for missing password', async () => {
    const response = await request.post('/signup').send({
      username: 'John',
      password: ''
    });
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('Need password');
  });
});


describe('testing server for signin', () =>{
  it ('should sign in to a user account', async () => {
    await request.post('/signup').send({
      username: 'John',
      password: 'Frank'
    }).then(async (data) => {
        let encodedString = base64.encode(`${data.request._data.username}:${data.request._data.password}`)
        const response = await request.post('/signin').set(
          'Authorization', `Basic ${encodedString}`
        );
        expect(response.status).toEqual(200);
        expect(response.body.password).toBeDefined();
        expect(response.body.username).toEqual('John')
    });
  });
});

describe('testing middleware and requirement assertion', () =>{
  it ('Middleware basic Authentication ', async () => {

    const response = await request.post('/signin').set(
      'Authorization', ``
    );
    expect(response.status).toEqual(500);
    expect(response.text.includes('Invalid User Sign In')).toBeTruthy();
  });
});

// describe('testing middleware for functionality', () =>{
//   it ('should block invalid login', async () => {
//     const response = await request.post('/signup').send({
//       username: 'Steven',
//       password: 'Frank'
//     });
//     expect(response.status).toEqual(201);
//     expect(response.body.password).toBeDefined();
//     expect(response.body.username).toEqual('Steven')
//   });
// });

  
//   it ('should state an invalid sign in', async() =>{
//     const response = await request.post('/signin').send({
//       headers:{
//         authorization : ``
//         }
//     });
//   });
// })
