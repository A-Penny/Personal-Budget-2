const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('./app');
const express = require('express');


//chai.use(chaiHttp);

const envRouter = require('./routes/envelopes');
const transRouter = require('./routes/transactions');

describe('GET/envelopes', () => {
   it('responds with json return a list of all envelopes', (done) => {
      request(app)
      .get('/envelopes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
   });
});

describe('GET/envelopes/:id', () => {
   it('responds with json containing a single envelope', (done) => {
      request(app)
      .get('/envelopes/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
   });
});

describe('GET/envelopes/:id', () => {
   it('responds with json envelope not found', (done) => {
      request(app)
      .get('/envelopes/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"envelope not found"')
      .end((err) => {
         if (err) return done(err);
         done();
      });
   });
});

describe('POST/envelopes', () => {
   let data = {"name":"dummy", "start_balance":"100", "current_balance":"100", "spent":"0"}
   it('responds with 200 created', function(done) {
      request(app)
      .post('/envelopes')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
         if (err) return done(err);
         done();
      }); 
   });
});

describe('POST/envelopes', () => {
   let data = {"name":null, "starting_balance":null, "current_balance":null, "spent":null}
   it('responds with 400 not created', function(done){
      request(app)
      .post('/envelopes')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('"envelope not created"')
      .end((err) => {
         if (err) return done(err);
         done();
      });
   });
});

describe('DELETE/envelopes/:id', () => {
   it('responds with json envelope envelope deleted', (done) => {
      request(app)
      .get('/envelopes/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
         if (err) return done(err);
         done();
      });
   });
});

describe('DELETE/envelopes/:id', () => {
   it('responds with json envelope not found', (done) => {
      request(app)
      .get('/envelopes/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"envelope not found"')
      .end((err) => {
         if (err) return done(err);
         done();
      });
   });
});