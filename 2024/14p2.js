"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input14.txt', 'utf8');
const lines = data.split('\n');

let l, all_pos = [], all_v = [], fields = [];
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
		all_pos.push(pos);
		all_v.push(v);
	}
}
let a, b, k;
for (a = 0; a < x_len; a++)
{
	fields.push([]);
	for (b = 0; b < y_len; b++)
	{
		fields[a][b] = 0;
	}
}
for (k in all_pos)
{
	let pos = all_pos[k];
	fields[pos[0]][pos[1]]++;
}

let i;
for (i = 0; /*i < 1000*/; i++)
{
	for (k in all_pos)
	{
		let pos = all_pos[k], v = all_v[k];
		fields[pos[0]][pos[1]]--;
		if (fields[pos[0]][pos[1]] < 0)
		{
			fields[pos[0]][pos[1]] = 0;
		}
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
		fields[pos[0]][pos[1]]++;
	}
	if (check_floor())
	{
		console.log(i + 1);
		break;
	}
}

function check_floor()
{
	let a, b, cnt = 0;
	for (b = 0; b < y_len; b++)
	{
		for (a = 0; a < x_len / 2; a++)
		{
			if (fields[a][b] > 0 && fields[a][y_len - 1 - b] > 0)
			{
				cnt++;
			}
		}
	}
	if (cnt < 100)
	{
		return false;
	}
	for (b = 0; b < x_len; b++)
	{
		console.log(fields[b].join(''));
	}
	return true;
}
