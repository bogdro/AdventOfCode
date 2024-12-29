#!/usr/bin/perl

use strict;
use warnings;

my %flows = ();
my $sum = 0;
my $got_flows = 0;

PART:
while (<>)
{
	s/[\r\n]//g;
	if (/(\w+)\{([^}]+)\}/)
	{
		my $rulename = $1;
		my $rulestr = $2;
		$flows{$rulename} = ();
		$flows{$rulename}{'r'} = ();
		my $rno = 0;
		my @rules = (split /,/, $rulestr);
		foreach my $r (@rules)
		{
			if ($r =~ /([xmas])([<>])(\d+):(\w+)/)
			{
				$flows{$rulename}{'r'}{$rno} = ();
				$flows{$rulename}{'r'}{$rno}{'prop'} = $1;
				$flows{$rulename}{'r'}{$rno}{'op'} = $2;
				$flows{$rulename}{'r'}{$rno}{'val'} = $3;
				$flows{$rulename}{'r'}{$rno}{'rule'} = $4;
				$rno++;
			}
			elsif ($r =~ /(\w+)/)
			{
				$flows{$rulename}{'fall'} = $1;
			}
		}
	}
	$got_flows = 1 if $_ eq '';
	next unless $got_flows;

	if (/\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}/)
	{
		my %part = ();
		$part{'x'} = $1;
		$part{'m'} = $2;
		$part{'a'} = $3;
		$part{'s'} = $4;
		my $curr_flow = 'in';
		FLOW:
		while (1)
		{
			my $got_rule = 0;
			for (my $r = 0; $r < scalar(keys %{$flows{$curr_flow}{'r'}}); $r++)
			{
				if ($flows{$curr_flow}{'r'}{$r}{'op'} eq '<'
					&& $part{$flows{$curr_flow}{'r'}{$r}{'prop'}} < $flows{$curr_flow}{'r'}{$r}{'val'})
				{
					$got_rule = 1;
					$curr_flow = $flows{$curr_flow}{'r'}{$r}{'rule'};
					if ($curr_flow eq 'A')
					{
						$sum += $part{'x'} + $part{'m'} + $part{'a'} + $part{'s'};
						next PART;
					}
					elsif ($curr_flow eq 'R')
					{
						next PART;
					}
					else
					{
						next FLOW;
					}
				}
				elsif ($flows{$curr_flow}{'r'}{$r}{'op'} eq '>'
					&& $part{$flows{$curr_flow}{'r'}{$r}{'prop'}} > $flows{$curr_flow}{'r'}{$r}{'val'})
				{
					$got_rule = 1;
					$curr_flow = $flows{$curr_flow}{'r'}{$r}{'rule'};
					if ($curr_flow eq 'A')
					{
						$sum += $part{'x'} + $part{'m'} + $part{'a'} + $part{'s'};
						next PART;
					}
					elsif ($curr_flow eq 'R')
					{
						next PART;
					}
					else
					{
						next FLOW;
					}
				}
			}
			if (! $got_rule)
			{
				$curr_flow = $flows{$curr_flow}{'fall'};
				if ($curr_flow eq 'A')
				{
					$sum += $part{'x'} + $part{'m'} + $part{'a'} + $part{'s'};
					next PART;
				}
				elsif ($curr_flow eq 'R')
				{
					next PART;
				}
				else
				{
					next FLOW;
				}
			}
			last;
		}
	}
}

print "$sum\n";

exit 0;
