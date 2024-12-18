"use strict";
import * as fs from 'node:fs';

const data = fs.readFileSync('input10.txt', 'utf8');
let lines = data.split('\n').filter((l) => l.length > 5);

let i, j, cnt: Number = 0;
for (i = 0; i < lines.length; i++)
{
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] == '0')
		{
			let tops: Array = [];
			find_path(i, j, tops, 1);
			cnt += tops.length;
		}
	}
}

function find_path(pos_x: Number, pos_y: Number, nines: Array, to_find: Number): Number
{
	if (lines[pos_x][pos_y] == '9' && to_find == 10)
	{
		add_to_set(nines, [pos_x, pos_y]);
		return 1;
	}
	let ret: Number = 0;
	if (pos_x > 0 && lines[pos_x - 1][pos_y] == String(to_find))
	{
		ret += find_path(pos_x - 1, pos_y, nines, to_find + 1);
	}
	if (pos_y > 0 && lines[pos_x][pos_y - 1] == String(to_find))
	{
		ret += find_path(pos_x, pos_y - 1, nines, to_find + 1);
	}
	if (pos_x < lines.length - 1 && lines[pos_x + 1][pos_y] == String(to_find))
	{
		ret += find_path(pos_x + 1, pos_y, nines, to_find + 1);
	}
	if (pos_y < lines[0].length - 1 && lines[pos_x][pos_y + 1] == String(to_find))
	{
		ret += find_path(pos_x, pos_y + 1, nines, to_find + 1);
	}
	return ret;
}

function add_to_set(s: Array, e: Array): boolean
{
	if (e[0] < 0 || e[0] >= lines.length || e[1] < 0 || e[1] >= lines[0].length)
	{
		return false;
	}
	if (! s.find((v) => v[0] == e[0] && v[1] == e[1]))
	{
		s.push(e);
	}
	return true;
}

console.log(cnt);
