# Github PR Status tools (nodeJS)

## Setting status

These are flags to give checkmarks / x's on a PR. They actually are logged
against a particular Commit ID.

For help about the particular status types, check out [Github v3 Statuses API](https://developer.github.com/v3/repos/statuses/#create-a-status)

```
node github-pr-status.js -f ./github-secret.json -u jcjones -r \
  travis_commenter -s failure -i "0e296b7443b91d125f5b51e2d81663bcae667864" \
  -c "node/happy"
```

## Appending PR comments

`github-pr-comment.js` posts the text from `stdin` to a comment on the provided
PR.

```
echo "hi" | node github-pr-comment.js -f ./github-secret.json -u jcjones \
  -r github-pr-status -n 1 -D
```