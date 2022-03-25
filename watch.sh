#! /bin/bash

# First run
sh ./generate.sh

# Listen for changes
when-changed -1 -r content -c "sh ./generate.sh"
