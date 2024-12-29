#!/usr/bin/perl

use strict;
use warnings;

my @cmds = ();

while (<>)
{
	s/[\r\n]//g;
	@cmds = (split /,/);
	last;
}

sub hash
{
	my $p = shift;
	my @chars = (split //, $p);
	my $sum = 0;
	foreach my $c (@chars)
	{
		$sum += ord($c);
		$sum *= 17;
		$sum %= 256;
	}
	return $sum;
}

my $tsum = 0;
foreach my $cmd (@cmds)
{
	$tsum += hash $cmd;
}

print "$tsum\n";

exit 0;
