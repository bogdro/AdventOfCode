"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input14.txt', 'utf8');
const lines = data.split('\n');

let l, all_pos = [];
const robot_regex = /p\s*=\s*(-?\d+)\s*,\s*(-?\d+)\s*v\s*=\s*(-?\d+)\s*,\s*(-?\d+)/;
const x_len = 101;
const y_len = 103;
for (l of lines)
{
	const r_match = l.match(robot_regex);
	if (r_match)
	{
		let pos = [Number(r_match[1]), Number(r_match[2])];
		let v = [Number(r_match[3]), Number(r_match[4])]
		let i;
		for (i = 0; i < 100; i++)
		{
			pos[0] += v[0];
			if (pos[0] < 0)
			{
				pos[0] += x_len;
			}
			if (pos[0] >= x_len)
			{
				pos[0] -= x_len;
			}
			pos[1] += v[1];
			if (pos[1] < 0)
			{
				pos[1] += y_len;
			}
			if (pos[1] >= y_len)
			{
				pos[1] -= y_len;
			}
		}
		all_pos.push(pos);
	}
}

let factor = all_pos.filter((e) => e[0] < 50 && e[1] < 51).length
	* all_pos.filter((e) => e[0] > 50 && e[1] < 51).length
	* all_pos.filter((e) => e[0] < 50 && e[1] > 51).length
	* all_pos.filter((e) => e[0] > 50 && e[1] > 51).length

console.log(factor);
