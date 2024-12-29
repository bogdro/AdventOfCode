#!/usr/bin/perl

use strict;
use warnings;

my %values = ();

my $lineno = 1;
while (<>)
{
	s/[\r\n]//g;
	my @orig_val = /(-?\d+)/g;
	$values{$lineno}{0} = \@orig_val;
	my $curr_sublist = 1;
	while (1)
	{
		my @new_val = ();
		for (my $i = 1; $i < @{$values{$lineno}{$curr_sublist - 1}}; $i++)
		{
			push @new_val, $values{$lineno}{$curr_sublist - 1}->[$i] - $values{$lineno}{$curr_sublist - 1}->[$i - 1];
		}
		$values{$lineno}{$curr_sublist} = \@new_val;
		$curr_sublist++;
		my $got_non_zero = 0;
		foreach my $v (@new_val)
		{
			$got_non_zero = 1 if $v != 0;
		}
		if (! $got_non_zero)
		{
			push @{$values{$lineno}{$curr_sublist}}, 0;
			$curr_sublist--;
			while ($curr_sublist >= 0)
			{
				push @{$values{$lineno}{$curr_sublist}},
					$values{$lineno}{$curr_sublist}->[@{$values{$lineno}{$curr_sublist}} - 1]
					+ $values{$lineno}{$curr_sublist + 1}->[@{$values{$lineno}{$curr_sublist + 1}} - 1];
				$curr_sublist--;
			}
			last;
		}
	}
	$lineno++;
}

my $sum = 0;
for my $v (keys %values)
{
	$sum += $values{$v}{0}[@{$values{$v}{0}} - 1];
}
print "$sum\n";

exit 0;
