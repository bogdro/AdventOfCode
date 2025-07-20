"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input11.txt', 'utf8');
const lines = data.split('\n');

let l, n1 = [], n2 = [];
for (l of lines)
{
	if (l.match(/\d/))
	{
		l.split(/\s+/).forEach((e) => n1.push(Number(e)));
		let i;
		for (i = 0; i < 25; i++)
		{
			let j;
			for (j = 0; j < n1.length; j++)
			{
				if (n1[j] == 0)
				{
					n2.push(1);
				}
				else if (String(n1[j]).length % 2 == 0)
				{
					let s = String(n1[j]);
					n2.push(Number(s.substring(0, s.length/2)));
					n2.push(Number(s.substring(s.length/2, s.length)));
				}
				else
				{
					n2.push(n1[j] * 2024);
				}
			}
			n1 = n2;
			n2 = [];
		}
	}
}

console.log(n1.length);
