#!/usr/bin/perl

use strict;
use warnings;

my $sum = 0;

READ: while (<>)
{
	if (/^Game (\d+):/)
	{
		my $id = $1;
		s/^Game (\d+)://o;
		my @draws = split /;/o;
		my ($min_red, $min_green, $min_blue) = (0, 0, 0);
		foreach my $d (@draws)
		{
			if ($d =~ /(\d+) red/o)
			{
				$min_red = $1 if $min_red < $1;
			}
			if ($d =~ /(\d+) green/o)
			{
				$min_green = $1 if $min_green < $1;
			}
			if ($d =~ /(\d+) blue/o)
			{
				$min_blue = $1 if $min_blue < $1;
			}
		}
		$sum += $min_red * $min_green * $min_blue;
	}
}

print "$sum\n";

exit 0;
