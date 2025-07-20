"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input19.txt', 'utf8');
let lines = data.split('\n');
let fields = [];

let i, cnt = 0, towels = null;
for (i = 0; i < lines.length; i++)
{
	if (lines[i].length < 3)
	{
		continue;
	}
	if (! towels)
	{
		towels = lines[i].split(/,\s*/);
		continue;
	}
	cnt += find_match(lines[i]);
}

function find_match(design)
{
	let t;
	if (design.length <= 0)
	{
		return 1;
	}
	for (t of towels)
	{
		if (design.startsWith(t))
		{
			if (find_match(design.substring(t.length)))
			{
				return 1;
			}
		}
	}
	return 0;
}

console.log(cnt);
