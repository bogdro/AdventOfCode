#!/usr/bin/perl

use strict;
use warnings;

my $got_seeds = 0;
my @seeds;
my %seed_to_soil = ();
my %soil_to_fertilizer = ();
my %fertilizer_to_water = ();
my %water_to_light = ();
my %light_to_temperature = ();
my %temperature_to_humidity = ();
my %humidity_to_location = ();

sub put_nums_in_hash
{
	my $hash = shift;
	my $c = 0;
	while (<>)
	{
		if (/(\d+)\s+(\d+)\s+(\d+)/)
		{
			$hash->{$c}{'dest_start'} = $1;
			$hash->{$c}{'src_start'} = $2;
			$hash->{$c}{'length'} = $3;
			$c++;
		}
		else
		{
			last;
		}
	}
}

SECTION: while (<>)
{
	if (/seeds:/) {
		s/seeds:\s*//;
		@seeds = /(\d+)/g;
		$got_seeds = 1
	}
	next unless $got_seeds;
	if (/seed-to-soil\s*map:/)
	{
		put_nums_in_hash \%seed_to_soil;
	}
	if (/soil-to-fertilizer\s*map:/)
	{
		put_nums_in_hash \%soil_to_fertilizer;
	}
	if (/fertilizer-to-water\s*map:/)
	{
		put_nums_in_hash \%fertilizer_to_water;
	}
	if (/water-to-light\s*map:/)
	{
		put_nums_in_hash \%water_to_light;
	}
	if (/light-to-temperature\s*map:/)
	{
		put_nums_in_hash \%light_to_temperature;
	}
	if (/temperature-to-humidity\s*map:/)
	{
		put_nums_in_hash \%temperature_to_humidity;
	}
	if (/humidity-to-location\s*map:/)
	{
		put_nums_in_hash \%humidity_to_location;
	}
}

my $min_loc = 9_999_999_999;
for my $seed (@seeds)
{
	my $soil = $seed;
	for my $s (keys %seed_to_soil)
	{
		if ($seed >= $seed_to_soil{$s}{'src_start'}
			&& $seed <= $seed_to_soil{$s}{'src_start'} + $seed_to_soil{$s}{'length'}
		)
		{
			$soil = $seed_to_soil{$s}{'dest_start'} + ($seed - $seed_to_soil{$s}{'src_start'});
		}
	}
	my $fertilizer = $soil;
	for my $s (keys %soil_to_fertilizer)
	{
		if ($soil >= $soil_to_fertilizer{$s}{'src_start'}
			&& $soil <= $soil_to_fertilizer{$s}{'src_start'} + $soil_to_fertilizer{$s}{'length'}
		)
		{
			$fertilizer = $soil_to_fertilizer{$s}{'dest_start'} + ($soil - $soil_to_fertilizer{$s}{'src_start'});
		}
	}
	my $water = $fertilizer;
	for my $s (keys %fertilizer_to_water)
	{
		if ($fertilizer >= $fertilizer_to_water{$s}{'src_start'}
			&& $fertilizer <= $fertilizer_to_water{$s}{'src_start'} + $fertilizer_to_water{$s}{'length'}
		)
		{
			$water = $fertilizer_to_water{$s}{'dest_start'} + ($fertilizer - $fertilizer_to_water{$s}{'src_start'});
		}
	}
	my $light = $water;
	for my $s (keys %water_to_light)
	{
		if ($water >= $water_to_light{$s}{'src_start'}
			&& $water <= $water_to_light{$s}{'src_start'} + $water_to_light{$s}{'length'}
		)
		{
			$light = $water_to_light{$s}{'dest_start'} + ($water - $water_to_light{$s}{'src_start'});
		}
	}
	my $temperature = $light;
	for my $s (keys %light_to_temperature)
	{
		if ($light >= $light_to_temperature{$s}{'src_start'}
			&& $light <= $light_to_temperature{$s}{'src_start'} + $light_to_temperature{$s}{'length'}
		)
		{
			$temperature = $light_to_temperature{$s}{'dest_start'} + ($light - $light_to_temperature{$s}{'src_start'});
		}
	}
	my $humidity = $temperature;
	for my $s (keys %temperature_to_humidity)
	{
		if ($temperature >= $temperature_to_humidity{$s}{'src_start'}
			&& $temperature <= $temperature_to_humidity{$s}{'src_start'} + $temperature_to_humidity{$s}{'length'}
		)
		{
			$humidity = $temperature_to_humidity{$s}{'dest_start'} + ($temperature - $temperature_to_humidity{$s}{'src_start'});
		}
	}
	my $location = $humidity;
	for my $s (keys %humidity_to_location)
	{
		if ($humidity >= $humidity_to_location{$s}{'src_start'}
			&& $humidity <= $humidity_to_location{$s}{'src_start'} + $humidity_to_location{$s}{'length'}
		)
		{
			$location = $humidity_to_location{$s}{'dest_start'} + ($humidity - $humidity_to_location{$s}{'src_start'});
		}
	}
	$min_loc = $location if $location < $min_loc;
}

print "$min_loc\n";

exit 0;
