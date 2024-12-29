#!/usr/bin/perl

use strict;
use warnings;

my @lines = ();
my $sum = 0;

while (<>)
{
	s/[\r\n]//g;
	my @line = (split //);
	push @lines, \@line;
	push @lines, \@line if /^\.+$/;
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
		for (my $i = 0; $i < @lines; $i++)
		{
			my @a = @{$lines[$i]};
			splice (@a, $j, 1, '.', '.');
			$lines[$i] = \@a;
		}
		$j++;
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
	}
}

print "$sum\n";

exit 0;
