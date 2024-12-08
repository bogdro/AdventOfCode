"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input04.txt', 'utf8');
let lines = data.split('\n');

let cnt = 0;
let i, j;
lines = lines.filter((x) => x.match(/[A-Z]/));
for (i = 1; i < lines.length - 1; i++)
{
	for (j = 1; j < lines[i].length - 1; j++)
	{
		if (lines[i][j] == 'A')
		{
			if (lines[i-1][j-1] == 'M' && lines[i+1][j+1] == 'S'
				&& lines[i-1][j+1] == 'M' && lines[i+1][j-1] == 'S')
			{
				cnt++;
			}
			else if (lines[i-1][j-1] == 'S' && lines[i+1][j+1] == 'M'
				&& lines[i-1][j+1] == 'S' && lines[i+1][j-1] == 'M')
			{
				cnt++;
			}
			else if (lines[i-1][j-1] == 'M' && lines[i+1][j+1] == 'S'
				&& lines[i-1][j+1] == 'S' && lines[i+1][j-1] == 'M')
			{
				cnt++;
			}
			else if (lines[i-1][j-1] == 'S' && lines[i+1][j+1] == 'M'
				&& lines[i-1][j+1] == 'M' && lines[i+1][j-1] == 'S')
			{
				cnt++;
			}
		}
	}
}

console.log(cnt);
