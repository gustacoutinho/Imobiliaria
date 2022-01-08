import React, { Component } from 'react';
import api from '../services/api';


class Sale extends Component {

  state = {
    properties: [],
  }
  async componentDidMount() {
    const res = await api.get('/property')
    // console.log(res.data)
    let aux = res.data.map((e) => {
        if(e.tipo_oferta === "DV" && e.client !== undefined){
            //   console.log(e)
                return e;
        }else{
            return e.client = {client: [{person: [{}]}]}
        }
    })
    console.log(aux)
    this.setState({ properties: aux });
  }
  
  

  render() {
    
    const {properties}  = this.state;
    return (
      properties.map((property,id) => (  
      <li  key={id}>
            <h3>
            {property.client.map((client,id) => (
            <div key={id}>  
            <h3>
            <p>{client.person.nome}</p>
            <p>{client.person.telefone}</p>
            </h3>
            </div>))}
            <p>{property.tipo_oferta}</p>
            <p>{property.data_construcao}</p>
            <p>{property.cidade}</p>
          </h3>
        </li>))
    )    
    
  };
};

export default Sale;