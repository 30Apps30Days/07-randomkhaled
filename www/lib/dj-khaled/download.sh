#!/usr/bin/env bash
set -uo pipefail
IFS=$'\n\t'


dl() {
  if [[ -e "$1.mp3" ]]; then return; fi

  youtube-dl -x --audio-format mp3 -w --no-part -o "%(id)s.%(ext)s" \
    "https://youtu.be/$1"
}

# All I Do Is Win
dl QtPluXq_hko

# We Takin' Over
dl HdT_oKderEs

# I'm on One
dl zWhowrdR4dU

# DJKhaledVEVO Channel
youtube-dl -x --audio-format mp3 --no-part -o "%(id)s.%(ext)s" https://www.youtube.com/user/DJKhaledVEVO/video
