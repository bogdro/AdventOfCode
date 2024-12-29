#!/usr/bin/perl

use strict;
use warnings;

my @seq;
my %moves = ();
my $nsteps = 0;

while (<>)
{
	s/[\r\n]//g;
	@seq = (split //, $_) unless @seq;
	if (/(\w+)\s*=\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/)
	{
		$moves{$1}{'L'} = $2;
		$moves{$1}{'R'} = $3;
	}
}

my $curr_pos = 'AAA';
do
{
	$curr_pos = $moves{$curr_pos}{$seq[$nsteps % @seq]};
	$nsteps++;
} while ($curr_pos ne 'ZZZ');

print "$nsteps\n";

exit 0;
