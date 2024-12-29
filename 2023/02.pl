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
		foreach my $d (@draws)
		{
			if ($d =~ /(\d+) red/o)
			{
				next READ if $1 > 12;
			}
			if ($d =~ /(\d+) green/o)
			{
				next READ if $1 > 13;
			}
			if ($d =~ /(\d+) blue/o)
			{
				next READ if $1 > 14;
			}
		}
		$sum += $id;
	}
}

print "$sum\n";

exit 0;
