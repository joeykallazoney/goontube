# :hamburger: [goontube](https://goontu.be/)

![Travis CI build status](https://travis-ci.org/goontube/goontube.svg?branch=master)

Video synchronization and chat lounge.  

###Dev Notes###
2016AUG08 - Forked dev project to "Project-HonkeyDong" branch.

### Roadmap

####**Project Management**####
- [ ] Set up dev server.
- [ ] Discuss deployment/build process.
- [ ] Discuss project structure/file organization.
- [ ] We should establish regular weekly/bi-weekly meetings over mumble to discuss development status and task delegation.
   - Scheduling timetable moved to wiki

####**Bug Fixes:**####
- [ ] NEWTUBES - admin ```$skip``` will skips both currently playing vid as well as first video in queue.
- [ ] ```$reboot``` kills goontube
- [x] last video in queue loops forever busying-out clients. client-side refresh must be forced if goonbot is unable to auto-add new vids to the queue.
   - [x] NEWTUBES - Goonbot auto-adds to queue when only 1 video appears in the queue.  
- [x] Repair fullscreen mode.
   - [ ] Exiting full-screen makes 'like' and 'hate' buttons disappear.
- [x] ```$permissions``` definitely needs to have an alias, ```$privilege```, ```$priv``` (?)
- [x] “fix video” button skips screen to top, making it hard to click in a row multiple times, change this if non-breaking.
- [x] “power button” gets real buggy after “turning it back on”, ie video players wont properly reinsert, retoggling power might not work, etc.
- [ ] Account/Password recovery
  - Users have forgotten email addresses.
    - Idiodance (lost password, no email received, using alt “Idio”)
    - BlueMoonBeer (lost password, no email received, using alt “SaxTooter”)
  - (Rednames unable to review/alter user registration details).
    - (probably shouldn’t let rednames view plaintext passwords but allow resets)
    - For better oversight, we may require redname direct interaction with user and verification of previous ip addresses etc rather than trying to solve the problem programmatically.
- [ ] Investigate performance issues with cams (EasyRTC) over new SSL implementation.
  - [ ] Things look good initially but frame-rates tend to decline over time.
  - [x] Cam images persist when another user deactivates their camera.
- [x] Restructure video-containing frame/divs to be a div with the child-content sized to 100% for easier resizing. (do this before restructuring full screen mode/implementing half screen mode.)
- [x] Fix ```$import``` (enabled for rednames only)
- [x] Addition of gDrive/gDocs support has broken vimeo syncronization. 2016FEB11

##### Resolved #####
- [x] 2016FEB27 - Cams on oldtubes now close the local media stream correctly when disposed/webcam session closes, no more hanging light/cam session
- [x] 2016FEB11 - Admin Panel chat log timestamps are crazy wrong.
- [x] preloading goontube, from typing in go- in like chrome for example, triggers multiple logins and kicks a user. considering how common typing go- into a nav bar is this is non trivial. possible solution is to remove restriction on simultaneous logins.
   - 2016FEB12 - This is a Chrome configuration issue. ```Settings``` --> ```Advanced Settings``` --> ```Privacy``` --> deselect ```Prefetch resources to load pages more quickly```.
- [x] Fix non-autoplaying videos
  - 2015DEC06 - Vimeo switched to HTML5 player.
    - Users must click video timeline to sync-up with other viewers joining after video has started.
  - [x] Dailymotion still needs attention. (does not auto-play, does not sync).
  - 2016FEB08 - Dailymotion fixed! switched to HTML5 player.
- [x] Emotes: ‘yay’ and ‘2beery’ are broken.
  - these were located in: //forums.goontu.be/Smileys/default/
  - FIXED 2016FEB08
- [x] 2016FEB08 - Streamlined auto-add random videos to empty queue.

####**New Features:**####
- [ ] Minimize code for deployment.
- [x] 2016FEB11 - Google Drive/Docs support. (**woot!**)
    - [ ] Add parsing feature for drive.google.com to docs.google.com, strip '```view?usp=sharing```' from end of line.
- [x] Possibly disable youtube annotations by default (suggested by Megaspel) append '```&iv_load_policy=3```' to youtube "```movie```" param/value element (Reference: http://stackoverflow.com/questions/8166846/removing-annotations-on-embedded-youtube-videos)
- [ ] allow users to queue videos, taking priority in a turn based/round-robin order? possibly a mod toggleable mode.
- [ ] make timestamping work and work easily.
- [x] Add a video flipping button for backwards vids. (via POOPSOCKBOLLAS)
    - Added to old-tubes by jskz, works for yt only atm.
- [ ] Add-in ‘milkdrop.js’ so users can have something interesting to look at during ‘still-image’ videos. (suggested by Jynn).
- [ ] possibly link <3ing a video to liking the video for a user’s youtube account?
- [ ] possibly add more video adding modes, toggleable by mods, like a relevance mode somehow where people can more easily do a “this video is like the last one!” thing, maybe by limiting to one add per person, stuff like that. default mode should be applicable for most of the time still though. if no mods present should revert automatically in case of problems.
- [ ] Responsive half screen mode.
- [ ] allow banner toggle and persist for accounts.
- [ ] Investigate adding BT magnet-links to stream vids.
   - May require heavy discussion/review. We have concerns.
- [ ] Admin panel
   - Configure roles and selectable permissions on a per-user basis.
   - 2016JUL11 - Alpha in progress. Will need to be folded into main project at some point.
   - User manager works. Email addresses can be changed by Admins and password reset emails are working.
      - [ ] List of 'X' last-known IPs should be retreivable (for identifying ban evasion attempts and validating user account changes).
      - [ ] Add delete/drop feature for cleanup of fake/joke alt accounts. (subject to review)
      - [ ] Enable display of registration date.
   - Add 'order by' filter to allow alpha-numeric sorting.
   - [ ] Role Manager
      - Roles to be created/assigned from selectable list of permissions instead of using obtuse bit-masks.
   - [ ] Ban Manager
      - Detailed ban history for accounts, dates, who banned, and ban reason can be reviewed by Admins/Mods.
      - [ ] Integrate Emoticon management
   - [ ] Video Archive enabling reports of blacklisted links, top 10/top 100 weekly/monthly/yearly videos.

**Commands:**
- [ ] ```$afk``` < _reason_ >
- [ ] ```$banlist```
- [ ] ```$blacklist``` [ _yt_ | _vm_ | _dm_ ] < _linkid_ >
- [ ] ```$bump``` < _username_ >
- [ ] ```$dice``` < _quantity_ > < _# of sides_ > < _quantity of dice_ >  or ```$<n>d<Nnn>```
- [ ] ```$delete``` [ ```-all``` | ```-dur _minutes_``` | ```-num _#_``` < _username_ >
- [ ] ```$endpoll```
- [ ] ```$emotes```
- [ ] ```$ignore``` [ < _username_ > ]
- [ ] ```$import``` < _playList-Link_ >
- [ ] ```$kick``` [ < _username_ > | ```-all``` | ```-unregistered``` | < _message_ >
- [ ] ```$me``` ```/me```
- [ ] ```$motd``` < _message_ >
- [ ] ```$permissions``` [```+```| ```-``` ] [ < _username_ > ]
- [ ] ```$poll``` _title_ *_option_ *_option_ [*_option..._]
- [ ] ```$purge``` [ < _username_ > ]
- [ ] ```$reboot```
- [ ] ```$seen``` < _username_ >
- [ ] ```$seppuku```
- [ ] ```$setskip``` [ < _1-100_ > ]
- [ ] ```$showskip```
- [ ] ```$skip```
- [ ] ```$tban``` < _username_ > < _hours_ > < _reason_ >
- [ ] ```$unban``` < _username_ >
- [ ] ```$whisper``` ```$w```
   - currently broken.
- [ ] ```$help``` - show list of commands available to user@priv-level, ```$help``` < ```command``` > shows description/usage.
- [ ] ```$fban``` - Works like ```$ban``` (shows message) doesn't actually ban user.
- [ ] Possible ```$unskip``` feature to undo a ```$skip``` action?
- [ ] ```$stealthskip```, for mods, skips the current video for everyone except the person who added it, they think it's still playing... (i'm only half joking...)
- [ ] make commands ($ and /) not enter chat.
- [x] ```$8ball``` gives ‘Magic 8-ball’ answers. (Complete - 2016JUL08)
- [ ] ```$wish``` - using a weighted table of abilities/permissions ```$wish``` may grant the user an ability or 'curse' for a variable time.
   - e.g.: ```$skip```, ```$bump```, user banned for 24-hours, user able to post more vids, user unable to post more than vid in the queue. 
   - user's 'ban' history may be factored-in as well. 

##### Complete #####
- [x] Add 3-second cool-down to $skip so mods/deputies can't over-moderation (possible '-f' option for override?)
- [x] Allow $ commands to be accessed with / as well.

**Chat-stuff:**
  - [ ] Make whisper-mode more apparent (separate (floating?) chat window? Inverse-color-scheme?) to users.
  - [ ] Allow entering whisper mode through name clicking rather than chat commands
- [ ] Re-institute Karma/Fame system.
  - Incentivize good content
  - Shouldn’t be public however, (admin panel only?) as there’s too much dick-waving on the internet already.
  - could think of alternative "good adding incentives". listing peoples video history, most added videos, give people higher video posting numbers for continued good videos (how to determine if posting is good though? likes are obvious but as of the current system it's hard to predict who will bother clicking a like button.)

**UI**
- [ ] Two MOTD lines, One for system alerts and maintenance notices, the other for customary MOTD functions.
  - ```$motd``` - Rednames/Deputies
  - ```$issue``` - Admins/Rednames only
- [ ] Banners are kind of a PITA. Requires redesign to fix.
- [ ] Improve control buttons to have more description. If nothing else a hover over could display what the button does.
- [ ] Add trashcan gadget to drag and drop unplayable (deleted) video urls and remove them from the index. Only Rednames will see this gadget. Perhaps index bad urls to separate table for review.

**Etc:**
- [ ] I’m curious what zoom level most users use for tubes. I personally never use the default 100% as it’s way too small, and zoom in until the video and chat hit the screen edges. if someone actually uses the small player this might be irrelevant but maybe we should default to a larger player/chat.
  - We could ask users to take a screenshot of what zoom they normally use goontube at.
- [ ] Regularly updated ‘Top 100 videos’ stats list.
- [ ] A more elaborate goontube arena that sorts everyone in the room into one of 4 teams Ala Harry potter. Each team has a leader, and each leader posts a video. Once all the videos play each team votes on a video besides their own. Possibly limit chat between teams while this is taking place.
- [ ] Unnamed users could be auto-purged if they don’t login for after ‘X’ minutes instead of depending on rednames/deputies to manually purge.
- [ ] Failure to login after 'X' minutes forces black-out overlay and cessation of media streaming, prompting 'unnamed' user to register/login.
- [ ] Implement goontube arena as a built in feature. A user may ```$duel``` a user, which the other must accept, then the room is polled for if the duel should take place. If it does then once each user uploads a video their videos are moved to the top. After the second video plays a poll is created to poll who won.

#### Installation + Setup

```
git clone https://github.com/goontube/goontube.git
cd goontube
npm install
```

#### Development

Prerequisite for webpack-dev-server: `npm install -g webpack-dev-server`

```
webpack-dev-server ./src/client.js
```

Then visit [http://localhost:8080/bundle](http://localhost:8080/bundle)

`npm install -g pm2` and then use `pm2-dev ./index.js` to work on the backend with reload on change.

#### Usage

```
webpack
npm start
```
