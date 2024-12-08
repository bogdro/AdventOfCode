"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input04.txt', 'utf8');
const lines = data.split('\n');

let l, cnt = 0;
for (l of lines)
{
	let xmas = [...l.matchAll(/XMAS/g)];
	cnt += xmas.length;
	xmas = [...l.matchAll(/SAMX/g)];
	cnt += xmas.length;
}
let i, j;
for (i = 0; i < lines.length; i++)
{
	for (j = 0; j < lines[i].length; j++)
	{
		if (lines[i][j] == 'X')
		{
			if (i >= 3)
			{
				if (lines[i-1][j] == 'M' && lines[i-2][j] == 'A' && lines[i-3][j] == 'S')
				{
					cnt++;
				}
				if (j >= 3)
				{
					if (lines[i-1][j-1] == 'M' && lines[i-2][j-2] == 'A' && lines[i-3][j-3] == 'S')
					{
						cnt++;
					}
				}
				if (j < lines[i].length - 3)
				{
					if (lines[i-1][j+1] == 'M' && lines[i-2][j+2] == 'A' && lines[i-3][j+3] == 'S')
					{
						cnt++;
					}
				}
			}
			if (i < lines.length - 3)
			{
				if (lines[i+1][j] == 'M' && lines[i+2][j] == 'A' && lines[i+3][j] == 'S')
				{
					cnt++;
				}
				if (j >= 3)
				{
					if (lines[i+1][j-1] == 'M' && lines[i+2][j-2] == 'A' && lines[i+3][j-3] == 'S')
					{
						cnt++;
					}
				}
				if (j < lines[i].length - 3)
				{
					if (lines[i+1][j+1] == 'M' && lines[i+2][j+2] == 'A' && lines[i+3][j+3] == 'S')
					{
						cnt++;
					}
				}
			}
		}
	}
}

console.log(cnt);
