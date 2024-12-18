"use strict";
import * as fs from 'node:fs';

const data = fs.readFileSync('input09.txt', 'utf8');
const lines = data.split('\n').filter((l) => l.length > 5);

let l: String, i: Number, j: Number, last_file: Number, disk: Array = [], cksum : Number = 0;
for (l of lines)
{
	let file_id: Number = 0, is_file: Boolean = true;
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
while (disk[last_file] == -1)
{
	last_file--;
}

for (i = 0; i < disk.length; i++)
{
	if (disk[i] == -1)
	{
		disk[i] = disk[last_file];
		disk[last_file] = -1;
		last_file--;
		while (disk[last_file] == -1)
		{
			last_file--;
		}
		if (last_file <= i)
		{
			break;
		}
	}
}

for (i = 0; i < disk.length; i++)
{
	if (disk[i] != -1)
	{
		cksum += i * disk[i];
	}
}

console.log(cksum);
