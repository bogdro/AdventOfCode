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
		let operations = [];
		let i;
		for (i = 0; i < numbers.length - 1; i++)
		{
			operations[i] = 0;
		}
		while (true)
		{
			let j, total = numbers[0];
			for (j = 1; j < numbers.length; j++)
			{
				if (operations[j] == 0)
				{
					total *= numbers[j];
				}
				else if (operations[j] == 1)
				{
					total += numbers[j];
				}
				else
				{
					total = Number(String(total) + String(numbers[j]));
				}
			}
			if (total == test)
			{
				result += test;
				break;
			}
			i = numbers.length - 1;
			while (i >= 0)
			{
				if (operations[i] == 0)
				{
					operations[i] = 1;
					break;
				}
				else if (operations[i] == 1)
				{
					operations[i] = 2;
					break;
				}
				else
				{
					operations[i] = 0;
					i--;
				}
			}
			if (i < 0)
			{
				break;
			}
		}
	}
}

console.log(result);
