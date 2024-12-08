"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input06.txt', 'utf8');
let lines = data.split('\n');
let fields = [];

let i, j, cnt = 0, pos_x, pos_y, start_x, start_y, guard = '^';
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
start_x = pos_x;
start_y = pos_y;
while (pos_x >= 0 && pos_x < lines.length
	&& pos_y >= 0 && pos_y < lines[0].length)
{
	if (fields[pos_x][pos_y] != 'X')
	{
		fields[pos_x][pos_y] = 'X';
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

let visited;
let obstacle_x, obstacle_y;
for (obstacle_x = 0; obstacle_x < lines.length; obstacle_x++)
{
	for (obstacle_y = 0; obstacle_y < lines[0].length; obstacle_y++)
	{
		if (fields[obstacle_x][obstacle_y] != 'X' || obstacle_x == start_x && obstacle_y == start_y)
		{
			continue;
		}
		visited = [];
		pos_x = start_x;
		pos_y = start_y;
		guard = '^';
		while (pos_x >= 0 && pos_x < lines.length
			&& pos_y >= 0 && pos_y < lines[0].length)
		{
			if (visited.findIndex((e) => pos_x == e[0] && pos_y == e[1] && guard == e[2]) != -1)
			{
				cnt++;
				break;
			}
			if (guard == '^')
			{
				if (pos_x == 0 || lines[pos_x - 1][pos_y] != '#' && !(pos_x - 1 == obstacle_x && pos_y == obstacle_y))
				{
					visited.push([pos_x, pos_y, guard]);
					pos_x--;
				}
				else
				{
					guard = '>';
				}
			}
			else if (guard == '>')
			{
				if (pos_y == lines[0].length - 1 || lines[pos_x][pos_y + 1] != '#' && !(pos_x == obstacle_x && pos_y + 1 == obstacle_y))
				{
					visited.push([pos_x, pos_y, guard]);
					pos_y++;
				}
				else
				{
					guard = 'v';
				}
			}
			else if (guard == 'v')
			{
				if (pos_x == lines.length - 1 || lines[pos_x + 1][pos_y] != '#' && !(pos_x + 1 == obstacle_x && pos_y == obstacle_y))
				{
					visited.push([pos_x, pos_y, guard]);
					pos_x++;
				}
				else
				{
					guard = '<';
				}
			}
			else
			{
				if (pos_y == 0 || lines[pos_x][pos_y - 1] != '#' && !(pos_x == obstacle_x && pos_y - 1 == obstacle_y))
				{
					visited.push([pos_x, pos_y, guard]);
					pos_y--;
				}
				else
				{
					guard = '^';
				}
			}
		}
	}
}

console.log(cnt);
