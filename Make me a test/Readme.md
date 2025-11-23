# Make me a test

In an effort to keep up with test creation for the FreeCodeCamp daily
challenges, I tried to build a script to make tests for me. The rationale
was the following.

`Writing tests multiple times sure does stink. Maybe I can automate it`

While at the moment this script only supports the Mocha framework, I
plan to update it to support the PyUnit test framework and others
that I will eventually integrate like XUnit.

The test format I made employed the following strategy.

1) Every test case must be on a new line
2) The solution and the function call are separated by the following `->`
3) The function call goes to the left of the `->`
4) The result goes on the right of the `->` 

While simplistic, it works for my case. If at any point the FreeCodeCamp Daily
Challenges get more complicated, this script will use a different test format.