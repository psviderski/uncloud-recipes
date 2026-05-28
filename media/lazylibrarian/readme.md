# a simple lazylibrarian deploy

This deploys a single instance of https://gitlab.com/LazyLibrarian/LazyLibrarian
It uses a combination of local directories (for configuration mostly. In my personal setup these are on a cephfs drive that all uncloud vms have access to) and nfs shares (for large data coming from my nas in my personal setup). You can adjust these to whatever you want.


# how to deploy
  1. Copy compose.yaml to where you are deploying from
  2. Adjust PGID: and PUID: to reflect your setup (i.e. if you are mounting nfs volumes and need to have specific uid/gid to get access, among other possible reasons. You may not need this)
  3. Adjust x-ports entry to reflect your domain/setup
  4. Adjust tz environment entry to reflect your timezone
  5. Adjust volumes to reflect your personal setup. There are two defined nfs mount volumes in this compose file for illustrative purposes. Please change/delete/comment out to suite your personal setup.
  6. adjust x-machines to reflect where you want this to possibly deploy to or remove entries to expose whole context to possibly be deployed to.
  7. uc deploy the yaml file
     
