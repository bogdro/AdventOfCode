"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input07.txt', 'utf8');
const lines = data.split('\n');

let l, result = 0, rules = new Map();
for (l of lines)
{
	if (l.match(/\d/))
	{
		const parts = l.split(':');
		const test = Number(parts[0]);
		const numbers = parts[1].split(/\s+/).filter((v) => v.length > 0).map((v) => Number(v));
		let i;
		for (i = 0; i < 1 << (numbers.length - 1); i++)
		{
			let j, total = numbers[0];
			for (j = 1; j < numbers.length; j++)
			{
				if (i & (1 << (j - 1)))
				{
					total *= numbers[j];
				}
				else
				{
					total += numbers[j];
				}
			}
			if (total == test)
			{
				result += test;
				break;
			}
		}
	}
}

console.log(result);
