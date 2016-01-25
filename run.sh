#!/bin/bash

# Script for consolidating the process of building and running the local goontube instance.

while getopts ah opts; do
   case ${opts} in
      # -a (all): runs all processes required to build goontube. (does not currently install required shell binaries however.) 
      a)
      sudo npm install
      ;;
      # -h (help): displays script summary and available flags.
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
      echo __________________________________________________________________________________________
      echo
      echo \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
      echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ 
      echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \(:V\)
      echo                                                                                         
      exit
      ;;
   esac
done

webpack
npm start
exit
