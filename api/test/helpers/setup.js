"use strict"
const chai= require('chai')
const chaiAsPromise = require('chai-as-promised')
chai.use(chaiAsPromise);

global.AssertionError = chai.AssertionError
global.expect = chai.expect