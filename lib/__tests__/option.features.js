"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _path = require("path");

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _ = require("..");

var _2 = _interopRequireDefault(_);

var _toSlugCase = require("to-slug-case");

var _toSlugCase2 = _interopRequireDefault(_toSlugCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testFeature = function testFeature(t, feature, source, input, expected, slug) {
  var options = { features: {} };

  var browsers = _utils2.default.readFixtureBrowsers((0, _path.join)("features", slug));

  if (browsers) {
    options.browsers = browsers;
  }

  // disable all features
  Object.keys(_.features).forEach(function (key) {
    options.features[key] = false;
  });

  var css = (0, _2.default)(options).process(input).css;
  t.notEqual(css, expected, "should not add " + feature + " support if disabled");
  t.equal(css, input, "should not modify input if  " + feature + " is disabled");

  // enable only the one we want to test...
  options.features[feature] = true;

  var actual = (0, _2.default)(options).process(input).css.trim();
  _utils2.default.write(_utils2.default.fixturePath((0, _path.join)("features", slug + ".actual")), actual);

  t.equal(actual, expected.trim(), "should add " + feature + " support");
};

/**
 * Features tests
 */
/**
 * Test dependencies
 */


Object.keys(_.features).forEach(function (name) {
  var slug = (0, _toSlugCase2.default)(name);
  var source = _utils2.default.fixturePath((0, _path.join)("features", slug));
  var input = _utils2.default.readFixture((0, _path.join)("features", slug));
  var expected = _utils2.default.readFixture((0, _path.join)("features", slug + ".expected"));

  (0, _tape2.default)(slug, function (t) {
    testFeature(t, name, source, input, expected, slug);

    t.end();
  });
});