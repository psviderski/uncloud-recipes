# a simple Flexget deploy

This deploys a single instance of https://flexget.com/
It uses a combination of local directories (for configuration mostly. In my personal setup these are on a cephfs drive that all uncloud vms have access to). You can adjust these to whatever you want.


# how to deploy
  1. Copy compose.yaml to where you are deploying from
  2. Adjust x-ports entry to reflect your domain/setup
  3. Adjust tz environment entry to reflect your timezone
  4. Adjust volumes to reflectyour personal setup
  5. adjust x-machines to reflect where you want this to possibly deploy to or remove entries to expose whole context to possibly be deployed to.
  6. uc deploy the yaml file
     
