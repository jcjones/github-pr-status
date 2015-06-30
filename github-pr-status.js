// Copyright 2015 ISRG.  All rights reserved
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// Posts a comment to Github on a PR.
//
// Example usage:
// node github-post-comments.js -f ./github-secret.json -u jcjones -r \
//   travis_commenter -s failure -i "0e296b7443b91d125f5b51e2d81663bcae667864" \
//   -c "node/happy"
//
"use strict";

var Client = require("github");

var github = new Client({
    debug: false,
    version: "3.0.0"
});

var stdio = require('stdio');
var ops = stdio.getopt({
    'user': {key: 'u', args: 1, description: 'User segment of Github repo name', mandatory: true},
    'repo': {key: 'r', args: 1, description: 'Github repo name', mandatory: true},
    'sha': {key: 'i', args: 1, description: 'commit ID', mandatory: true},
    'state': {key: 's', args: 1, description: 'pending, success, error, or failure', mandatory: true},
    'url': {key: 'l', args: 1, description: 'URL to link'},
    'context': {key: 'c', args: 1, description: 'Test context'},
    'description': {key: 'd', args: 1, description: 'detailed description'},
    'authfile': {key: 'f', args: 1, description: 'authentication file', mandatory: true},
});

var authfile = require(ops.authfile);
github.authenticate(authfile);

function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

function showResult(err, res){
  if (err != null) {
    console.log("Error: " + err);
    return;
  }

  console.log("Result: " + res)
}


function showDetails(err, res) {
  if (err != null) {
    console.log("Error: " + err);
    return;
  }

  res.forEach(function (data){
    console.log(data);
  });
}
console.log(ops);

var data = {};
data["context"] = ops.context;
data["user"] = ops.user;
data["repo"] = ops.repo;
data["sha"] = ops.sha;
data["state"] = ops.state;
data["target_url"] = ops.url;
data["description"] = ops.description;

# github.statuses.get(data, showDetails);
github.statuses.create(data, showResult);

