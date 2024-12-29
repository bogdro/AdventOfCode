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

my $time = join '', @times;
my $distance = join '', @distances;

my $winnings = 0;
for (my $i = 0; $i < $time; $i++)
{
	my $curr_distance = ($time - $i) * $i;
	$winnings++ if $curr_distance > $distance;
}
$solutions *= $winnings if $winnings;

print "$solutions\n";

exit 0;
