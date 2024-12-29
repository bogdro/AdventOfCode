#!/usr/bin/perl

use strict;
use warnings;

my @lines;
my $lineno = 0;

while (<>)
{
	s/[\r\n]//g;
	my @curr = (split //, $_);
	push @lines, \@curr;
	for (my $i = 0; $i < @curr; $i++)
	{
		if ($curr[$i] eq 'O')
		{
			for (my $j = $lineno - 1; $j >= 0; $j--)
			{
				if ($lines[$j]->[$i] eq '.')
				{
					$lines[$j]->[$i] = 'O';
					$lines[$j + 1]->[$i] = '.';
				}
				else
				{
					last;
				}
			}
		}
	}
	$lineno++;
}
my $sum = 0;
for (my $i = 0; $i < @lines; $i++)
{
	for (my $j = 0; $j < scalar @{$lines[$i]}; $j++)
	{
		$sum += @lines - $i if $lines[$i]->[$j] eq 'O';
	}
}

print "$sum\n";

exit 0;
