#!/usr/bin/perl

use strict;
use warnings;

my @lines = ();
my $sum = 0;

while (<>)
{
	s/[\r\n]//g;
	my @line = (split //);
	push @lines, \@line;
}


my $iter = 0;
while ($iter < 64)
{
	my @all = ();
	for (my $l = 0; $l < @lines; $l++)
	{
		my @a = @{$lines[$l]};
		push @all, \@a;
	}
	for (my $l = 0; $l < @lines; $l++)
	{
		for (my $c = 0; $c < @{$lines[$l]}; $c++)
		{
			if ($lines[$l][$c] eq 'O' || $lines[$l][$c] eq 'S')
			{
				if ($l > 0 && $lines[$l - 1][$c] ne '#')
				{
					$all[$l - 1][$c] = 'O';
				}
				if ($l < @lines - 1 && $lines[$l + 1][$c] ne '#')
				{
					$all[$l + 1][$c] = 'O';
				}
				if ($c > 0 && $lines[$l][$c - 1] ne '#')
				{
					$all[$l][$c - 1] = 'O';
				}
				if ($c < @{$lines[$l]} - 1 && $lines[$l][$c + 1] ne '#')
				{
					$all[$l][$c + 1] = 'O';
				}
				$all[$l][$c] = '.';
			}
		}
	}
	@lines = @all;
	$iter++;
}
for (my $l = 0; $l < @lines; $l++)
{
	for (my $c = 0; $c < @{$lines[$l]}; $c++)
	{
		$sum++ if $lines[$l][$c] eq 'O';
	}
}
print "$sum\n";

exit 0;
