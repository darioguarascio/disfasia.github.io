---
layout: simple
style: two_words
title: Cloudflare Failover
category: how-to
languages: [en]
permalink: cloudflare-failover
---

## The problem
[Cloudflare] is a great service.
For those who don't know it, Cloudflare is a huge world-wide infrastructure that stays between a website and the whole Internet, offering a number of services, from CDN to DDoS protection, from assets minification to serving static version of a website's pages in case of unavailability and many mores.

Cloudflare actually lacks an important feature in case its DNS is used in round robin: If one of the IPs in the pool becomes unavailable, Cloudflare will keep trying to use it because it has no way to detect the health status of a single ip.


## Practical case

Let's take the case of a load balanced website who has 2 frontend servers. Before using Cloudflare, it will look like:

{% highlight bash %}
$ host mywebsite.com
mywebsite.com has address 10.0.0.1
mywebsite.com has address 10.0.0.2
{% endhighlight %}


In this configuration, traffic will be split in round-robin mode between the 2 ip addresses. A very easy first step for a High-Avaliability environment.

Switching to Cloudflare results in a change of the NameServer and, depending on the activation of Cloudlflare itself on the hostname, in different IPs. 

{% highlight bash %}
$ dig +trace mywebsite.com
mywebsite.com.     172800  IN  NS  dawn.ns.cloudflare.com.
mywebsite.com.     172800  IN  NS  ivan.ns.cloudflare.com.

$ host mywebsite.com
mywebsite.com has address 108.162.197.232 # CloudFlare IP
mywebsite.com has address 108.162.196.232 # CloudFlare IP
{% endhighlight %}

At this point, Cloudflare is the NameServer of *mywebsite.com* as well as its reverse proxy.

## CloudFlare DNS Managment via Laravel


Using [laravel], *artisan* and [cloudflare failover] command it's possible to manage domain's ips

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com
mywebsite.com has 10.0.0.1 # Original IP, from CloudFlare API
mywebsite.com has 10.0.0.2 # Original IP, from CloudFlare API

$ php artisan cloudflare:failover mywebsite.com add 10.0.0.3
Ip 10.0.0.3 added to mywebsite.com

$ php artisan cloudflare:failover mywebsite.com delete 10.0.0.1
Ip 10.0.0.1 deleted from mywebsite.com

$ php artisan cloudflare:failover mywebsite.com list
mywebsite.com has 10.0.0.3
mywebsite.com has 10.0.0.2
{% endhighlight %}


## Failover

[Cloudflare failover] command offers also an easy way to automatically check and remove dead IPs from a host pool, as well as re-add ips previously removed and returned alive.

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com check --checkIp 10.0.0.1
[info] Start checking ip: 10.0.0.1 using default
[debug] Running defaultCheck(10.0.0.1) => TRUE
{% endhighlight %}

The command above perform a health check using _default_ checker, that gives a positive response. Let's try with a negative one

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com check --checkMethod false --checkIp 10.0.0.1 --fails 2
[info] Start checking ip: 10.0.0.1 using false
[debug] Running randomCheck(10.0.0.1) => FALSE
[warning] Check for ip 10.0.0.1 failed 1 times
{% endhighlight %}

Using the `--fails 2` option we set the fail times threshold, the amout of tolerable times the check can fail before performing any action. 

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com check --checkMethod false --checkIp 10.0.0.1 --fails 2
[info] Start checking ip: 10.0.0.1 using false
[debug] Running randomCheck(10.0.0.1) => FALSE
[warning] Check for ip 10.0.0.1 failed 2 times

$ php artisan cloudflare:failover mywebsite.com check --checkMethod false --checkIp 10.0.0.1 --fails 2
[info] Start checking ip: 10.0.0.1 using false
[debug] Running randomCheck(10.0.0.1) => FALSE
[warning] Check for ip 10.0.0.1 failed 3 times
[alert] Ip 10.0.0.1 fails passed the threshold, removing from CloudFlare pool
[debug] Ip 10.0.0.1 deleted from mywebsite.com
{% endhighlight %}

After the threshold is passed, the unhealthy IP is removed from Cloudflare domain pool. Running the same check again will result in:

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com check --checkMethod false --checkIp 10.0.0.1 --fails 2
[info] Start checking ip: 10.0.0.1 using false
[debug] Running randomCheck(10.0.0.1) => FALSE
[warning] Check for ip 10.0.0.1 failed 9 times
[critical] Ip 10.0.0.1 still removed from the pool after 9 checks
{% endhighlight %}

Now, let's get back to a positive health check, using the default checker. 

{% highlight bash %}
$ php artisan cloudflare:failover mywebsite.com check --checkIp 10.0.0.1 --fails 2
[info] Start checking ip: 10.0.0.1 using default
[debug] Running defaultCheck(10.0.0.1) => TRUE
[notice] Check for ip 10.0.0.1 returned OK after 9 checks.
[alert] Adding 10.0.0.1 to mywebsite.com pool...
[debug] Ip 10.0.0.1 added to mywebsite.com
{% endhighlight %}

The returned-alive IP is added again to Cloudflare domain pool.


## Who checks the checker?

Where should these checks be performed ? Imagine this little script is run on a single machine that checks for the 2 frontend servers, and this machine fails. In this condition, there will be no health check, returning to the initial situation of inhability to avoid a dead ip in Cloudflare round-robin.

An ideal setup would be having each of the frontends to check the others, in this case having:

{% highlight bash %}
#Machine 10.0.0.1 checking for 10.0.0.2 
user@10.0.0.1$ php artisan cloudflare:failover mywebsite.com check --checkIp 10.0.0.2 --fails 2

#Machine 10.0.0.2 checking for 10.0.0.1
user@10.0.0.2$ php artisan cloudflare:failover mywebsite.com check --checkIp 10.0.0.1 --fails 2
{% endhighlight %}

running on a time basis (perhaps cron every 5mins ?)


## Conclusion
This is a pragmatic and easy approach to solve the main issue regarding round-robin dns on Cloudflare, thanks to the fact that Cloudflare recognizes almost immediately any change regarding IPs associated to a domain.



[cloudflare]:https://www.cloudflare.com
[laravel]:http://laravel.com
[cloudflare failover]:https://gist.github.com/disfasia/21e7c188b467154e013b