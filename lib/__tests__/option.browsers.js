"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("cssnext browsers option", function (t) {

  // no recent browser need pixrem
  var remInput = "body{font-size:2rem}";
  t.equal((0, _2.default)({ browsers: "last 1 version" }).process(remInput).css, remInput, "should not enable px fallback when all browsers support it");

  var customPropsInput = ":root{--foo:bar}baz{qux:var(--foo)}";
  var customPropsOutput = "baz{qux: bar}";

  // fx 30 doesn't handle custom prop
  t.equal((0, _2.default)({ browsers: "Firefox >= 30" }).process(customPropsInput).css, customPropsOutput, "should enable custom properties when browsers do not support it");

  // fx 31 handle custom prop
  t.equal((0, _2.default)({ browsers: "Firefox >= 31" }).process(customPropsInput).css, customPropsInput, "should NOT enable custom properties when browsers support it");

  // fx 31 support but not IE 8
  t.equal((0, _2.default)({ browsers: "Firefox >= 31, IE 8" }).process(customPropsInput).css, customPropsOutput, "should enable custom properties when at least one browsers do not " + "support it");

  t.end();
});

(0, _tape2.default)("cssnext browsers option propagation to autoprefixer", function (t) {
  var input = "body{transition: 1s}";
  var output = "body{-webkit-transition: 1s;transition: 1s}";

  // Safari 6 need -webkit prefix
  t.equal((0, _2.default)({ browsers: "Safari 6" }).process(input).css, output, "should propagate browsers option to autoprefixer");

  // Safari 6.1 do not need -webkit prefix
  t.equal((0, _2.default)({ browsers: "Safari 6.1" }).process(input).css, input, "should propagate browsers option to autoprefixer");

  t.end();
});

(0, _tape2.default)("cssnext browsers option propagation to pixrem", function (t) {
  var input = "body{font-size: 1rem}";
  var output = "body{font-size: 16px;font-size: 1rem}";

  // IE 8 needs rem fallback
  t.equal((0, _2.default)({ browsers: "ie 8" }).process(input).css, output, "should propagate browsers option to pixrem");

  // IE 9 doesn't need rem fallback on a simple font-size
  t.equal((0, _2.default)({ browsers: "ie 9" }).process(input).css, input, "should propagate browsers option to pixrem");

  // IE 9 needs rem on pseudo element
  var inputWeirdCase = input.replace("body", "body::before");
  var outputWeirdCase = output.replace("body", "body::before");
  t.equal((0, _2.default)({ browsers: "ie 9" }).process(inputWeirdCase).css, outputWeirdCase, "should propagate browsers option to pixrem");

  t.end();
});