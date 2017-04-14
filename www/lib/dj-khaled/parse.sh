#!/usr/bin/env bash
set -uo pipefail
IFS=$'\n\t'


parse() {
  avconv -i $1.mp3 -ss "$2" -t "$3" -y "DONE-$1.mp3"
}

parse 1Rtlg3-mrv8 "00:00:17.5" "00:00:02"
# parse 4YqV8n_kfsU "00:00:15.5" "00:00:00.9" # DJ Khaled, of course
parse 4YqV8n_kfsU "00:01:36" "00:00:02.5"
parse 5Tf1wJwvzcc "00:00:44" "00:00:01.75"
parse E2Lw9YWLVts "00:00:27.5" "00:00:01.8"
parse fxPBu_vX9Q0 "00:01:08" "00:00:01.45"
parse -fZ7Gb532Ew "00:00:17.5" "00:00:02.4"
parse Gvsao2_jsNk "00:00:30.2" "00:00:01.7"
parse ia9rPW8yXqE "00:00:52.5" "00:00:02"
parse ii0rSwxVkFY "00:00:01.5" "00:00:02"
parse L1xlu7Zktm8 "00:00:15" "00:00:02.5"
parse LdE3WlQ__GY "00:00:01" "00:00:03"
parse OyRRnZ8vxA0 "00:00:9.5" "00:00:02"
parse -p0bNOxBhgc "00:00:08.5" "00:00:02"
parse _qNU9n7k15g "00:00:36" "00:00:02"
parse rVEUbU9hQEo "00:00:17.5" "00:00:01.8"
parse sDzxQBgj-f8 "00:00:10.5" "00:00:01.8"
parse SFLSOIufuhM "00:00:42.5" "00:00:01.6"
parse VihUO-4-wCc "00:00:12.5" "00:00:02"
parse _xGhK6qgPtM "00:01:32.2" "00:00:01.5"
parse zQhy9eE8MBg "00:03:32.5" "00:00:01.6"

# invididual items
parse QtPluXq_hko "00:00:00.129" "00:00:02.6"
parse HdT_oKderEs "00:00:06" "00:00:02"
parse zWhowrdR4dU "00:00:11" "00:00:02"
