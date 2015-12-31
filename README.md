# :hamburger: [goontube](https://goontu.be/)

![Travis CI build status](https://travis-ci.org/goontube/goontube.svg?branch=master)

Video synchronization and chat lounge.  

Much needed overhaul + rewrite as an ES6 webapp with React + Redux.  

###Dev Notes###

I didn't leave this quite ready but I'll make sure it's an easy workflow.  I had to run at the end of the evening we got this chat and repo started.  Missing dependency for immutable is all in the case of that error, I forgot to --save one dep.  We can use github's Issue tracker rather than working out of here (Slack is cool too) for project-related convos. 

Ok. :) Will use issue tracker from now on; never used it.

### Roadmap

####**Project Management**####
- [ ] Set up dev server.
- [ ] Discuss deployment/build process.
- [ ] Discuss project structure/file organization.

####**Bug Fixes:**####
- [ ] Repair fullscreen mode.
- [ ] $permissions definitely needs to have an alias, $privilege
- [ ] “fix video” button skips screen to top, making it hard to click in a row multiple times, change this if non-breaking.
- [ ] “power button” gets real buggy after “turning it back on”, ie video players wont properly reinsert, retoggling power might not work, etc.
- [ ] preloading goontube, from typing in go- in like chrome for example, triggers multiple logins and kicks a user. considering how common typing go- into a nav bar is this is non trivial. possible solution is to remove restriction on simultaneous logins.
- [ ] Fix non-autoplaying videos
  - 2015DEC06 - Vimeo switched to HTML5 player.
    - Users must click video timeline to sync-up with other viewers joining after video has started.
  - [ ] Dailymotion still needs attention. (does not auto-play, does not sync).
- [ ] Account/Password recovery
  - Users have forgotten email addresses.
    - Idiodance (lost password, no email received, using alt “Idio”)
    - Snirtle (lost password, no email received, using alt “Snurtl”)
    - BlueMoonBeer (lost password, no email received, using alt “SaxTooter”)
  - (Rednames unable to review/alter user registration details).
    - (probably shouldn’t let rednames view plaintext passwords but allow resets)
    - For better oversight, we may require redname direct interaction with user and verification of previous ip addresses etc rather than trying to solve the problem programmatically.
- [ ] Investigate performance issues with cams (EasyRTC) over new SSL implementation.
  - Things look good initially but frame-rates tend to decline over time.
  - Cam images persist when another user deactivates their camera.
- [ ] Restructure video-containing frame/divs to be a div with the child-content sized to 100% for easier resizing. (do this before restructuring full screen mode/implementing half screen mode.)
- [ ] Emotes: ‘yay’ and ‘2beery’ are broken.
  - these are located in: //forums.goontu.be/Smileys/default/


####**Features:**####
- [ ] make commands ($ and /) not enter chat.
- [ ] allow users to queue videos, taking priority in a turn based/round-robin order? possibly a mod toggleable mode.
- [ ] make timestamping work and work easily.
- [ ] Minimize code for deployment.
- [ ] possibly link <3ing a video to liking the video for a user’s youtube account?
- [ ] possibly add more video adding modes, toggleable by mods, like a relevance mode somehow where people can more easily do a “this video is like the last one!” thing, maybe by limiting to one add per person, stuff like that. default mode should be applicable for most of the time still though. if no mods present should revert automatically in case of problems.
- [ ] Responsive half screen mode.
- [ ] allow banner toggle and persist for accounts.
- Chat-stuff:
  - [ ] Make whisper-mode more apparent (separate (floating?) chat window? Inverse-color-scheme?) to users.
  - [ ] Allow entering whisper mode through name clicking rather than chat commands
- [ ] Re-institute Karma/Fame system.
  - Incentivize good content
  - Shouldn’t be public however, (admin panel only?) as there’s too much dick-waving on the internet already.
  - could think of alternative "good adding incentives". listing peoples video history, most added videos, give people higher video posting numbers for continued good videos (how to determine if posting is good though? likes are obvious but as of the current system it's hard to predict who will bother clicking a like button.)
- Etc:
- [ ] I’m curious what zoom level most users use for tubes. I personally never use the default 100% as it’s way too small, and zoom in until the video and chat hit the screen edges. if someone actually uses the small player this might be irrelevant but maybe we should default to a larger player/chat.
  - We could ask users to take a screenshot of what zoom they normally use goontube at.
- [ ] Two MOTD lines, One for system alerts and maintenance notices, the other for customary MOTD functions.
- [ ] Banners are kind of a PITA. Requires redesign to fix.
- [ ] Regularly updated ‘Top 100 videos’ stats list.
- [ ] Allow $ commands to be accessed with / as well.
- [ ] Improve control buttons to have more description. If nothing else a hover over could display what the button does.
- [ ] Fix $import
- [ ] Implement goontube arena as a built in feature. A user may $duel a user, which the other must accept, then the room is polled for if the duel should take place. If it does then once each user uploads a video their videos are moved to the top. After the second video plays a poll is created to poll who won.
- [ ] A more elaborate goontube arena that sorts everyone in the room into one of 4 teams Ala Harry potter. Each team has a leader, and each leader posts a video. Once all the videos play each team votes on a video besides their own. Possibly limit chat between teams while this is taking place.
- [ ] $8ball could give ‘Magic 8-ball’ answers.
  - It is certain
  - It is decidedly so
  - Without a doubt
  - Yes, definitely
  - You may rely on it
  - As I see it, yes
  - Most likely
  - Outlook good
  - Yes
  - Signs point to yes
  - Reply hazy try again
  - Ask again later
  - Better not tell you now
  - Cannot predict now
  - Concentrate and ask again
  - Don't count on it
  - My reply is no
  - My sources say no
  - Outlook not so good
  - Very doubtful
- [ ] Unnamed users could be auto-purged if they don’t login for after ‘X’ minutes instead of depending on rednames/deputies to manually purge.
- [ ] Add-in ‘milkdrop.js’ so users can have something interesting to look at during ‘still-image’ videos. (suggested by Jynn).

### Streaming provider spec

#### Installation + Setup

```
git clone https://github.com/goontube/goontube.git
cd goontube
npm install
```

#### Development

```
webpack-dev-server ./client.js
```

Then visit [http://localhost:8080/bundle](http://localhost:8080/bundle) (http://localhost:7070/bundle ??) to access a webpack-dev-server for the frontend.

`npm install -g pm2` and then use `pm2-dev ./index.js` to work on the backend with reload on change.

#### Usage

```
webpack
npm start
```
