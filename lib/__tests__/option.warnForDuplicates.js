"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _ = require("..");

var _2 = _interopRequireDefault(_);

var _warnForDuplicates = require("../warn-for-duplicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportFail = function reportFail(t) {
  return function (error) {
    console.log(error);
    t.fail();
  };
};

(0, _tape2.default)("cssnext warnForDuplicates option", function (t) {
  var messages = [];
  _warnForDuplicates.spotted.length = 0; // reset spotted plugins
  var instance = (0, _postcss2.default)([(0, _2.default)({
    console: { log: function log(msg) {
        return messages.push(msg);
      } }
  })]);

  instance.process("body{}").then(function () {
    t.equal(messages.length, 0, "should not add warning if no duplicate");
    t.end();
  }, reportFail(t));
});

(0, _tape2.default)("cssnext warnForDuplicates option", function (t) {
  var messages = [];
  _warnForDuplicates.spotted.length = 0; // reset spotted plugins
  var instance = (0, _postcss2.default)([(0, _autoprefixer2.default)(), (0, _2.default)({
    console: { log: function log(msg) {
        return messages.push(msg);
      } }
  })]);

  instance.process("body{}").then(function () {
    t.ok(messages[0].indexOf("Warning: postcss-cssnext found a duplicate plugin") > -1, "should add warning if there are duplicates before");
    t.end();
  }, reportFail(t));
});

(0, _tape2.default)("cssnext warnForDuplicates option", function (t) {
  var messages = [];
  _warnForDuplicates.spotted.length = 0; // reset spotted plugins
  var instance = (0, _postcss2.default)([(0, _autoprefixer2.default)(), (0, _2.default)({
    warnForDuplicates: false,
    console: { log: function log(msg) {
        return messages.push(msg);
      } }
  })]);

  instance.process("body{}").then(function () {
    t.equal(messages.length, 0, "should NOT add warning if there are duplicates but !warnForDuplicates");
    t.end();
  }, reportFail(t));
});

(0, _tape2.default)("cssnext warnForDuplicates option", function (t) {
  var messages = [];
  _warnForDuplicates.spotted.length = 0; // reset spotted plugins
  var instance = (0, _postcss2.default)([(0, _2.default)({
    console: { log: function log(msg) {
        return messages.push(msg);
      } }
  }), (0, _autoprefixer2.default)()]);

  instance.process("body{}").then(function () {
    t.ok(messages.length && messages[0].indexOf("Warning: postcss-cssnext found a duplicate plugin") > -1, "should add warning if there are duplicates after");
    t.end();
  }, reportFail(t));
});