import React from 'react'
import {
    Card,
    CardImg,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
} from "reactstrap";


function About() {
    return (
        <>
            <div className="content">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">The project</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <p>BioSelector is an open source framework designed to perform feature selection experiments with
                                or without ensemble architectures. It is a result of a scientific investigation
                                focused in cancer candidate biomarker discovery from gene expression data. Despite
                                the focused domain, BioSelector is designed to be used with any arbitrary binary supervised
                                classification problem where the user desires to perform dimensionality reduction.
                </p>
                                <p>For knowledge discovery purposes other than cancer biomarker genes, the adequacy of the
                                implemented methods were not scientifically explored by us and its applicability should
                                be subject of investigation or at least validated by the scientific literature. We, however,
                                believe in the great potential of the methods for knowledge discovery in a wide variety of
                                problems akin to ours, specially bioinformatics related ones.
                </p>
                                <p>
                                    In order to run the experiments in a terminal based fashion, we also offer BioSelector's
                                    backend functionalities (and some more) in an independent Python installable package called
                                    efs-assembler available in the GitHub repository https://github.com/colombelli/efs-assembler.
                </p>
                                <p>
                                    If you have scientific interests or want to use BioSelector in formal reports, we kindly ask
                                    you to cite us in your publication: </p>
                                    <p>
                                    <i>F. Colombelli, T. W. Kowalski, M. Recamonde-Mendoza, A hybrid ensemble feature selection design for candidate biomarkers discovery from transcriptome profiles, 2021.arXiv:2108.00290.</i>
                                    </p>
                                    <p>
                                    Additional information about our investigations can be found in the same paper.
                                    </p>
                                <p>
                                    The study that culminated in BioSelector was financed in part by the Coordenação de Aperfeiçoamento de
                                    Pessoal de Nível Superior - Brasil (CAPES) - Finance Code 001, Conselho Nacional de Desenvolvimento
                                    Científico e Tecnológico (CNPq), and Fundação de Amparo à Pesquisa do Estado do Rio Grande do Sul (FAPERGS).
                </p>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Who we are</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardImg top src={require("assets/img/felipe-2.png")} className="img-about" /> 
                                            <CardHeader><CardTitle tag="h6">Felipe Colombelli</CardTitle></CardHeader>
                                            <CardBody>Computer Science undergraduate at Universidade Federal do Rio Grande do Sul (UFRGS),
                                                former member of PET Computação UFRGS, member of the Bioinformatics Core of HCPA (Núcleo de 
                                                Bioinformática do HCPA) research group, and scientific inititation fellow advised by
                                                Prof. Mariana Recamonde Mendoza.  
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <CardImg top src={require("assets/img/mariana.jpg")} className="img-about" />
                                            <CardHeader><CardTitle tag="h6">Mariana Recamonde Mendoza</CardTitle></CardHeader>
                                            <CardBody>Tenured Associate Professor (Professor Adjunto) at the Institute of Informatics 
                                                (INF) of Universidade Federal do Rio Grande do Sul (UFRGS), Researcher Professor 
                                                at Hospital de Clínicas de Porto Alegre (HCPA) and coordinator of the Bioinformatics 
                                                Core of HCPA (Núcleo de Bioinformática do HCPA).</CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        </>

    );
}

export default About;