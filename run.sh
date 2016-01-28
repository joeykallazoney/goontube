#!/bin/bash

# Script for consolidating the process of building and running the local goontube instance.
# new fixes/additions

case $(uname -s) in
	Darwin)
		binPath="/usr/local/bin"
		sbinPath="/usr/sbin"
		osType="macOS"
	;;
	Linux)
		binPath="/usr/bin"
		sbinPath="/sbin"
		osType="Linux"
	;;
esac

showHelp() {
    hashSep() { awk 'BEGIN{for(c=0;c<91;c++) printf "#"; printf "\n"; exit 0}' ; }
    lineSep() { awk 'BEGIN{for(c=0;c<91;c++) printf "_"; printf "\n"; exit 0}' ; }
    printf "\n%s\n" "$(hashSep)"
    echo Script for consolidating the process of building and running the local goontube instance.
    printf "\n\n%s\n%s\n\n" "Flags:" "$(lineSep)"
    printf "%s%s\n" "$(printf '\033[1;32m') -a" "$(printf '\033[0;32m') (all)     $(printf '\033[0m'): runs all processes required to build goontube. (Incomplete)"
    printf "%s%s\n" "$(printf '\033[1;32m') -b" "$(printf '\033[0;32m') (browser) $(printf '\033[0m'): runs the normal build and also switches to chrome. Requires OSX."
    printf "%s%s\n" "$(printf '\033[1;32m') -h" "$(printf '\033[0;32m') (help)    $(printf '\033[0m'): displays this, but you knew that already, didn't you?"
    printf "%s\n\n%s\n\n%91s\n\n" "$(lineSep)" "$(hashSep)" \(:V\)
    exit
}

# Check TCP/7070 for active processes on port.
checkPort() {
  ${sbinPath}/lsof -i:7070
}

fileMonitor() {
  chsum1=""

  webpack
  npm start &
  echo Waiting for npm to complete before activating refresh daemon.
  sleep 7
  echo Starting live code refresh daemon.
  while [[ true ]]
  do
    chsum2=`find ../goontube -type f -mtime -5s;`
    if [[ $chsum1 != $chsum2 ]] ; then           
      # exclude files go here, ie stuff you don't want to trigger refresh
      case $chsum2 in
        '')
          chsum1=$chsum2
        ;;
        *.swp)
          chsum1=$chsum2
        ;;
        *)
          echo File\(s\) changed: \>$chsum2\< Refreshing...
          chsum1=$chsum2
          lsof -i:7070 | tail -n+2 | awk '$1 ~ /^node$/ {print $2}' | uniq | while read pid ; do kill -9 $pid ; done
          webpack
          npm start &
        ;;
      esac
    fi
    sleep 7
    if [[ $bFlag = "1" ]] ; then
      osascript -e '
        tell application "Google Chrome"
          tell the active tab of its first window
            reload
          end tell
        end tell
      '; 
    fi
  done
}

buildStuff() {
  lsof -i:7070 | tail -n+2 | awk '$1 ~ /^node$/ {print $2}' | uniq | while read pid ; do kill -9 $pid ; done
  fileMonitor
}

aFlag="0"
hFlag="0"
bFlag="0"
while getopts abh opts; do
  case ${opts} in
  a)
    npm install
  ;;
  h)
    showHelp
  ;;
  b)
    if [ "${osType}" = "macOS" ] ; then
      echo A chrome browser tab will open to http://localhost:7070/ once npm begins running.
      echo Make sure this tab is in the first slot of the chrome browser so that it can hot refresh.
      bFlag="1"
      screen -dm osascript -e '
        tell application "Google Chrome"
        delay 8
        open location "http://localhost:7070/"
        activate
        end tell
      '; 
    fi
  ;;
  esac
done

buildStuff
# EOF
