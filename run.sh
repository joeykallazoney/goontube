#!/bin/bash

# Script for consolidating the process of building and running the local goontube instance.

while getopts abh opts; do
   case ${opts} in
      a)
        sudo npm install
        ;;
      h)
        echo
        echo \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
        echo Script for consolidating the process of building and running the local goontube instance.
        echo
        echo
        echo Flags:
        echo __________________________________________________________________________________________
        echo 
        echo -a \(all\): runs all processes required to build goontube. \(Incomplete\)
        echo -h \(help\): displays this, but you knew that already, didn\'t you?
        echo -b \(browser\): runs the normal build and also switches to chrome. Requires OSX.
        echo __________________________________________________________________________________________
        echo
        echo \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
        echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ 
        echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \(:V\)
        echo                                                                                         
        exit
        ;;
      b)
        osascript -e '
          tell application "Google Chrome"
            open location "http://localhost:7070/"
            delay 1
            activate
          end tell
        '
        ;;
   esac
done

webpack
npm start
exit
