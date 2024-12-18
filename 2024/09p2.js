"use strict";
import * as fs from 'node:fs';

const data = fs.readFileSync('input09.txt', 'utf8');
const lines = data.split('\n').filter((l) => l.length > 5);

let l, i, j, last_file, disk = [], cksum  = 0, moved_files = [];
for (l of lines)
{
	let file_id = 0, is_file = true;
	for (i = 0; i < l.length; i++)
	{
		for (j = 0; j < Number(l[i]); j++)
		{
			if (is_file)
			{
				disk.push(file_id);
			}
			else
			{
				disk.push(-1);
			}
		}
		if (is_file)
		{
			file_id++;
		}
		is_file = !is_file;
	}
}
last_file = disk.length - 1;
while (last_file > 0)
{
	while (disk[last_file] == -1 && last_file > 0)
	{
		last_file--;
	}
	if (last_file <= 0)
	{
		break;
	}
	const len = find_file_len(last_file);
	const new_pos = find_free_block(len, last_file);
	if (new_pos != -1 && !moved_files.find((e) => e == disk[last_file]))
	{
		moved_files.push(disk[last_file]);
		move_file(last_file - len + 1, new_pos, len);
	}
	else
	{
		let val = disk[last_file];
		while (disk[last_file] == val && last_file > 0)
		{
			last_file--;
		}
	}
}

function find_file_len(pos)
{
	let i = pos;
	const val = disk[pos];
	while (disk[i] == val)
	{
		i--;
	}
	return pos - i;
}

function find_free_block(len, max)
{
	let i, j;
	for (i = 0; i < max - len; i++)
	{
		if (disk[i] == -1)
		{
			for (j = i; j < i + len; j++)
			{
				if (disk[j] != -1)
				{
					break;
				}
			}
			if (j >= i + len)
			{
				return i;
			}
		}
	}
	return -1;
}

function move_file(src, dest, len)
{
	while (len > 0)
	{
		disk[dest] = disk[src];
		disk[src] = -1;
		dest++;
		src++;
		len--;
	}
}

function file_moved(file_id)
{
	return moved_files.find((e) => e == file_id);
}

for (i = 0; i < disk.length; i++)
{
	if (disk[i] != -1)
	{
		cksum += i * disk[i];
	}
}

console.log(cksum);
