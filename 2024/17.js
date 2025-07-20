"use strict";
const fs = require('node:fs');

const data = fs.readFileSync('input17.txt', 'utf8');
const lines = data.split('\n');

let l, out = '', a = null, b = null, c = null, prog = null, ip = 0, instr = [];
const a_regex = /Register\s*A:\s*(\d+)/;
const b_regex = /Register\s*B:\s*(\d+)/;
const c_regex = /Register\s*C:\s*(\d+)/;
const prog_regex = /Program\s*:\s*(.+)/;
for (l of lines)
{
	const a_match = l.match(a_regex);
	if (a_match)
	{
		a = Number(a_match[1]);
	}
	const b_match = l.match(b_regex);
	if (b_match)
	{
		b = Number(b_match[1]);
	}
	const c_match = l.match(c_regex);
	if (c_match)
	{
		c = Number(c_match[1]);
	}
	const prog_match = l.match(prog_regex);
	if (prog_match)
	{
		prog = prog_match[1];
	}
	if (prog)
	{
		instr = prog.split(',');
		while (ip < instr.length && ip >= 0)
		{
			switch (instr[ip])
			{
				case '0':
					a = Math.floor(a >> get_combo_operand(ip+1));
					ip += 2;
					break;
				case '1':
					b = b ^ Number(instr[ip + 1]);
					ip += 2;
					break;
				case '2':
					b = get_combo_operand(ip+1) & 7;
					ip += 2;
					break;
				case '3':
					if (a != 0)
					{
						ip = Number(instr[ip + 1]);
					}
					else
					{
						ip += 2;
					}
					break;
				case '4':
					b = b ^ c;
					ip += 2;
					break;
				case '5':
					out += (get_combo_operand(ip+1) & 7) + ',';
					ip += 2;
					break;
				case '6':
					b = Math.floor(a >> get_combo_operand(ip+1));
					ip += 2;
					break;
				case '7':
					c = Math.floor(a >> get_combo_operand(ip+1));
					ip += 2;
					break;
			}
		}
		break;
	}
}

function get_combo_operand(pos)
{
	switch (instr[pos])
	{
		case '0':
			return 0;
		case '1':
			return 1;
		case '2':
			return 2;
		case '3':
			return 3;
		case '4':
			return a;
		case '5':
			return b;
		case '6':
			return c;
	}
}

console.log(out);
