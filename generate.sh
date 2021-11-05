#! /bin/bash

for f in content/*.md; do cat $f; echo "\n\\\newpage\n"; done > content.md
pandoc -s -V papersize:a4 --highlight-style my-one-light.theme --number-sections content.md --resource-path content --citeproc --bibliography=bibliography.bib --csl=style.csl --pdf-engine=xelatex -o content.pdf
echo "✅ Finished Compilation"
