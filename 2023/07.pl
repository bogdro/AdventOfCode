#!/usr/bin/perl

use strict;
use warnings;

my @lines;
my $sum = 0;
my %hands = ();

my %fives = ();
my %fours = ();
my %fulls = ();
my %threes = ();
my %twopairs = ();
my %onepairs = ();
my %highs = ();

my @sorted_hands = ();

while (<>)
{
	push @lines, $_;
}

for (my $l = 0; $l < @lines; $l++)
{
	my ($hand, $bid) = ($lines[$l] =~ /([^\s]+)/g);
	$hands{$l}{'cards'} = $hand;
	$hands{$l}{'bid'} = $bid;
	my @cards = split //, $hand;
	my %uniq_cards = ();
	foreach my $c (@cards)
	{
		if (! defined ($uniq_cards{$c}))
		{
			$uniq_cards{$c} = 1;
		}
		else
		{
			$uniq_cards{$c}++;
		}
	}
	my @uc = keys %uniq_cards;
	if (@uc == 1)
	{
		$fives{$l} = $hands{$l};
	}
	elsif (@uc == 5)
	{
		$highs{$l} = $hands{$l};
	}
	elsif (@uc == 4)
	{
		$onepairs{$l} = $hands{$l};
	}
	elsif (@uc == 2)
	{
		if ($uniq_cards{$uc[0]} == 4 || $uniq_cards{$uc[1]} == 4)
		{
			$fours{$l} = $hands{$l};
		}
		else
		{
			$fulls{$l} = $hands{$l};
		}
	}
	elsif (@uc == 3)
	{
		if ($uniq_cards{$uc[0]} == 3 || $uniq_cards{$uc[1]} == 3 || $uniq_cards{$uc[2]} == 3)
		{
			$threes{$l} = $hands{$l};
		}
		else
		{
			$twopairs{$l} = $hands{$l};
		}
	}
}

my %card_values =
(
	'A' => 14,
	'K' => 13,
	'Q' => 12,
	'J' => 11,
	'T' => 10,
	'9' => 9,
	'8' => 8,
	'7' => 7,
	'6' => 6,
	'5' => 5,
	'4' => 4,
	'3' => 3,
	'2' => 2,
);

sub is_card_greater($$)
{
	my $a = shift;
	my $b = shift;
	return ($card_values{$a} > $card_values{$b})? 1 : 0;
}

sub is_hand_greater($$)
{
	my $a = shift;
	my $b = shift;
	my @a_cards = split //, %{$a}{'cards'};
	my @b_cards = split //, %{$b}{'cards'};
	for (my $c = 0; $c < 5; $c++)
	{
		if (is_card_greater ($a_cards[$c], $b_cards[$c]))
		{
			return 1;
		}
		elsif (is_card_greater ($b_cards[$c], $a_cards[$c]))
		{
			return -1;
		}
	}
	return 0;
}

sub add_hash_to_sorted
{
	my $set = shift;
	my @curr_keys = keys %{$set};
	if (@curr_keys > 0)
	{
		my @curr_sorted_hands = ();
		for (my $k = 0; $k < @curr_keys; $k++)
		{
			push @curr_sorted_hands, $hands{$curr_keys[$k]};
		}
		push @sorted_hands, (sort is_hand_greater @curr_sorted_hands);
	}
}

add_hash_to_sorted \%highs;
add_hash_to_sorted \%onepairs;
add_hash_to_sorted \%twopairs;
add_hash_to_sorted \%threes;
add_hash_to_sorted \%fulls;
add_hash_to_sorted \%fours;
add_hash_to_sorted \%fives;

for (my $i = 0; $i < @sorted_hands; $i++)
{
	$sum += ($i + 1) * $sorted_hands[$i]{'bid'};
}

print "$sum\n";

exit 0;
