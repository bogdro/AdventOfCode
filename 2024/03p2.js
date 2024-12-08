"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input03.txt', 'utf8');
let l = data;

let total = 0;
l = l.replaceAll(/\n/g, '');
l = l.replaceAll(/don't\(\).*?do\(\)/g, '');
l = l.replaceAll(/don't\(\).*/g, '');
const instr = [...l.matchAll(/mul\((\d+),(\d+)\)/g)];

let i;
for (i = 0; i < instr.length; i++)
{
	total += Number(instr[i][1]) * Number(instr[i][2]);
}

console.log(total);
