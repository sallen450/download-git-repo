var Download = require('download');
var gitclone = require('git-clone');
var rm = require('rimraf').sync;

/**
 * Expose `download`.
 */

module.exports = download;

/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Function} fn
 */

function download(repo, dest, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = null;
  }
  opts = opts || {};
  var clone = opts.clone || false;

  repo = normalize(repo);
  var url = getUrl(repo, clone);

  if (clone) {
    gitclone(url, dest, { checkout: repo.checkout }, function(err) {
      if (err === undefined) {
        rm(dest + "/.git");
        fn();
      }
      else {
        fn(err);
      }
    });
  }
  else {
    new Download({ mode: '666', extract: true, strip: 1 }).get(url).dest(dest).run(function(err, files) {
      err === null ? fn() : fn(err);
    });
  }
}

/**
 * Normalize a repo string.
 *
 * @param {String} string
 * @return {Object}
 */

function normalize(repo) {
  var type = 'github';
  if (repo.indexOf('github:') === 0) {
    type = 'github';
    repo = repo.substring(7);
  }
  else if (repo.indexOf('bitbucket:') === 0) {
    type = 'bitbucket';
    repo = repo.substring(10);
  }

  var owner = repo.split('/')[0];
  var name = repo.split('/')[1];
  var checkout = 'master';

  if (~name.indexOf('#')) {
    checkout = name.split('#')[1];
    name = name.split('#')[0];
  }

  return {
    type: type,
    owner: owner,
    name: name,
    checkout: checkout
  };
}

/**
 * Return a zip or git url for a given `repo`.
 *
 * @param {Object} repo
 * @return {String}
 */

function getUrl(repo, clone) {
  var url;

  if (repo.type === 'github')
    url = github(repo, clone);
  else if (repo.type === 'bitbucket')
    url = bitbucket(repo, clone);
  else
    url = github(repo, clone);

  return url;
}

/**
 * Return a GitHub url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

function github(repo, clone) {
  var url;

  if (clone)
    url = 'git@github.com:' + repo.owner + '/' + repo.name + '.git';
  else
    url = 'https://github.com/' + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip';

  return url;
}

/**
 * Return a Bitbucket url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

function bitbucket(repo, clone) {
  var url;

  if (clone)
    url = 'git@bitbucket.org:' + repo.owner + '/' + repo.name + '.git';
  else
    url = 'https://bitbucket.org/' + repo.owner + '/' + repo.name + '/get/' + repo.checkout + '.zip';

  return url;
}
