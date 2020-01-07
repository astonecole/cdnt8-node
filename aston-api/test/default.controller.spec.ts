import 'mocha';
import * as app from '../src/index';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from 'chai';

chai.use(chaiHttp);

describe('API endpoint', () => {
    it('GET / should return "Hello, World!"', () => {
        chai.request(app)
            .get('/')
            .end((err: any, res: any) => {
                expect(res).to.have.json;
                expect(res).to.have.status(200);
                expect(res.body).eql({ message: 'Hello, World!' });
            });
    });
});
