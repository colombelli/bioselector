# BioSelector

![](https://img.shields.io/badge/python-v3.8-blue)
![](https://img.shields.io/badge/R-v4.0-orange)

* **Electron Cross-Platformed** 

## Description

BioSelector is a cross-platform application powered by machine learning that provides Ensemble and other Feature Selection
techniques for biomarker discovery. Even though different domain problems could benefit from it if the dataset model fits the
required one, we still didn't investigated its potential beyond gene expression data.

The application is part of a scientific study that investigated Ensemble Feature Selection for biomarker discovery out of 
RNA-seq and Microarray datasets provided by [TCGA][tcga] and [ArrayExpress][arrayexpress]. If you have scientific interests or want to use our package in formal reports, we kindly ask you to cite us in your publication: [Colombelli, F., Kowalski, T.W. and Recamonde-Mendoza, M., 2022. A hybrid ensemble feature selection design for candidate biomarkers discovery from transcriptome profiles. Knowledge-Based Systems, 254, p.109655.](#bibtex-entry)

This work was developed at the Institute of Informatics, Universidade Federal do Rio Grande do Sul and Bioinformatics Core, Hospital de Clínicas de Porto Alegre.

## Current Stage

Right now, the application is at an early stage development and its MVP was only executed on Linux systems. 
The application was built using Electron backended by Python/R/Rcpp and frontended with React framework utilizing a
template provided freely by [Creative Tim][creative-tim].

After more testing, this README will be updated with a detailed usage and installation guide. 


## Screenshots

<img src="./Screenshots/datasets.png" width="40%" height="40%"/><img src="./Screenshots/datasets-format.png" width="40%" height="40%"/><img src="./Screenshots/experiments-add.png" width="40%" height="40%"/><img src="./Screenshots/experiments-root.png" width="40%" height="40%"/>


## Installation
Due to its early stage development phase, BioSelector still does not have production ready packages with installable binaries, thus, its usage is limited to the development version, and the installation is more manual and prone to errors.

Start by following the installation steps for [efs-assembler](https://github.com/colombelli/efs-assembler/blob/master/README.md#installation), the backend solution of BioSelector. After that, install the latest stable version of [Node.js](https://nodejs.org/) (we have tested it on Node.js _v10.24.1_, _v14.17.3_ and _v14.24.4_).

Then, clone the repository and access its directory:
    
    $ git clone https://github.com/colombelli/bioselector.git
    $ cd bioselector

On Linux systems run the installation node script:
        
    $ npm run install:clean

On Windows and macOS systems, delete the `node_modules` folder (if present from previous installation attempts) and run the node installation command:
        
    $ npm install


## Execution

Change the directory to bioselector and run the package.json script **start**:
        
    $ cd bioselector
    $ npm run start


## Usage

* For information about the supported **datasets** format and other charcteristics, read [this](https://github.com/colombelli/efs-assembler#datasets-expected-format)
* For information about the **results** folder structure and explanation about the generated files and folders, read [this](https://github.com/colombelli/efs-assembler#results-folder-structure)
* For information about the constraints surrounding the addition of **new feature selection algorithms**, read [this](https://github.com/colombelli/efs-assembler#rules-for-new-feature-selection-algorithms)
* For information about the constraints surrounding the addition of **new aggregation algorithms**, read [this](https://github.com/colombelli/efs-assembler#rules-for-new-aggregation-algorithms)



## Demonstration

[![BioSelector Demonstration](https://yt-embed.herokuapp.com/embed?v=AK1osfRe86Q)](https://youtu.be/AK1osfRe86Q "Demonstration")


## BibTeX entry

```
@article{COLOMBELLI2022109655,
title = {A hybrid ensemble feature selection design for candidate biomarkers discovery from transcriptome profiles},
journal = {Knowledge-Based Systems},
volume = {254},
pages = {109655},
year = {2022},
issn = {0950-7051},
doi = {https://doi.org/10.1016/j.knosys.2022.109655},
url = {https://www.sciencedirect.com/science/article/pii/S0950705122008383},
author = {Felipe Colombelli and Thayne Woycinck Kowalski and Mariana Recamonde-Mendoza},
keywords = {Feature selection, Ensemble learning, Biomarkers discovery, Microarray, Bioinformatics, High-dimensional data}
}
```

## Acknowledgement

This project was financed in part by the Coordenação de Aperfeiçoamento de Pessoal de Nível Superior - Brasil (CAPES) - Finance Code 001, Conselho Nacional de Desenvolvimento Científico e Tecnológico (project CNPq/AWS 032/2019, process no. 440005/2020-5), and Fundação de Amparo à Pesquisa do Estado do Rio Grande do Sul (FAPERGS).


[creative-tim]: https://www.creative-tim.com/
[tcga]: https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga
[arrayexpress]: https://www.ebi.ac.uk/arrayexpress/

