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
		a = [Number(a_match[1]), Number(a_match[2])];
	}
	const b_match = l.match(b_regex);
	if (b_match)
	{
		b = [Number(b_match[1]), Number(b_match[2])];
	}
	const prize_match = l.match(prize_regex);
	if (prize_match)
	{
		prize = [Number(prize_match[1]) + 10000000000000, Number(prize_match[2]) + 10000000000000];
	}
	if (a && b && prize)
	{
		let d = a[0] * b[1] - a[1] * b[0];
		if (d != 0)
		{
			let na = prize[0] * b[1] - prize[1] * b[0];
			let nb = a[0] * prize[1] - a[1] * prize[0];
			let cnt_a = na / d;
			let cnt_b = nb / d;
			if (cnt_a >= 0 && cnt_b >= 0 && Number.isInteger(cnt_a) && Number.isInteger(cnt_b))
			{
				cost += 3 * cnt_a + cnt_b;
			}
		}
		a = null;
		b = null;
		prize = null;
	}
}

console.log(cost);
