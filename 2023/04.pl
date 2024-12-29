#!/usr/bin/perl

use strict;
use warnings;

my $sum = 0;

while (<>)
{
	s/Card\s+\d+://;
	my @parts = split /\|/, $_;
	my @winning_num = ($parts[0] =~ /(\d+)/g);
	my @my_num = ($parts[1] =~ /(\d+)/g);
	my $card_sum = 0;
	MY: foreach my $mn (@my_num)
	{
		foreach my $wn (@winning_num)
		{
			if ($mn == $wn)
			{
				if ($card_sum == 0)
				{
					$card_sum = 1;
				}
				else
				{
					$card_sum *= 2;
				}
			}
		}
	}
	$sum += $card_sum;
}

print "$sum\n";

exit 0;
