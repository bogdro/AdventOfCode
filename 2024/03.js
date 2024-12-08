"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input03.txt', 'utf8');
const lines = data.split('\n');

let l, total = 0;
for (l of lines)
{
	if (l.match(/\d/))
	{
		const instr = [...l.matchAll(/mul\((\d+),(\d+)\)/g)];
		let i;
		for (i = 0; i < instr.length; i++)
		{
			total += Number(instr[i][1]) * Number(instr[i][2]);
		}
	}
}

console.log(total);
