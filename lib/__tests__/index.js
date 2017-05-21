"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("postcss-cssnext is a postcss plugin", function (t) {
  t.ok(typeof _2.default.process === "function", "should have the postcss process() function available");

  t.end();
});

(0, _tape2.default)("cssnext regression test", function (t) {
  var input = _utils2.default.readFixture("regression");
  var expected = _utils2.default.readFixture("regression.expected");
  var actual = (0, _2.default)({ browsers: "IE 6" }).process(input).css.trim();

  _utils2.default.write(_utils2.default.fixturePath("regression.actual"), actual);

  t.equal(actual, expected.trim(), "should pass the regression");

  t.end();
});