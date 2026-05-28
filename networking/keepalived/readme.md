# How to setup keepalived just as badly as I did
This walks you through how to make all the same mistakes I did setting up keepalived. Keepalived lets you setup a virtual ip address for multiple hosts to respond to. I use this to get around the lack of tcp/udp streaming in caddy so i can open up ports on uncloud hosts and, through some clever abuse of bash scripting and docker, have the node with my container with exposed host ports be the one to respond to the virtual ip.


1. Install keepalived. on ubuntu an apt-get install keepalived got the job done.
2. Create the keepalived.conf on each node you installed keepalived on. You need to change the ip addresses on each node to reflect the correct peers. The example conf contemplates 3 nodes with 2 virtual ip instances for 2 different services
3. Create the check scripts and ensure they are available on each node in the spot specified int he keepalived.conf files. Probably figure out how to do this correctly and don't disable script security or run them as root despite the example doing this.
4. check systemctl status keepalived to see what is going on. use systemctl restart keepalived , systemctl enable keepalived, systemctl start keepalived as neeeded to get it up and running. Check the logs with journalct -u keepalived to get error logs possibly explaining how you chuffed it.
 
