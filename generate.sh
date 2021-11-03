#! /bin/bash

for f in content/*.md; do cat $f; echo "\n\\\newpage\n"; done > content.md
pandoc -s -V papersize:a4 -V lang=de -V language=de-DE --number-sections content.md --resource-path content --citeproc --bibliography=bibliography.bib --csl=style.csl --pdf-engine=xelatex -o content.pdf
echo "✅ Finished Compilation"