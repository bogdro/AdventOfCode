"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input01.txt', 'utf8');
const lines = data.split('\n');

let l, n1 = [], n2 = [];
for (l of lines)
{
	if (l.match(/\d/))
	{
		const numbers = l.split(/\s+/);
		n1.push(numbers[0]);
		n2.push(numbers[1]);
	}
}
n1.sort();
n2.sort();

let i, distance = 0;
for (i in n1)
{
	distance += Math.abs(n1[i] - n2[i]);
}

console.log(distance);
