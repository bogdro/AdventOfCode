#!/usr/bin/perl

use strict;
use warnings;

my @lines = ();
my @emtpy_rows;
my @emtpy_cols;
my $sum = 0;

my $num = 0;
while (<>)
{
	s/[\r\n]//g;
	my @line = (split //);
	push @lines, \@line;
	push @emtpy_rows, $num if /^\.+$/;
	$num++;
}
for (my $j = 0; $j < scalar(@{$lines[0]}); $j++)
{
	my $got_galaxy = 0;
	for (my $i = 0; $i < @lines; $i++)
	{
		$got_galaxy = 1 if $lines[$i]->[$j] eq '#';
	}
	if (! $got_galaxy)
	{
		push @emtpy_cols, $j;
	}
}

my @galaxy_pos = ();
for (my $i = 0; $i < @lines; $i++)
{
	for (my $j = 0; $j < scalar(@{$lines[$i]}); $j++)
	{
		push @galaxy_pos, [$i, $j] if $lines[$i]->[$j] eq '#';
	}
}

for (my $i = 0; $i < @galaxy_pos; $i++)
{
	for (my $j = $i + 1; $j < @galaxy_pos; $j++)
	{
		$sum += abs($galaxy_pos[$j]->[0] - $galaxy_pos[$i]->[0])
			+ abs($galaxy_pos[$j]->[1] - $galaxy_pos[$i]->[1])
			;
		for (my $r = 0; $r < @emtpy_rows; $r++)
		{
			$sum += 999_999 if
				$galaxy_pos[$j]->[0] <= $emtpy_rows[$r] && $emtpy_rows[$r] <= $galaxy_pos[$i]->[0]
				|| $galaxy_pos[$i]->[0] <= $emtpy_rows[$r] && $emtpy_rows[$r] <= $galaxy_pos[$j]->[0];
		}
		for (my $r = 0; $r < @emtpy_cols; $r++)
		{
			$sum += 999_999 if
				$galaxy_pos[$j]->[1] <= $emtpy_cols[$r] && $emtpy_cols[$r] <= $galaxy_pos[$i]->[1]
				|| $galaxy_pos[$i]->[1] <= $emtpy_cols[$r] && $emtpy_cols[$r] <= $galaxy_pos[$j]->[1];
		}
	}
}

print "$sum\n";

exit 0;
