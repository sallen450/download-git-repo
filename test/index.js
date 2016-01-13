var assert = require('assert');
var download = require('..');
var read = require('fs-readdir-recursive');
var rm = require('rimraf').sync;

describe('download-git-repo', function() {
  beforeEach(function() {
    rm('test/tmp');
  });

  describe('downloads via github', function() {
    it('downloads the master branch by default', function(done) {
      download('github:zeke/download-github-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('download branches too', function(done) {
      download('github:zeke/download-github-repo-fixture#my-branch', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });
  });

  describe('downloads via bitbucket', function() {
    it('downloads the master branch by default', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('download branches too', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture#my-branch', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });
  });

  describe('downloads via github by default', function() {
    it('downloads the master branch by default', function(done) {
      download('zeke/download-github-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('download branches too', function(done) {
      download('zeke/download-github-repo-fixture#my-branch', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp');
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });
  });
});
