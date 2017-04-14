#!/usr/bin/env bash
set -uo pipefail
IFS=$'\n\t'


dl() {
  if [[ -e "$2.mp3" ]]; then return; fi

  youtube-dl -x --audio-format mp3 -w --no-part -o "%(id)s.%(ext)s" \
    --postprocessor-args "$1" "https://youtu.be/$2"
}

# All I Do Is Win
dl "-ss 00:00:00.129 -t 00:00:02.6" QtPluXq_hko

# We Takin' Over
dl "-ss 00:00:06 -t 00:00:02" HdT_oKderEs

# I'm on One
dl "-ss 00:00:11 -t 00:00:02" zWhowrdR4dU

# DJKhaledVEVO Channel
youtube-dl -x --audio-format mp3 --no-part -o "%(id)s.%(ext)s" https://www.youtube.com/user/DJKhaledVEVO/video
