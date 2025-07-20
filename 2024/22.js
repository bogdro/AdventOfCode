"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input22.txt', 'utf8');
let lines = data.split('\n').filter((l) => l.length > 3);

let i, sum = 0;
for (i = 0; i < lines.length; i++)
{
	sum += calc_prn(Number(lines[i]));
}

function calc_prn(input)
{
	let j, n;
	for (j = 0; j < 2000; j++)
	{
		n = input << 6;
		input = mix_and_prune(input, n);
		n = Math.floor(input >> 5);
		input = mix_and_prune(input, n);
		n = input << 11;
		input = mix_and_prune(input, n);
	}
	return input;
}

function mix_and_prune(input, n)
{
	input = n ^ input;
	input &= 0xffffff;
	return input;
}

console.log(sum);
