"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input02.txt', 'utf8');
const lines = data.split('\n');

function process(numbers, was_split)
{
	let i, is_asc = 0, is_desc = 0, is_equal = 0, max_dist = 0;
	for (i = 0; i < numbers.length - 1; i++)
	{
		if (Number(numbers[i]) < Number(numbers[i+1]))
		{
			is_asc++;
		}
		if (Number(numbers[i]) > Number(numbers[i+1]))
		{
			is_desc++;
		}
		if (Number(numbers[i]) == Number(numbers[i+1]))
		{
			is_equal++;
		}
		max_dist = Math.max(max_dist, Math.abs(Number(numbers[i+1]) - Number(numbers[i])));
	}
	if ( max_dist >= 1 && max_dist <= 3 && (is_asc && ! is_desc || is_desc && ! is_asc) && ! is_equal )
	{
		return 1;
	}
	else if (!was_split)
	{
		let j;
		for (j = 0; j < numbers.length; j++)
		{
			if (process(numbers.toSpliced(j, 1), true) == 1)
			{
				return 1;
			}
		}
	}
	return 0;
}

let l, cnt = 0;
for (l of lines)
{
	if (l.match(/\d/))
	{
		const numbers = l.split(/\s+/);
		cnt += process(numbers, false);
	}
}

console.log(cnt);
