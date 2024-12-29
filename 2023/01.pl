#!/usr/bin/perl

use strict;
use warnings;

my $sum = 0;

while (<>)
{
	if (/^[^0-9]*([0-9]).*([0-9])[^0-9]*$/)
	{
		$sum += int($1)*10 + int($2);
	}
	elsif (/^[^0-9]*([0-9])[^0-9]*$/)
	{
		$sum += $1 * 11;
	}
}

print "$sum\n";

exit 0;
