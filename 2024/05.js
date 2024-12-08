"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input05.txt', 'utf8');
const lines = data.split('\n');

let l, total = 0, rules = new Map();
for (l = 0; l < lines.length; l++)
{
	if (! lines[l].match(/\d/))
	{
		break;
	}
	const pair = lines[l].split('|');
	if (! rules.has(pair[0]))
	{
		rules.set(pair[0], []);
	}
	let z = rules.get(pair[0]);
	z.push(pair[1]);
	rules.set(pair[0], z);
}
l++;
for (; l < lines.length; l++)
{
	if (! lines[l].match(/\d/))
	{
		continue;
	}
	const pages = lines[l].split(',');
	let i, correct = true;
	P: for (i = 1; i < pages.length; i++)
	{
		if (rules.has(pages[i]))
		{
			let j;
			for (j = 0; j < i; j++)
			{
				let z = rules.get(pages[i]);
				if (z.indexOf(pages[j]) != -1)
				{
					correct = false;
					break P;
				}
			}
		}
	}
	if (correct)
	{
		total += Number(pages[(pages.length - 1)/2]);
	}
}

console.log(total);
