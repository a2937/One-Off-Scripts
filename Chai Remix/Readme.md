# Chai Remix

I preface this with the fact I love the [ChaiJS NPM package](https://www.npmjs.com/package/chai) but
sometimes I don't wanna install extra packages for testing when it's built in. Especially when that project
is my own.

But other times when I'm working with a group or community, and ChaiJS is the standard. The more specific the
assertion, the better being their preferance.

The built-in assertions with NodeJS aren't specific however and if the creators of `node:assert` don't want to make their library
bigger; that's fine.

The purpose of this code is to make it so that the code style swaps back and forth; from using specific ChaiJS style
assertions to `node:assert`. 

