var assert = require('assert');
var download = require('..');
var read = require('fs-readdir-recursive');
var rm = require('rimraf').sync;

describe('download-git-repo', function() {
  this.timeout(5000);
  var filter = function(x) {
    return x[0] !== '.' || x === ".git";
  };

  beforeEach(function() {
    rm('test/tmp');
  });

  describe('via github', function() {
    it('downloads the master branch by default', function(done) {
      download('github:zeke/download-github-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('download branches too', function(done) {
      download('github:zeke/download-github-repo-fixture#my-branch', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('downloads from github by default', function(done) {
      download('zeke/download-github-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('clones the master branch by default', function(done) {
      download('github:zeke/download-github-repo-fixture', 'test/tmp', { clone: true }, function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('clones branches too', function(done) {
      download('github:zeke/download-github-repo-fixture#my-branch', 'test/tmp', { clone: true }, function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });
  });

  describe('via bitbucket', function() {
    it('downloads the master branch by default', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('download branches too', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture#my-branch', 'test/tmp', function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('clones the master branch by default', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture', 'test/tmp', { clone: true }, function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/master');
        assert.deepEqual(actual, expected);
        done();
      });
    });

    it('clones branches too', function(done) {
      download('bitbucket:flipxfx/download-bitbucket-repo-fixture#my-branch', 'test/tmp', { clone: true }, function(err) {
        if (err) return done(err);
        var actual = read('test/tmp', filter);
        var expected = read('test/fixtures/my-branch');
        assert.deepEqual(actual, expected);
        done();
      });
    });
  });
});
