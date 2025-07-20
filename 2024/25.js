"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input25.txt', 'utf8');
const lines = data.split('\n');

let l, cnt = 0, is_lock = false, is_key = false;
let lock_lines = [], key_lines = [];
let locks = [], keys = [];
for (l of lines)
{
	if (!is_lock && !is_key)
	{
		if (l.startsWith('#'))
		{
			is_lock = true;
			continue;
		}
		else if (l.startsWith('.'))
		{
			is_key = true;
			continue;
		}
	}
	if (l == '')
	{
		if (is_lock)
		{
			process_lock();
		}
		if (is_key)
		{
			process_key();
		}
		is_lock = false, is_key = false;
		lock_lines = [], key_lines = [];
	}
	else if (is_lock)
	{
		lock_lines.push(l);
	}
	else if (is_key)
	{
		key_lines.push(l);
	}
}

function process_lock()
{
	let i, j, values = [];
	for (i = 0; i < lock_lines[0].length; i++)
	{
		let k = 0;
		for (j = 0; j < lock_lines.length; j++)
		{
			if (lock_lines[j][i] == '#')
			{
				k++;
			}
		}
		values.push(k);
	}
	locks.push(values);
}

function process_key()
{
	let i, j, values = [];
	for (i = 0; i < key_lines[0].length; i++)
	{
		let k = 0;
		for (j = 0; j < key_lines.length; j++)
		{
			if (key_lines[j][i] == '#')
			{
				k++;
			}
		}
		values.push(k - 1);
	}
	keys.push(values);
}

let i, j, k;
for (i = 0; i < locks.length; i++)
{
	for (j = 0; j < keys.length; j++)
	{
		for (k = 0; k < locks[i].length; k++)
		{
			if (locks[i][k] + keys[j][k] > 5)
			{
				break;
			}
		}
		if (k == locks[i].length)
		{
			cnt++;
		}
	}
}

console.log(cnt);
