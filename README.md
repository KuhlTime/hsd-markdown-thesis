<p align="center">
  <img src=".assets/banner-hsd-markdown-thesis.png" alt="Banner" max-height="160px">
</p>

This template repository should get you quickly up and running with your thesis. It uses [pandoc](https://pandoc.org/) to compile all markdown files into a single PDF. The template is setup for a german 🇩🇪 paper but can be easily adapted to other languages.

The Figma design for the cover (`static/beginning.pdf`) can be found here: https://www.figma.com/community/file/1037658856144320408/hsd-markdown-thesis

I have created this repo because I didn't want to have the complexity of a LaTeX project, but still use most of the features provided by the LaTeX language.

The project includes:
- A GitHub Action that automatically generates a new PDF release everytime you push to the `main` branch of this repository.
- Scripts to run the compilation locally.
- Support for BibTex.
- An API to give access to the generated release over a static url.

## Setup Local Environment

In order to compile the PDF locally you need to have the following installed:
- [pandoc](https://pandoc.org/)
- [when-changed](https://pypi.org/project/when-changed/)

### Font

In order to design your own

### VSCode

I have added some extensions to go along with VSCode that should help you write more quickly.

### macOS

```sh
brew install pandoc python
```

### Linux (Ubuntu)

```sh
apt update
apt install pandoc python3-pip -y
```

### Windows

```sh
choco install pandoc pip
```

### All

**If** you want to use the `watch.sh` script you can install `when-changed` using:
```sh
pip install when-changed
```

### Execution

To execute the script you can use the following command:
```sh
./watch.sh
```

Or if you only want to run the generation once without listening for changes:
```sh
./generate.sh
```

## Folder Structure

- `content/`: The folder where all the **markdown files** and **assets** are stored. It is important that the markdown files are sorted in the same way you want them to appear inside the final PDF file. I suggest you to use a new file for each chapter.
  - `00_meta.md`: This file contains some basic metadata as well as the location of the table of contents, the list of figures and the list of tables.
- `static/`: This directory contains all PDF files that should be added as they are. I have added a basic example PDF File to be used for the HSD.
  - `beginning.pdf`: This file gets prepended to the final PDF. 
- `generate.sh`: Script to generate the PDF.
- `watch.sh`: Script that watches the content folder for changes and automatically generates the PDF on any change.
- `content.pdf`: The generated PDF content. The full document is currently only available through GitHub.
- `style.csl`: The citation style used for the PDF. I used a modified version of the IEEE standard 🇩🇪. [CSL](https://citationstyles.org/), [CSL Library - GitHub](https://github.com/citation-style-language/styles)
- `bibliography.bib`: This is the BibTex file that holds information about your citations. You can use any BibTex editor you want to generate this file. I have been using [MyBib](https://mybib.com/), which is a easy and beautifully designed web tool. (I am hopping for an API to make the PDF generation even easier.)

All other files are **not vital** to be known of. 

## Deployment

### GitHub Actions
The GitHub Action will run automatically everytime you push your changes to the `main` branch. After a couple of minutes you will have a new release on your GitHub repository where you can download the generated PDF File.

## Cheat Sheet

Pandoc uses a more advanced form of markdown which allows for LaTeX statements to be directly included into your content. Some of the most useful expressions I have listed in the table below. If you are just looking for a standard markdown cheat sheet you can find it [here](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf).

| Command                | Function                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `\tableofcontents`     | Generates the table of contents based on the markdown headers you have defined.                              |
| `\listoftables`        | Creates a list of all tables and their location inside your work.                                            |
| `\listoffigures`       | Creates a list of all figures used inside your thesis.                                                       |
| `\setcounter{page}{1}` | When using this statement the pagecounter gets reset and changes all following page number.                  |
| `$<Expression>$`       | If you want to write a math expression use two `$` to denote the section where you expression is written in. |

## More Ressources

- [Hinweise zum wissenschaftlichen Arbeiten](https://soz-kult.hs-duesseldorf.de/studium/was/Documents/Hinweise%20zum%20wissenschaftlichen%20Arbeiten_September2020_Final.pdf): This is a good ressource on how to write good scientific papers. 🇩🇪 <img src="https://raw.githubusercontent.com/KuhlTime/KuhlTime/main/assets/hsd.svg" height="10px">

## Contributing / Questions

I am happy to accept any contribution. If you have any questions or suggestions feel free to open up a new issue. [New Issue](https://github.com/KuhlTime/hsd-markdown-thesis/issues/new)
