"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input13.txt', 'utf8');
const lines = data.split('\n');

let l, cost = 0, a = null, b = null, prize = null;
const a_regex = /Button\s*A:\s*X\+(\d+)\s*,\s*Y\+(\d+)/;
const b_regex = /Button\s*B:\s*X\+(\d+)\s*,\s*Y\+(\d+)/;
const prize_regex = /Prize:\s*X\s*=\s*(\d+)\s*,\s*Y\s*=\s*(\d+)/;
for (l of lines)
{
	const a_match = l.match(a_regex);
	if (a_match)
	{
		a = [a_match[1], a_match[2]];
	}
	const b_match = l.match(b_regex);
	if (b_match)
	{
		b = [b_match[1], b_match[2]];
	}
	const prize_match = l.match(prize_regex);
	if (prize_match)
	{
		prize = [prize_match[1], prize_match[2]];
	}
	if (a && b && prize)
	{
		let i, curr_cost, min_cost = Number.POSITIVE_INFINITY;
		for (i = 0; i < prize[0] / a[0] + 1; i++)
		{
			let j;
			for (j = 0; j < prize[0] / b[0] + 1; j++)
			{
				if (i * a[0] + j * b[0] == prize[0] && i * a[1] + j * b[1] == prize[1])
				{
					curr_cost = 3 * i + j;
					if (curr_cost < min_cost)
					{
						min_cost = curr_cost;
					}
				}
			}
		}
		if (min_cost < Number.POSITIVE_INFINITY)
		{
			cost += min_cost;
		}
		a = null;
		b = null;
		prize = null;
	}
}

console.log(cost);
