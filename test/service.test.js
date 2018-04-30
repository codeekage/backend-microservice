'use strict';

//Require the dev-dependencies
let chai = require('chai');
let patch = require("../model/patch");
let chaiHttp = require('chai-http');
let app = require('../app');
let jsonPatch = require('jsonpatch');
let should = chai.should();

chai.use(chaiHttp);

let testContact = {
    tel: 4567890,
    name: "Nazas",
    email: "ag"
}

describe('Contacts', () => {

    /**
     * Test the /GET route
     */
    describe('/GET contacts', () => {
        it('it should GET all the contact', (done) => {
            chai.request(app)
                .get('/contacts')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQ1NTEwNzB9.wMRKlgCsJqhQjlyEkLN0ELxheRuuGoFpdwl-AV4Fh7c')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done();
                });
        });
    });

    /*
 * Test the /POST route
 */
    describe('/POST contacts', () => {
        it('it should POST a new contacts', (done) => {
            chai.request(app)
                .post('/contacts')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQ1NTEwNzB9.wMRKlgCsJqhQjlyEkLN0ELxheRuuGoFpdwl-AV4Fh7c')
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    })

    /*
 * Test the /PUT/:index route
 */
    describe('/PUT/:index contacts', () => {
        it('it should Update existing contact at index 1', (done) => {
            chai.request(app)
                .put('/contacts/1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQ1NTEwNzB9.wMRKlgCsJqhQjlyEkLN0ELxheRuuGoFpdwl-AV4Fh7c')
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /*
 * Test the /DELETE/:index route
 */

    describe('/DELETE/:index contacts', () => {
        it('it should DELETE existing contact at index 1', (done) => {
            chai.request(app)
                .put('/contacts/1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQ1NTEwNzB9.wMRKlgCsJqhQjlyEkLN0ELxheRuuGoFpdwl-AV4Fh7c')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});