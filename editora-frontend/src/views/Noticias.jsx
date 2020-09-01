import React, { Component } from "react";
import { Grid, Row, Col, Table} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {Collapse} from 'react-collapse';
import axios from "axios";


const url = "http://localhost:5000/editora/noticias";

export class Noticias extends Component {
  state = {
    data: [],
      collapTableOn: true,
      collapFormOn: false,
      eventoCadastro: true, 
      tituloForm: 'Cadastro', 
      id:'',
      titulo:'',
      conteudo:'',
      datapublicacao:''
    }


  buscarNoticias = () => {
    axios
      .get(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ data: response.data });
      });
  };


  btnRemover = (currentId) => {
    axios
      .delete(url + "/" + currentId)
      .then((response) => {
        this.buscarNoticias();
        alert("Registro Eliminado com sucesso");
      });
  };


  componentDidMount() {
    this.buscarNoticias();
  };

  zerarState(){
    this.setState({ 
      collapTableOn: true,
      collapFormOn: false,
      eventoCadastro: true, 
      tituloForm: 'Cadastro', 
      titulo:'',
      conteudo:'',
      datapublicacao:''});
  }

  handleSubmit = (event) => {
    if(this.state.eventoCadastro){
        axios
        .post(url,{
            titulo: this.state.titulo,
            conteudo: this.state.conteudo,
            datapublicacao: this.state.datapublicacao
            })
        .then((response) => {
          this.buscarNoticias();
          this.zerarState();
          alert("Registro Cadastrado com sucesso.");
        });
    }else{
          axios
          .put(url + "/" + this.state.id,{
              id: this.state.id,
              titulo: this.state.titulo,
              conteudo: this.state.conteudo,
              datapublicacao: this.state.datapublicacao
              })
          .then((response) => {
            this.buscarNoticias();
            this.zerarState();
            alert("Registro Atualizado com sucesso.");
          });
    }

    event.preventDefault();
};

btnShowNovo(){  
  this.setState({ collapFormOn: true,
    tituloForm:'Formulário - Cadastro de Notícias ',
    eventoCadastro: true,
    id:'',
    titulo:'',
    conteudo:'',
    datapublicacao:''});
 }  


btnAlterar(currentReg){
  this.setState({ collapFormOn: true ,
                  eventoCadastro: false,
                  collapTableOn: false,
                  tituloForm:'Formulário - Edição de Notícias ',
                  id: currentReg.id,
                  titulo: currentReg.titulo,
                  conteudo: currentReg.conteudo,
                  datapublicacao: currentReg.datapublicacao});
}

handleChange=(e)=>{
      this.setState({ [e.target.name]: e.target.value });  
}




  render() {
    const {form}=this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Collapse isOpened={this.state.collapTableOn}>
              <Col md={12}>
                <Card
                  title="Tabela de Notícias"
                  category="Notícias publicadas pela Editora no último mês."
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.data.map((reg) => {
                          return (
                            <tr>
                              <td>{reg.titulo}</td>
                              <td>{reg.conteudo}</td>
                              <td>{reg.datapublicacao}</td>
                              <td>
                                <button type="button" className="btn btn-success" onClick={()=>this.btnAlterar(reg)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button type="button" className="btn btn-danger" onClick={()=>this.btnRemover(reg.id)}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>
            </Collapse>

            <div align="center">
            <button type="button" className="btn btn-success" onClick={()=>this.btnShowNovo()}>
                <FontAwesomeIcon icon={faEdit} />Adicionar 
            </button>
            </div>
          </Row>
      

        <Row>
        <Collapse isOpened={this.state.collapFormOn}>
              <Col md={8}>
                  <Card
                    title= {this.state.tituloForm}
                    category="Cadastro de notícias para análise e posterior publicação no sistema."
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                          <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            
                              <label for="titulo">Título</label>
                              <input type="text" className="form-control" id="titulo" name="titulo" placeholder="Informe o Título" onChange={this.handleChange} value={this.state.titulo} />
                
                              <label for="conteudo">Conteúdo</label>
                              <input type="text" className="form-control" id="conteudo" name="conteudo" placeholder="Informe o Conteúdo" onChange={this.handleChange} value={this.state.conteudo}  />
                
                              <label for="datapublicacao">Data de Publicação</label>
                              <input type="text" className="form-control" id="datapublicacao" name="datapublicacao" placeholder="Indique quando será a publicação" onChange={this.handleChange} value={this.state.datapublicacao} />
                          </div>
                          <input type="submit" value="Enviar" className="btn btn-success" />
                      </form> 
                    }                  
                  />
              </Col>
            </Collapse>
          </Row>
          </Grid>
 
      </div>



       



    );
  }
}

export default Noticias;
