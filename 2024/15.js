"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input15.txt', 'utf8');
let lines = data.split('\n');
let fields = [];

let i, j, sum = 0, pos_x, pos_y;
const robot = '@', box_marker = 'O';
for (i = 0; i < lines.length; i++)
{
	if (! lines[i].startsWith('#'))
	{
		break;
	}
	fields[i] = lines[i].split('');
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] == robot)
		{
			pos_x = i;
			pos_y = j;
		}
	}
}

let m, movements = lines.slice(i).join('');
for (m = 0; m < movements.length; m++)
{
	if (movements[m] == '^')
	{
		if (fields[pos_x - 1][pos_y] == '.')
		{
			fields[pos_x][pos_y] = '.';
			pos_x--;
			fields[pos_x][pos_y] = robot;
		}
		else if (fields[pos_x - 1][pos_y] == box_marker)
		{
			let box = pos_x - 1;
			while (box >= 0 && fields[box][pos_y] == box_marker)
			{
				box--;
			}
			if (box >= 0)
			{
				if (fields[box][pos_y] != '#')
				{
					let a;
					for (a = box; a < pos_x - 1; a++)
					{
						fields[a][pos_y] = box_marker;
					}
					fields[pos_x][pos_y] = '.';
					pos_x--;
					fields[pos_x][pos_y] = robot;
				}
			}
		}
	}
	else if (movements[m] == '>')
	{
		if (fields[pos_x][pos_y + 1] == '.')
		{
			fields[pos_x][pos_y] = '.';
			pos_y++;
			fields[pos_x][pos_y] = robot;
		}
		else if (fields[pos_x][pos_y + 1] == box_marker)
		{
			let box = pos_y + 1;
			while (box < fields[pos_x].length && fields[pos_x][box] == box_marker)
			{
				box++;
			}
			if (box < fields[pos_x].length)
			{
				if (fields[pos_x][box] != '#')
				{
					let a;
					for (a = box; a > pos_y + 1; a--)
					{
						fields[pos_x][a] = box_marker;
					}
					fields[pos_x][pos_y] = '.';
					pos_y++;
					fields[pos_x][pos_y] = robot;
				}
			}
		}
	}
	else if (movements[m] == 'v')
	{
		if (fields[pos_x + 1][pos_y] == '.')
		{
			fields[pos_x][pos_y] = '.';
			pos_x++;
			fields[pos_x][pos_y] = robot;
		}
		else if (fields[pos_x + 1][pos_y] == box_marker)
		{
			let box = pos_x + 1;
			while (box < fields.length && fields[box][pos_y] == box_marker)
			{
				box++;
			}
			if (box < fields.length)
			{
				if (fields[box][pos_y] != '#')
				{
					let a;
					for (a = box; a > pos_x + 1; a--)
					{
						fields[a][pos_y] = box_marker;
					}
					fields[pos_x][pos_y] = '.';
					pos_x++;
					fields[pos_x][pos_y] = robot;
				}
			}
		}
	}
	else
	{
		if (fields[pos_x][pos_y - 1] == '.')
		{
			fields[pos_x][pos_y] = '.';
			pos_y--;
			fields[pos_x][pos_y] = robot;
		}
		else if (fields[pos_x][pos_y - 1] == box_marker)
		{
			let box = pos_y - 1;
			while (box >= 0 && fields[pos_x][box] == box_marker)
			{
				box--;
			}
			if (box >= 0)
			{
				if (fields[pos_x][box] != '#')
				{
					let a;
					for (a = box; a < pos_y - 1; a++)
					{
						fields[pos_x][a] = box_marker;
					}
					fields[pos_x][pos_y] = '.';
					pos_y--;
					fields[pos_x][pos_y] = robot;
				}
			}
		}
	}
}

for (i = 0; i < fields.length; i++)
{
	for (j = 0; j < fields[i].length; j++)
	{
		if (fields[i][j] == box_marker)
		{
			sum += i * 100 + j;
		}
	}
}

console.log(sum);
