#! /bin/bash

# First run
sh ./generate.sh

# Only on gitpod
whoami | grep 'gitpod' > /dev/null && code -r content.pdf

# Listen for changes
when-changed -1 -r content -c "sh ./generate.sh"
