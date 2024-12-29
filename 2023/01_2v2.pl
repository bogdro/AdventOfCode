#!/usr/bin/perl

use strict;
use warnings;

my $sum = 0;
my %digits = (
	'one' => 1,
	'two' => 2,
	'three' => 3,
	'four' => 4,
	'five' => 5,
	'six' => 6,
	'seven' => 7,
	'eight' => 8,
	'nine' => 9,
);

while (<>)
{
	tr/[A-Z]/[a-z]/;
	my $first = 0;
	my $second = 0;
	my $line = $_;

	my $min_index = 10000;
	my $min_index_digit = -1;
	foreach my $k (keys %digits)
	{
		my $i = index ($_, $k);
		if ($i >= 0 && $i < $min_index)
		{
			$min_index = $i;
			$min_index_digit = $k;
		}
	}
	s/$min_index_digit/$digits{$min_index_digit}/g;
	if (/^[^0-9]*([0-9])/o)
	{
		$first = $1;
		$second = $1;
	}
	$_ = scalar reverse $line;
	my $min_index = 10000;
	my $min_index_digit = -1;
	foreach my $k (keys %digits)
	{
		my $i = index ($_, scalar reverse $k);
		if ($i >= 0 && $i < $min_index)
		{
			$min_index = $i;
			$min_index_digit = scalar reverse $k;
		}
	}
	my $rdigit = scalar reverse $min_index_digit;
	s/$min_index_digit/$digits{$rdigit}/g;
	if (/^[^0-9]*([0-9])/o)
	{
		$second = $1;
	}
	$sum += int($first)*10 + int($second);
}

print "$sum\n";

exit 0;
