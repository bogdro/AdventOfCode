#!/usr/bin/perl

use strict;
use warnings;

my @lines;
my $sum = 0;

while (<>)
{
	push @lines, $_;
}

for (my $i = 0; $i < scalar @lines; $i++)
{
	my $l = $lines[$i];
	$l =~ s/[\r\n]//g;
	my @nums = ($l =~ /(\d+)/g);
	my @larr = split //, $lines[$i];
	NUM: foreach my $n (@nums)
	{
		my $pos = index ($l, $n);
		if ($pos > 0)
		{
			if ($larr[$pos - 1] ne '.' )
			{
				goto add;
			}
		}
		if ($pos + length($n) < length($l))
		{
			if ($larr[$pos + length($n)] ne '.' )
			{
				goto add;
			}
		}
		if ($i > 0)
		{
			$lines[$i - 1] =~ s/[\r\n]//g;
			my @larr = split //, $lines[$i - 1];
			if ($pos > 0)
			{
				if ($larr[$pos - 1] ne '.' )
				{
					goto add;
				}
			}
			for (my $j = 0; $j < length($n); $j++)
			{
				if ($larr[$pos + $j] ne '.' )
				{
					goto add;
				}
			}
			if ($pos + length($n) < length($lines[$i - 1]))
			{
				if ($larr[$pos + length($n)] ne '.' )
				{
					goto add;
				}
			}
		}
		if ($i < (scalar @lines) - 1)
		{
			$lines[$i + 1] =~ s/[\r\n]//g;
			my @larr = split //, $lines[$i + 1];
			if ($pos > 0)
			{
				if ($larr[$pos - 1] ne '.' )
				{
					goto add;
				}
			}
			for (my $j = 0; $j < length($n); $j++)
			{
				if ($larr[$pos + $j] ne '.' )
				{
					goto add;
				}
			}
			if ($pos + length($n) < length($lines[$i + 1]))
			{
				if ($larr[$pos + length($n)] ne '.' )
				{
					goto add;
				}
			}
		}
		next NUM;

		add:
		$sum += $n;
		$l =~ s/$n/./ if length("$n") == 1;
		$l =~ s/$n/../ if length("$n") == 2;
		$l =~ s/$n/.../ if length("$n") == 3;
	}
}

print "$sum\n";

exit 0;
