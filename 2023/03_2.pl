#!/usr/bin/perl

use strict;
use warnings;

my @lines;
my $sum = 0;

while (<>)
{
	push @lines, $_;
}

sub max
{
	my $a = shift;
	my $b = shift;
	return ($a > $b)? $a : $b;
}

sub min
{
	my $a = shift;
	my $b = shift;
	return ($a < $b)? $a : $b;
}

for (my $i = 0; $i < scalar @lines; $i++)
{
	my $l = $lines[$i];
	next unless $l =~ /\*/o;
	$l =~ s/[\r\n]//g;
	my @stars = ($l =~ /(\*)/g);
	my @larr = split //, $lines[$i];
	my @adjanced = ();
	NUM: foreach my $n (@stars)
	{
		@adjanced = ();
		my $pos = index ($l, $n);
		if ($pos > 0)
		{
			if ($pos > 0 && $larr[$pos - 1] ne '.')
			{
				my @nums = (substr($l, max($pos-4, 0), 4) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
			if ($pos < length($lines[$i]) && $larr[$pos + 1] ne '.')
			{
				my @nums = (substr($l, $pos, 4) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
		}
		if ($i > 0)
		{
			$lines[$i - 1] =~ s/[\r\n]//g;
			my @larr = split //, $lines[$i - 1];
			if ($larr[$pos] eq '.'
				&& ($pos > 0 && $larr[$pos - 1] ne '.'))
			{
				my $il = 1;
				while ($pos - $il >= 0 && $larr[$pos - $il] =~ /\d/)
				{
					$il++;
				}
				my @nums = (substr($lines[$i - 1], $pos - $il + 1, $il) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
			if ($larr[$pos] eq '.'
				&& ($pos < length($lines[$i - 1]) && $larr[$pos + 1] ne '.'))
			{
				my $jl = 1;
				while ($pos + $jl < length($lines[$i - 1]) && $larr[$pos + $jl] =~ /\d/)
				{
					$jl++;
				}
				my @nums = (substr($lines[$i - 1], $pos + 1, $jl) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
			if ($larr[$pos] =~ /\d/)
			{
				my $il = 0;
				my $jl = 0;
				while ($pos - $il >= 0 && $larr[$pos - $il] =~ /\d/)
				{
					$il++;
				}
				while ($pos + $jl < length($lines[$i - 1]) && $larr[$pos + $jl] =~ /\d/)
				{
					$jl++;
				}
				push @adjanced, @nums;
			}
		}
		if ($i < (scalar @lines) - 1)
		{
			$lines[$i + 1] =~ s/[\r\n]//g;
			my @larr = split //, $lines[$i + 1];
			if ($larr[$pos] eq '.'
				&& ($pos > 0 && $larr[$pos - 1] ne '.'))
			{
				my $il = 1;
				while ($pos - $il >= 0 && $larr[$pos - $il] =~ /\d/)
				{
					$il++;
				}
				my @nums = (substr($lines[$i + 1], $pos - $il + 1, $il) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
			if ($larr[$pos] eq '.'
				&& ($pos < length($lines[$i + 1]) && $larr[$pos + 1] ne '.'))
			{
				my $jl = 1;
				while ($pos + $jl < length($lines[$i + 1]) && $larr[$pos + $jl] =~ /\d/)
				{
					$jl++;
				}
				my @nums = (substr($lines[$i + 1], $pos + 1, $jl) =~ /(\d+)/g);
				push @adjanced, @nums;
			}
			if ($larr[$pos] =~ /\d/)
			{
				my $il = 0;
				my $jl = 0;
				while ($pos - $il >= 0 && $larr[$pos - $il] =~ /\d/)
				{
					$il++;
				}
				while ($pos + $jl < length($lines[$i + 1]) && $larr[$pos + $jl] =~ /\d/)
				{
					$jl++;
				}
				push @adjanced, @nums;
			}
		}
		$l =~ s/\*/./;
		next NUM unless scalar @adjanced == 2;

		$sum += $adjanced[0] * $adjanced[1];
	}
}

print "$sum\n";

exit 0;
