#!/usr/bin/perl

use strict;
use warnings;

my %particles = ();
my $sum = 0;
my $lineno = 0;

while (<>)
{
	s/[\r\n]//g;
	if (/(\d+),\s*(\d+),\s*(\d+)\s*\@\s*([-+]?\d+),\s*([-+]?\d+),\s*([-+]?\d+)/)
	{
		$particles{$lineno}{'x'} = $1;
		$particles{$lineno}{'y'} = $2;
		$particles{$lineno}{'z'} = $3;
		$particles{$lineno}{'vx'} = $4;
		$particles{$lineno}{'vy'} = $5;
		$particles{$lineno}{'vz'} = $6;
		$lineno++;
	}
}

PARTICLE:
for (my $i = 0; $i < $lineno; $i++)
{
	my $i_a = $particles{$i}{'vy'} / $particles{$i}{'vx'};
	my $i_b = $particles{$i}{'y'} - $i_a * $particles{$i}{'x'};
	for (my $j = $i + 1; $j < $lineno; $j++)
	{
		my $rel = $particles{$j}{'vx'} / $particles{$i}{'vx'};
		next if $particles{$j}{'vy'} / $particles{$i}{'vy'} == $rel;
		my $j_a = $particles{$j}{'vy'} / $particles{$j}{'vx'};
		my $j_b = $particles{$j}{'y'} - $j_a * $particles{$j}{'x'};
		my $cross_x = ($j_b - $i_b) / ($i_a - $j_a);
		my $cross_y = $i_a * $cross_x + $i_b;
		$sum++ if $cross_x >= 200000000000000 && $cross_x <= 400000000000000
			&& $cross_y >= 200000000000000 && $cross_y <= 400000000000000
			&& (
				$cross_x >= $particles{$i}{'x'} && $particles{$i}{'vx'} >= 0
				|| $cross_x <= $particles{$i}{'x'} && $particles{$i}{'vx'} <= 0
			)
			&& (
				$cross_y >= $particles{$i}{'y'} && $particles{$i}{'vy'} >= 0
				|| $cross_y <= $particles{$i}{'y'} && $particles{$i}{'vy'} <= 0
			)
			&& (
				$cross_x >= $particles{$j}{'x'} && $particles{$j}{'vx'} >= 0
				|| $cross_x <= $particles{$j}{'x'} && $particles{$j}{'vx'} <= 0
			)
			&& (
				$cross_y >= $particles{$j}{'y'} && $particles{$j}{'vy'} >= 0
				|| $cross_y <= $particles{$j}{'y'} && $particles{$j}{'vy'} <= 0
			)
			;
	}
}

print "$sum\n";

exit 0;
