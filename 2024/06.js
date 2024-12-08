"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input06.txt', 'utf8');
let lines = data.split('\n');
let fields = [];

let i, j, cnt = 0, pos_x, pos_y, guard = '^';
for (i = 0; i < lines.length; i++)
{
	fields[i] = lines[i].split('');
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] == guard)
		{
			pos_x = i;
			pos_y = j;
		}
	}
}
while (pos_x >= 0 && pos_x < lines.length
	&& pos_y >= 0 && pos_y < lines[0].length)
{
	if (fields[pos_x][pos_y] != 'X')
	{
		fields[pos_x][pos_y] = 'X';
		cnt++;
	}
	if (guard == '^')
	{
		if (pos_x == 0 || lines[pos_x - 1][pos_y] != '#')
		{
			pos_x--;
		}
		else
		{
			guard = '>';
		}
	}
	else if (guard == '>')
	{
		if (pos_y == lines[0].length || lines[pos_x][pos_y + 1] != '#')
		{
			pos_y++;
		}
		else
		{
			guard = 'v';
		}
	}
	else if (guard == 'v')
	{
		if (pos_x == lines.length || lines[pos_x + 1][pos_y] != '#')
		{
			pos_x++;
		}
		else
		{
			guard = '<';
		}
	}
	else
	{
		if (pos_y == 0 || lines[pos_x][pos_y - 1] != '#')
		{
			pos_y--;
		}
		else
		{
			guard = '^';
		}
	}
}

console.log(cnt);
