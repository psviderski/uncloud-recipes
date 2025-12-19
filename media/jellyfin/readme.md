# a simple Jellyfin deploy

This deploys a single instance of https://flexget.com/
It uses a combination of local directories (for configuration mostly. In my personal setup these are on a cephfs drive that all unclone vms have access to) and nfs shares (for large data comign from my nas in my personal setup). You can adjust these to whatever you want.


# how to deploy
  1. Copy compose.yaml to where you are deploying from
  2. Adjust user: uid.gid to reflect your setup (i.e. if you are mounting nfs volumes and need to have specific uid/gid to get access, among other possible reasons. You may not need this)
  3. Adjust devices to reflect your personal gpu hardware or comment it out if you aren't using any hardware transcoding. jellyfin has docs on this here: https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/
  4. Adjust x-ports entry to reflect your domain/setup
  5. Adjust tz environment entry to reflect your timezone
  6. Adjust volumes to reflect your personal setup. There are two defined nfs mount volumes in this compose file for illustrative purposes. Please change/delete/comment out to suite your personal setup.
  7. adjust x-machines to reflect where you want this to possibly deploy to or remove entries to expose whole context to possibly be deployed to.
  8. uc deploy the yaml file
     
