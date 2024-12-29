#!/usr/bin/perl

use strict;
use warnings;

my %lines = ();
my $lineno = 0;
my $sum = 0;
my $curr_puzzle = 0;

sub min
{
	my $a = shift;
	my $b = shift;
	return ($a < $b)? $a : $b;
}

while (<>)
{
	s/[\r\n]//g;
	if (length($_) == 0 || eof())
	{
		$curr_puzzle++;
		my $got_same = 0;
		for (my $r = 0; $r < $lineno - 1; $r++)
		{
			my $is_same = 1;
			for (my $i = 0; $i <= min($r, $lineno - 1 - ($r + 1)); $i++)
			{
				if ((join '', @{$lines{$r - $i}}) ne (join '', @{$lines{$r + 1 + $i}}))
				{
					$is_same = 0;
					last;
				}
			}
			if ($is_same)
			{
				$sum += 100 * ($r + 1);
				$got_same = 1;
				last;
			}
		}
		if (! $got_same)
		{
			for (my $c = 0; $c < scalar @{$lines{$lineno - 1}} - 1; $c++)
			{
				my $is_same = 1;
				for (my $i = 0; $i <= min($c, scalar @{$lines{$lineno - 1}} - 1 - ($c + 1)); $i++)
				{
					for (my $j = 0; $j < $lineno; $j++)
					{
						$is_same = 0 unless $lines{$j}->[$c - $i] eq $lines{$j}->[$c + 1 + $i];
					}
				}
				if ($is_same)
				{
					$sum += $c + 1;
					$got_same = 1;
					last;
				}
			}
		}
		if (! $got_same)
		{
			print "NOT found for puzzle $curr_puzzle\n";
		}
		%lines = ();
		$lineno = 0;
		next;
	}
	my @parts = (split //);
	$lines{$lineno} = \@parts;
	$lineno++;
}

print "$sum\n";

exit 0;
