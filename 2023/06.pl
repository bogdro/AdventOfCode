#!/usr/bin/perl

use strict;
use warnings;

my @times;
my @distances;
my $solutions = 1;

while (<>)
{
	if (/Time:/)
	{
		s/Time:\s*//;
		@times = /(\d+)/g;
	}
	if (/Distance:/)
	{
		s/Distance:\s*//;
		@distances = /(\d+)/g;
	}
}

for (my $t = 0; $t < scalar @times; $t++)
{
	my $winnings = 0;
	for (my $i = 0; $i < $times[$t]; $i++)
	{
		my $distance = ($times[$t] - $i) * $i;
		$winnings++ if $distance > $distances[$t];
	}
	$solutions *= $winnings if $winnings;
}

print "$solutions\n";

exit 0;
