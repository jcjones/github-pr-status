// Copyright 2015 ISRG.  All rights reserved
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// Posts a comment to Github on a PR.
//
// Example usage:
// echo "hi" | node github-pr-comment.js -f ./github-secret.json -u jcjones \
//   -r travis_commenter -i "0e296b7443b91d125f5b51e2d81663bcae667864"
//
"use strict";

var Client = require("github");
var stdio = require('stdio');

var ops = stdio.getopt({
    'user': {key: 'u', args: 1, description: 'User segment of Github repo name', mandatory: true},
    'repo': {key: 'r', args: 1, description: 'Github repo name', mandatory: true},
    'sha': {key: 'i', args: 1, description: 'commit ID', mandatory: true},
    'position': {key: 'l', args: 1, description: 'line number', mandatory: true},
    'path': {key: 'p', args: 1, description: 'file to comment on'},
    'pr': {key: 'n', args: 1, description: 'PR ID'},
    'authfile': {key: 'f', args: 1, description: 'authentication file', mandatory: true},
    'debug': {key: 'D', description: 'enable debugging output'},
});

var github = new Client({
    debug: ops.debug,
    version: "3.0.0"
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

  if (ops.debug) {
    console.log("Result: " + res)
  }
}


function showDetails(err, res) {
  if (err != null) {
    console.log("Error: " + err);
    return;
  }

  if (ops.debug) {
    res.forEach(function (data){
      console.log(data);
    });
  }
}

if (ops.debug) {
  console.log("Configuration: " + ops);
}

stdio.read(function(text){
  var data = {};
  data["number"] = ops.pr;
  data["user"] = ops.user;
  data["repo"] = ops.repo;
  data["commit_id"] = ops.sha;
  data["position"] = ops.position;
  data["path"] = ops.path;
  data["body"] = text

  github.pullRequests.createComment(data, showResult);
});




