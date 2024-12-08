"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input02.txt', 'utf8');
const lines = data.split('\n');

let l, cnt = 0;
for (l of lines)
{
	if (l.match(/\d/))
	{
		const numbers = l.split(/\s+/);
		let i, is_asc = 0, is_desc = 0, max_dist = 0;
		for (i = 0; i < numbers.length - 1; i++)
		{
			if (Number(numbers[i]) < Number(numbers[i+1]))
			{
				is_asc = 1;
			}
			if (Number(numbers[i]) > Number(numbers[i+1]))
			{
				is_desc = 1;
			}
			if (Number(numbers[i]) == Number(numbers[i+1]))
			{
				max_dist = 1000000;
			}
			max_dist = Math.max(max_dist, Math.abs(Number(numbers[i+1]) - Number(numbers[i])));
		}
		if ( max_dist >= 1 && max_dist <= 3 && (is_asc && ! is_desc || is_desc && ! is_asc) )
		{
			cnt++;
		}
	}
}

console.log(cnt);
