# BioSelector

![](https://img.shields.io/badge/python-v3.8-blue)
![](https://img.shields.io/badge/R-v4.0-orange)

* **Electron Cross-Platformed** 

## Description

BioSelector is a cross-platform application powered by machine learning that provides Ensemble and other Feature Selection
techniques for biomarker discovery. Even though different domain problems could benefit from it if the dataset model fits the
required one, we still didn't investigated its potential beyond gene expression data.

The application is part of a scientific ongoing study investigating Ensemble Feature Selection for biomarker discovery out of 
RNA-seq and Microarray datasets provided by [TCGA][tcga] and [ArrayExpress][arrayexpress]. If you have scientific interests or want to use our package in formal reports, we kindly ask you to cite us in your publication: [F. Colombelli, T. W. Kowalski, M. Recamonde-Mendoza, A hybrid ensemble feature selection design for candidate biomarkers discovery from transcriptome profiles, 2021.arXiv:2108.00290.](#bibtex-entry)


## Current Stage

Right now, the application is at an early stage development and its MVP was only executed on Linux systems. 
The application was built using Electron backended by Python/R/Rcpp and frontended with React framework utilizing a
template provided freely by [Creative Tim][creative-tim].

After more testing and a formal paper submission, this README will be updated with a detailed usage and installation guide. 


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

On Windows and macOS systems, delete the `node_modules` folder and run the node installation command:
        
    $ npm install


## Execution

Change the directory to bioselector and run the package.json script **start**:
        
    $ cd bioselector
    $ npm run start


## Usage demonstration

[![BioSelector Demonstration](https://yt-embed.herokuapp.com/embed?v=AK1osfRe86Q)](https://youtu.be/AK1osfRe86Q "Usage Demonstration")


## BibTeX entry

```
@misc{colombelli2021hybrid,
      title={A Hybrid Ensemble Feature Selection Design for Candidate Biomarkers Discovery from Transcriptome Profiles}, 
      author={Felipe Colombelli and Thayne Woycinck Kowalski and Mariana Recamonde-Mendoza},
      year={2021},
      eprint={2108.00290},
      archivePrefix={arXiv},
      primaryClass={cs.LG}
}
```

[creative-tim]: https://www.creative-tim.com/
[tcga]: https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga
[arrayexpress]: https://www.ebi.ac.uk/arrayexpress/

