"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input24.txt', 'utf8');
let lines = data.split('\n').filter((l) => l.length > 1);
let gates = new Map();
let oper = [];

const gate_regex = /(\w+)\s*:\s*(\d+)/;
const wire_regex = /(\w+)\s*(\w+)\s*(\w+)\s*->\s*(\w+)/;
let l;
for (l of lines)
{
	const g_match = l.match(gate_regex);
	if (g_match)
	{
		gates.set(g_match[1], Number(g_match[2]));
	}
	const w_match = l.match(wire_regex);
	if (w_match)
	{
		gates.set(w_match[4], null);
		oper.push([w_match[1], w_match[2], w_match[3], w_match[4]]);
	}
}

let still_has_z_unset;
do
{
	still_has_z_unset = false;
	let op;
	for (op of oper)
	{
		if (gates.get(op[0]) === null || gates.get(op[2]) === null)
		{
			continue;
		}
		const instr = op[1];
		if (instr == 'AND')
		{
			gates.set(op[3], Number(gates.get(op[0])) & Number(gates.get(op[2])));
		}
		else if (instr == 'OR')
		{
			gates.set(op[3], Number(gates.get(op[0])) | Number(gates.get(op[2])));
		}
		else
		{
			gates.set(op[3], Number(gates.get(op[0])) ^ Number(gates.get(op[2])));
		}
	}
	for (const [gate, value] of gates)
	{
		if (gate[0] == 'z' && value === null)
		{
			still_has_z_unset = true;
			break;
		}
	}
} while (still_has_z_unset);

let sum = 0n;
for (const [gate, value] of gates)
{
	if (gate[0] == 'z')
	{
		sum = sum | BigInt(BigInt(value) << BigInt(gate.substring(1)));
	}
}

console.log(BigInt.asUintN(64, sum));
