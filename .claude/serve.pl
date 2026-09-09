#!/usr/bin/env perl
# Minimal static file server. Perl core only - no Node, no Python, no installs.
# Usage: perl .claude/serve.pl [port] [docroot]
use strict; use warnings;
use IO::Socket::INET;

my $port = shift // 8080;
my $root = shift // '.';
my %mime = (
  html=>'text/html; charset=utf-8', css=>'text/css; charset=utf-8',
  js=>'application/javascript; charset=utf-8', json=>'application/json',
  png=>'image/png', jpg=>'image/jpeg', jpeg=>'image/jpeg', gif=>'image/gif',
  svg=>'image/svg+xml', webp=>'image/webp', ico=>'image/x-icon',
  mp4=>'video/mp4', webm=>'video/webm', woff2=>'font/woff2', txt=>'text/plain',
);

my $srv = IO::Socket::INET->new(
  LocalAddr=>'0.0.0.0', LocalPort=>$port, Listen=>50, ReuseAddr=>1, Proto=>'tcp'
) or die "cannot bind port $port: $!\n";
$| = 1;
print "serving '$root' at http://127.0.0.1:$port/ (also reachable on your LAN IP)\n";

sub slurp { my $p=shift; open(my $fh,'<:raw',$p) or return; local $/; my $d=<$fh>; close $fh; return $d }

while (my $c = $srv->accept) {
  my $req = <$c>;
  unless (defined $req) { close $c; next }
  while (defined(my $l = <$c>)) { last if $l =~ /^\r?\n$/ }   # drain headers

  if ($req =~ m{^GET\s+(\S+)\s+HTTP}) {
    my $path = $1;
    $path =~ s/\?.*//;
    $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge;
    $path =~ s{\.\.+}{}g;                              # no traversal
    $path = '/' if $path eq '';
    my $file = $root . $path;
    $file =~ s{/+$}{};
    $file = "$file/index.html" if -d $file or $path eq '/';
    my $body = -f $file ? slurp($file) : undef;

    if (defined $body) {
      my ($ext) = lc($file) =~ /\.([a-z0-9]+)$/;
      my $type = $mime{$ext // ''} // 'application/octet-stream';
      print $c "HTTP/1.1 200 OK\r\nContent-Type: $type\r\n"
             . "Content-Length: " . length($body) . "\r\n"
             . "Cache-Control: no-store\r\nConnection: close\r\n\r\n";
      print $c $body;
      print "200 $path\n";
    } else {
      my $nf = (-f "$root/404.html") ? slurp("$root/404.html") : "404 Not Found";
      print $c "HTTP/1.1 404 Not Found\r\nContent-Type: text/html; charset=utf-8\r\n"
             . "Content-Length: " . length($nf) . "\r\nConnection: close\r\n\r\n$nf";
      print "404 $path\n";
    }
  }
  close $c;
}
