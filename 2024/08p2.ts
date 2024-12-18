"use strict";
import * as fs from 'node:fs';

const data = fs.readFileSync('input08.txt', 'utf8');
let lines = data.split('\n').filter((l) => l.length > 5);
let fields = [];
let antennas = new Map();

let i, j, antinodes = [];
for (i = 0; i < lines.length; i++)
{
	fields[i] = lines[i].split('');
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] != '.')
		{
			let v = antennas.get(lines[i][j]);
			v ??= [];
			v.push([i, j]);
			antennas.set(lines[i][j], v);
		}
	}
}
let a, pos;
for ([a, pos] of antennas)
{
	let i, j;
	for (i = 0; i < pos.length; i++)
	{
		for (j = i + 1; j < pos.length; j++)
		{
			add_pos(pos[i], pos[j]);
		}
	}
}

function add_pos(p1: Array, p2: Array)
{
	let diff_x = Math.abs(p2[0] - p1[0]), diff_y = Math.abs(p2[1] - p1[1]);
	let e1 = [p1[0], p1[1]], e2 = [p2[0], p2[1]];
	if (p1[0] < p2[0] && p1[1] < p2[1])
	{
		while (add_to_set([e1[0], e1[1]]))
		{
			e1[0] -= diff_x;
			e1[1] -= diff_y;
		}
		while (add_to_set([e2[0], e2[1]]))
		{
			e2[0] += diff_x;
			e2[1] += diff_y;
		}
	}
	else if (p1[0] < p2[0] && p1[1] > p2[1])
	{
		while (add_to_set([e1[0], e1[1]]))
		{
			e1[0] -= diff_x;
			e1[1] += diff_y;
		}
		while (add_to_set([e2[0], e2[1]]))
		{
			e2[0] += diff_x;
			e2[1] -= diff_y;
		}
	}
	else if (p1[0] > p2[0] && p1[1] > p2[1])
	{
		while (add_to_set([e1[0], e1[1]]))
		{
			e1[0] += diff_x;
			e1[1] += diff_y;
		}
		while (add_to_set([e2[0], e2[1]]))
		{
			e2[0] -= diff_x;
			e2[1] -= diff_y;
		}
	}
	else if (p1[0] > p2[0] && p1[1] < p2[1])
	{
		while (add_to_set([e1[0], e1[1]]))
		{
			e1[0] += diff_x;
			e1[1] -= diff_y;
		}
		while (add_to_set([e2[0], e2[1]]))
		{
			e2[0] -= diff_x;
			e2[1] += diff_y;
		}
	}
}

function add_to_set(e: Array): boolean
{
	if (e[0] < 0 || e[0] >= lines.length || e[1] < 0 || e[1] >= lines[0].length)
	{
		return false;
	}
	if (! antinodes.find((v) => v[0] == e[0] && v[1] == e[1]))
	{
		antinodes.push(e);
	}
	return true;
}

console.log(antinodes.length);
