#!/usr/bin/perl

use strict;
use warnings;

my @lines;
my $sum = 0;
my @final_cards = ();
my @copies = ();
my %counts = ();

my $ln = 0;
while (<>)
{
	s/Card\s+\d+://;
 	push @lines, $_;
	$counts{$ln} = 1;
	$ln++;
}

for (my $lc = 0; $lc < scalar @lines; $lc++)
{
	my $l = $lines[$lc];
	push @final_cards, $l;
	my @parts = split /\|/, $l;
	my @winning_num = ($parts[0] =~ /(\d+)/g);
	my @my_num = ($parts[1] =~ /(\d+)/g);
	my $card_match_count = 0;
	MY: foreach my $mn (@my_num)
	{
		foreach my $wn (@winning_num)
		{
			if ($mn == $wn)
			{
				$card_match_count++;
			}
		}
	}
	for (my $c = 0; $c < $counts{$lc}; $c++)
	{
		for (my $i = 0; $i < $card_match_count; $i++)
		{
			$counts{$lc + $i + 1}++;
		}
	}
}

foreach my $ln (keys %counts)
{
	$sum += $counts{$ln};
}

print "$sum\n";

exit 0;
