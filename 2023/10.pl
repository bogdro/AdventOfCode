#!/usr/bin/perl

use strict;
use warnings;

my @lines = ();
my $nsteps = 0;

while (<>)
{
	s/[\r\n]//g;
	my @line = (split //);
	push @lines, \@line;
}

my @start_pos;
START:
for (my $i = 0; $i < @lines; $i++)
{
	for (my $j = 0; $j < scalar(@{$lines[$i]}); $j++)
	{
		if ($lines[$i]->[$j] eq 'S')
		{
			@start_pos = ($i, $j);
			last START;
		}
	}
}
my @curr_pos = @start_pos;
my @prev_pos = @curr_pos;
my $prev_dir = '';
my $curr_char = 'S';
# while (1)
{
	if ($curr_pos[0] > 0
		&& ($lines[$curr_pos[0] - 1]->[$curr_pos[1]] eq 'F'
		|| $lines[$curr_pos[0] - 1]->[$curr_pos[1]] eq '|'
		|| $lines[$curr_pos[0] - 1]->[$curr_pos[1]] eq '7'	
		)
		&& ($curr_pos[0] - 1 != $prev_pos[0]
		|| $curr_pos[1] != $prev_pos[1])
	)
	{
		@curr_pos = ($curr_pos[0] - 1, $curr_pos[1]);
		$prev_dir = 'd';
		$curr_char = $lines[$curr_pos[0] - 1]->[$curr_pos[1]];
		$nsteps++;
	}
	elsif ($curr_pos[1] > 0
		&& ($lines[$curr_pos[0]]->[$curr_pos[1] - 1] eq 'F'
		|| $lines[$curr_pos[0]]->[$curr_pos[1] - 1] eq '-'
		|| $lines[$curr_pos[0]]->[$curr_pos[1] - 1] eq 'L'	
		)
		&& ($curr_pos[0] != $prev_pos[0]
		|| $curr_pos[1] - 1 != $prev_pos[1])
	)
	{
		@curr_pos = ($curr_pos[0], $curr_pos[1] - 1);
		$prev_dir = 'r';
		$curr_char = $lines[$curr_pos[0] - 1]->[$curr_pos[1]];
		$nsteps++;
	}
	elsif ($curr_pos[0] < @lines - 1
		&& ($lines[$curr_pos[0]]->[$curr_pos[1]] eq 'J'
		|| $lines[$curr_pos[0] + 1]->[$curr_pos[1]] eq '|'
		|| $lines[$curr_pos[0] + 1]->[$curr_pos[1]] eq 'L'	
		)
		&& ($curr_pos[0] + 1 != $prev_pos[0]
		|| $curr_pos[1] != $prev_pos[1])
	)
	{
		@curr_pos = ($curr_pos[0] + 1, $curr_pos[1]);
		$prev_dir = 'u';
		$curr_char = $lines[$curr_pos[0] - 1]->[$curr_pos[1]];
		$nsteps++;
	}
	elsif ($curr_pos[1] < scalar(@{$lines[$curr_pos[0]]})
		&& ($lines[$curr_pos[0]]->[$curr_pos[1] + 1] eq 'J'
		|| $lines[$curr_pos[0]]->[$curr_pos[1] + 1] eq '-'
		|| $lines[$curr_pos[0]]->[$curr_pos[1] + 1] eq '7'	
		)
		&& ($curr_pos[0] != $prev_pos[0]
		|| $curr_pos[1] + 1 != $prev_pos[1])
	)
	{
		@curr_pos = ($curr_pos[0], $curr_pos[1] + 1);
		$prev_dir = 'l';
		$curr_char = $lines[$curr_pos[0] - 1]->[$curr_pos[1]];
		$nsteps++;
	}
	last if $lines[$curr_pos[0]]->[$curr_pos[1]] eq 'S';
	@prev_pos = @curr_pos;
}

while (1)
{
	if ($prev_dir eq 'd')
	{
		if ($curr_char eq 'F')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] + 1);
			$prev_dir = 'l';
			$nsteps++;
		}
		elsif ($curr_char eq '|')
		{
			@curr_pos = ($curr_pos[0] - 1, $curr_pos[1]);
			$prev_dir = 'd';
			$nsteps++;
		}
		elsif ($curr_char eq '7')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] - 1);
			$prev_dir = 'r';
			$nsteps++;
		}
	}
	elsif ($prev_dir eq 'r')
	{
		if ($curr_char eq 'F')
		{
			@curr_pos = ($curr_pos[0] + 1, $curr_pos[1]);
			$prev_dir = 'u';
			$nsteps++;
		}
		elsif ($curr_char eq '-')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] - 1);
			$prev_dir = 'r';
			$nsteps++;
		}
		elsif ($curr_char eq 'L')
		{
			@curr_pos = ($curr_pos[0] - 1, $curr_pos[1]);
			$prev_dir = 'd';
			$nsteps++;
		}
	}
	elsif ($prev_dir eq 'u')
	{
		if ($curr_char eq 'J')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] - 1);
			$prev_dir = 'r';
			$nsteps++;
		}
		elsif ($curr_char eq '|')
		{
			@curr_pos = ($curr_pos[0] + 1, $curr_pos[1]);
			$prev_dir = 'u';
			$nsteps++;
		}
		elsif ($curr_char eq 'L')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] + 1);
			$prev_dir = 'l';
			$nsteps++;
		}
	}
	elsif ($prev_dir eq 'l')
	{
		if ($curr_char eq 'J')
		{
			@curr_pos = ($curr_pos[0] - 1, $curr_pos[1]);
			$prev_dir = 'd';
			$nsteps++;
		}
		elsif ($curr_char eq '-')
		{
			@curr_pos = ($curr_pos[0], $curr_pos[1] + 1);
			$prev_dir = 'l';
			$nsteps++;
		}
		elsif ($curr_char eq '7')
		{
			@curr_pos = ($curr_pos[0] + 1, $curr_pos[1]);
			$prev_dir = 'u';
			$nsteps++;
		}
	}
	$curr_char = $lines[$curr_pos[0]]->[$curr_pos[1]];
	last if $lines[$curr_pos[0]]->[$curr_pos[1]] eq 'S';
}

print "$nsteps\n";

exit 0;
