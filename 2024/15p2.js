"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input15.txt', 'utf8');
let lines = data.split('\n');
let fields = [];

let i, j, sum = 0, pos_x, pos_y;
const robot = '@', space = '.', wall = '#', box_marker = 'O', box_l = '[', box_r = ']';
for (i = 0; i < lines.length; i++)
{
	if (! lines[i].startsWith(wall))
	{
		break;
	}
	fields[i] = [];
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] == robot)
		{
			pos_x = i;
			pos_y = j * 2;
			fields[i].push(robot);
			fields[i].push(space);
		}
		else if (lines[i][j] == box_marker)
		{
			fields[i].push(box_l);
			fields[i].push(box_r);
		}
		else
		{
			fields[i].push(lines[i][j]);
			fields[i].push(lines[i][j]);
		}
	}
	fields[i] = fields[i].join('').split('');
}

let m, movements = lines.slice(i).join('');
for (m = 0; m < movements.length; m++)
{
	let move = false;
	if (movements[m] == '^')
	{
		if (fields[pos_x - 1][pos_y] == space)
		{
			move = true;
		}
		else if (fields[pos_x - 1][pos_y] == box_l && can_move_box(pos_x - 1, pos_y, movements[m]))
		{
			move_box(pos_x - 1, pos_y, movements[m]);
			move = true;
		}
		else if (fields[pos_x - 1][pos_y] == box_r && can_move_box(pos_x - 1, pos_y - 1, movements[m]))
		{
			move_box(pos_x - 1, pos_y - 1, movements[m]);
			move = true;
		}
		if (move)
		{
			fields[pos_x][pos_y] = space;
			pos_x--;
			fields[pos_x][pos_y] = robot;
		}
	}
	else if (movements[m] == '>')
	{
		if (fields[pos_x][pos_y + 1] == space)
		{
			move = true;
		}
		else if (fields[pos_x][pos_y + 1] == box_l && can_move_box(pos_x, pos_y + 1, movements[m]))
		{
			move_box(pos_x, pos_y + 1, movements[m]);
			move = true;
		}
		if (move)
		{
			fields[pos_x][pos_y] = space;
			pos_y++;
			fields[pos_x][pos_y] = robot;
		}
	}
	else if (movements[m] == 'v')
	{
		if (fields[pos_x + 1][pos_y] == space)
		{
			move = true;
		}
		else if (fields[pos_x + 1][pos_y] == box_l && can_move_box(pos_x + 1, pos_y, movements[m]))
		{
			move_box(pos_x + 1, pos_y, movements[m]);
			move = true;
		}
		else if (fields[pos_x + 1][pos_y] == box_r && can_move_box(pos_x + 1, pos_y - 1, movements[m]))
		{
			move_box(pos_x + 1, pos_y - 1, movements[m]);
			move = true;
		}
		if (move)
		{
			fields[pos_x][pos_y] = space;
			pos_x++;
			fields[pos_x][pos_y] = robot;
		}
	}
	else
	{
		if (fields[pos_x][pos_y - 1] == space)
		{
			move = true;
		}
		else if (fields[pos_x][pos_y - 2] == box_l && can_move_box(pos_x, pos_y - 2, movements[m]))
		{
			move_box(pos_x, pos_y - 2, movements[m]);
			move = true;
		}
		if (move)
		{
			fields[pos_x][pos_y] = space;
			pos_y--;
			fields[pos_x][pos_y] = robot;
		}
	}
}

function can_move_box(box_x, box_y, direction)
{
	if (direction == '^' && box_x > 0)
	{
		if (fields[box_x - 1][box_y] == space && fields[box_x - 1][box_y + 1] == space)
		{
			return true;
		}
		if (fields[box_x - 1][box_y] == box_l && fields[box_x - 1][box_y + 1] == box_r)
		{
			return can_move_box(box_x - 1, box_y, direction);
		}
		if (fields[box_x - 1][box_y] == space && fields[box_x - 1][box_y + 1] == box_l)
		{
			return can_move_box(box_x - 1, box_y + 1, direction);
		}
		if (fields[box_x - 1][box_y] == box_r && fields[box_x - 1][box_y + 1] == space)
		{
			return can_move_box(box_x - 1, box_y - 1, direction);
		}
		if (fields[box_x - 1][box_y] == box_r && fields[box_x - 1][box_y + 1] == box_l)
		{
			return can_move_box(box_x - 1, box_y - 1, direction)
				&& can_move_box(box_x - 1, box_y + 1, direction);
		}
	}
	else if (direction == '>' && box_y < fields[0].length - 3)
	{
		if (fields[box_x][box_y + 2] == space)
		{
			return true;
		}
		if (fields[box_x][box_y + 2] == box_l)
		{
			return can_move_box(box_x, box_y + 2, direction);
		}
	}
	else if (direction == 'v' && box_x < fields[0].length - 1)
	{
		if (fields[box_x + 1][box_y] == space && fields[box_x + 1][box_y + 1] == space)
		{
			return true;
		}
		if (fields[box_x + 1][box_y] == box_l && fields[box_x + 1][box_y + 1] == box_r)
		{
			return can_move_box(box_x + 1, box_y, direction);
		}
		if (fields[box_x + 1][box_y] == space && fields[box_x + 1][box_y + 1] == box_l)
		{
			return can_move_box(box_x + 1, box_y + 1, direction);
		}
		if (fields[box_x + 1][box_y] == box_r && fields[box_x + 1][box_y + 1] == space)
		{
			return can_move_box(box_x + 1, box_y - 1, direction);
		}
		if (fields[box_x + 1][box_y] == box_r && fields[box_x + 1][box_y + 1] == box_l)
		{
			return can_move_box(box_x + 1, box_y - 1, direction)
				&& can_move_box(box_x + 1, box_y + 1, direction);
		}
	}
	else if (direction == '<' && box_y > 0)
	{
		if (fields[box_x][box_y - 1] == space)
		{
			return true;
		}
		if (fields[box_x][box_y - 2] == box_l)
		{
			return can_move_box(box_x, box_y - 2, direction);
		}
	}
	return false;
}

function move_box(box_x, box_y, direction)
{
	let move = false;
	if (direction == '^' && box_x > 0)
	{
		if (fields[box_x - 1][box_y] == space && fields[box_x - 1][box_y + 1] == space)
		{
			move = true;
		}
		else if (fields[box_x - 1][box_y] == box_l && fields[box_x - 1][box_y + 1] == box_r)
		{
			move_box(box_x - 1, box_y, direction);
			move = true;
		}
		else if (fields[box_x - 1][box_y] == space && fields[box_x - 1][box_y + 1] == box_l)
		{
			move_box(box_x - 1, box_y + 1, direction);
			move = true;
		}
		else if (fields[box_x - 1][box_y] == box_r && fields[box_x - 1][box_y + 1] == space)
		{
			move_box(box_x - 1, box_y - 1, direction);
			move = true;
		}
		else if (fields[box_x - 1][box_y] == box_r && fields[box_x - 1][box_y + 1] == box_l)
		{
			move_box(box_x - 1, box_y - 1, direction);
			move_box(box_x - 1, box_y + 1, direction);
			move = true;
		}
		if (move)
		{
			fields[box_x - 1][box_y] = box_l;
			fields[box_x - 1][box_y + 1] = box_r;
			fields[box_x][box_y] = space;
			fields[box_x][box_y + 1] = space;
		}
	}
	else if (direction == '>' && box_y < fields[0].length - 3)
	{
		if (fields[box_x][box_y + 2] == space)
		{
			move = true;
		}
		else if (fields[box_x][box_y + 2] == box_l)
		{
			move_box(box_x, box_y + 2, direction);
			move = true;
		}
		if (move)
		{
			fields[box_x][box_y] = space;
			fields[box_x][box_y + 1] = space;
			fields[box_x][box_y + 1] = box_l;
			fields[box_x][box_y + 2] = box_r;
		}
	}
	else if (direction == 'v' && box_x < fields[0].length - 1)
	{
		if (fields[box_x + 1][box_y] == space && fields[box_x + 1][box_y + 1] == space)
		{
			move = true;
		}
		else if (fields[box_x + 1][box_y] == box_l && fields[box_x + 1][box_y + 1] == box_r)
		{
			move_box(box_x + 1, box_y, direction);
			move = true;
		}
		else if (fields[box_x + 1][box_y] == space && fields[box_x + 1][box_y + 1] == box_l)
		{
			move_box(box_x + 1, box_y + 1, direction);
			move = true;
		}
		else if (fields[box_x + 1][box_y] == box_r && fields[box_x + 1][box_y + 1] == space)
		{
			move_box(box_x + 1, box_y - 1, direction);
			move = true;
		}
		else if (fields[box_x + 1][box_y] == box_r && fields[box_x + 1][box_y + 1] == box_l)
		{
			move_box(box_x + 1, box_y - 1, direction);
			move_box(box_x + 1, box_y + 1, direction);
			move = true;
		}
		if (move)
		{
			fields[box_x + 1][box_y] = box_l;
			fields[box_x + 1][box_y + 1] = box_r;
			fields[box_x][box_y] = space;
			fields[box_x][box_y + 1] = space;
		}
	}
	else if (direction == '<' && box_y > 1)
	{
		if (fields[box_x][box_y - 1] == space)
		{
			move = true;
		}
		else if (fields[box_x][box_y - 2] == box_l)
		{
			move_box(box_x, box_y - 2, direction);
			move = true;
		}
		if (move)
		{
			fields[box_x][box_y] = space;
			fields[box_x][box_y + 1] = space;
			fields[box_x][box_y - 1] = box_l;
			fields[box_x][box_y] = box_r;
		}
	}
}

for (i = 0; i < fields.length; i++)
{
	for (j = 0; j < fields[i].length; j++)
	{
		if (fields[i][j] == box_l)
		{
			sum += i * 100 + j;
		}
	}
}

console.log(sum);
