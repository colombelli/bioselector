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
    return(
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
                    Additional information about our investigations can be found in the following paper:
                    *cite paper here*
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
                    <CardImg top src={require("assets/img/felipe.png")} />
                    <CardHeader><CardTitle tag="h6">Felipe Colombelli</CardTitle></CardHeader>
                    <CardBody>Undergraduate student blablabla</CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                    <CardImg top src={require("assets/img/mariana.jpg")} />
                    <CardHeader><CardTitle tag="h6">Mariana Recamonde Mendoza</CardTitle></CardHeader>
                    <CardBody>Professor Phd blablabla</CardBody>
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