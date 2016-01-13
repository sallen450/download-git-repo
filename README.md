# download-git-repo

Download and extract a git repository (GitHub, Bitbucket) from node.  

## Installation

    $ npm install download-git-repo

## API

### download(repo, destination, callback)

Download a git `repo` to a `destination` folder and `callback`.

The following git host options for `repo` are supported:

- GitHub - `github:owner/name` or simply `owner/name`
- Bitbucket - `bitbucket:owner/name`

The `repo` option defaults to the `master` branch, but you can specify a branch or tag as a URL fragment like `owner/name#branch`.
Feel free to submit an issue or pull request for additional host options.

## Thanks

To [ianstormtaylor/download-github-repo](https://github.com/ianstormtaylor/download-github-repo) for the head start.

## License

MIT

