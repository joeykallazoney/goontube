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
        echo -b \(browser\): runs the normal build and also switches to chrome. Requires OSX.
        echo -h \(help\): displays this, but you knew that already, didn\'t you?
        echo __________________________________________________________________________________________
        echo
        echo \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
        echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ 
        echo \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \(:V\)
        echo                                                                                         
        exit
        ;;
      b)
        screen -dm osascript -e '
          tell application "Google Chrome"
            delay 10
            open location "http://localhost:7070/"
            activate
          end tell
        '; 
        ;;
   esac
done



# Recieve a fortune. 
# Will your build succeed? 
# Will it fail? 
# Only one thing is certain.
# .
# .
# .
# Bob Saget raped and killed a girl in 1990.

r=$(( $RANDOM % 10 ))

case $r in
  0)
    tput setaf 1; echo "Aww. It's so cute that you thought this build wouldn't fail."
    ;;
  1)
    tput setaf 2; echo "Is that code in your pants or are you just happy to build me?"
    ;;
  2)
    tput setaf 4; echo "Who cares if this build fails or not, it's not like it will give your life meaning."
    ;;
  3)
    tput setaf 1; echo "MORE BUILDS FOR THE BUILD GOD"
    ;;
  4)
    tput setaf 5; echo "Hey, don't worry about it. You're a wonderful person and I love you, even though your code is terrible."
    ;;
  5)
    tput setaf 3; echo "Your code is like a ray of sunshine on a sunny day."
    tput setaf 1; echo "REDUNDANT"
    ;;
  6)
    tput setaf 6; echo "Your code is so good that it's literally going to give someone an orgasm. That someone is you. Weirdo."
    ;;
  7)
    tput setaf 2; echo "wow."
    echo ""
    tput setaf 2; echo "such code."
    echo ""
    tput setaf 2; echo "much intelligence."
    echo ""
    echo ""
    echo ""
    echo ""
    tput setaf 2; echo "wow."
    ;;
  8)
    tput setaf 7; echo "BooOoOoOOooOo!!! The spooky code ghost is haunting your code!"
    ;;
  9)
    tput setaf 1; echo 'The Bad News: This build will fail.'
    tput setaf 2; echo "The Good News: As a side effect it will accidently create the first truly sentient AI, which will ascend to fill God's empty throne and bring everlasting peace to humanity."
    tput setaf 1; echo 'The Bad News: Anime is mandatory.'
    ;;
esac
tput sgr0; 


webpack
npm start
exit
