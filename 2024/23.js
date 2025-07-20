"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input23.txt', 'utf8');
let lines = data.split('\n').filter((l) => l.length > 1);
let conns = new Map();
let triples = [];

let i;
for (i = 0; i < lines.length; i++)
{
	const hosts = lines[i].split(/(\w+)-(\w+)/);
	if (hosts)
	{
		let hconns = conns.get(hosts[1]);
		if (!hconns)
		{
			hconns = new Set();
		}
		hconns.add(hosts[2]);
		conns.set(hosts[1], hconns);

		hconns = conns.get(hosts[2]);
		if (!hconns)
		{
			hconns = new Set();
		}
		hconns.add(hosts[1]);
		conns.set(hosts[2], hconns);
	}
}

for (const [host, hconns] of conns)
{
	for (const hc1 of hconns)
	{
		for (const hc2 of conns.get(hc1))
		{
			if (conns.get(hc2).has(host))
			{
				if (host[0] == 't' || hc1[0] == 't' || hc2[0] == 't')
				{
					add(host, hc1, hc2);
				}
			}
		}
	}
}

function add(h1, h2, h3)
{
	if (! triples.find((e) =>
		e[0] == h1 && e[1] == h2 && e[2] == h3
		|| e[0] == h1 && e[1] == h3 && e[2] == h2
		|| e[0] == h2 && e[1] == h1 && e[2] == h3
		|| e[0] == h2 && e[1] == h3 && e[2] == h1
		|| e[0] == h3 && e[1] == h2 && e[2] == h1
		|| e[0] == h3 && e[1] == h1 && e[2] == h2
	))
	{
		triples = [...triples, [h1, h2, h3]];
	}
}

console.log(triples.length);
