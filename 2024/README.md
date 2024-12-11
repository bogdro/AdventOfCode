# Advent of code 2024 #

## Languages ##

JavaScript and TypeScript.

## Why on ...? ##

Just to learn them more.

## Solutions ##

Naive and KISS. Result correct? Remove loggers, debugs, ship it, charge for it :)

## Why does it look like C? ##

I like C :)

## Random stuff about the chosen language ##

The only language mentioned here: <https://www.youtube.com/watch?v=Y9clBHENy4Q>

Run these in your browser to verify:

- `([] == ![])` -> true
- `'B' + 'a' + + 'a' + 'a'` -> BaNaNa
- `document.all instanceof Object` -> true, but `typeof document.all` -> "undefined", but `document.all === undefined` -> false
- `document.all === null` -> false, but `document.all == null` -> true (one `=` less)
- `new Date(2024, 1, 1)` -> `Date Thu Feb 01 2024 00:00:00` and `new Date([2024, 1, 1])` -> `Date Mon Jan 01 2024 00:00:00`
  and `new Date(2024, 1, 1, 2, 3, 4)` -> `Date Thu Feb 01 2024 02:03:04`, but `new Date([2024, 1, 1, 2, 3, 4])` -> Invalid Date
- `[99, 2, 100].sort()` -> `[ 100, 2, 99 ]`
