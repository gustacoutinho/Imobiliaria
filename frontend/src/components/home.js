import React, { Component } from 'react';
import api from '../services/api';

class Home extends Component {

  state = {
    properties: [],
  }

  async componentDidMount() {
    const res = await api.get('/property')
    console.log(res.data)
    let aux = res.data.map((e) => {
      if(e.terrain == null){
        return e.terrain = ""
      }else
      return e.terrain;
    })
    aux = res.data.map((e) => {
      if(e.comercialRoom == null){
        return e.comercialRoom = ""
      }else
      return e.comercialRoom;
    })
    aux = res.data.map((e) => {
      if(e.house == null){
        return e.house = ""
      }else
      return e.house;
    })
    aux = res.data.map((e) => {
      if(e.apartment == null){
        return e.apartment = ""
      }else
      return e.apartment;
    })

    this.setState({ properties: res.data });
  }
  
  

  render() {
    
    const {properties}  = this.state;
    return (
      properties.map((property,id) => (  
        console.log(property.photo),
      <li key={id}>
            <div>teste</div>
            <h3>
            {property.client.map((client,id) => (
            <div key={id}>  
            <h3>
            <p>{client.person.nome}</p>
            <p>{client.person.telefone}</p>
            </h3>
            </div>))}
            {property.photo.map((foto,id) => (
            <div key={id}>  
            <h3>
            <p>{foto.foto}</p>
           </h3>
            </div>))}
            <p>{property.tipo_oferta}</p>
            <p>{property.data_construcao}</p>
            <p>{property.cidade}</p>
            <p>{property.terrain.area}</p>
            <p>{property.comercialRoom.area}</p>
            <p>{property.house.area}</p>
          </h3>
        </li>))
    )    
    
  };
};

export default Home;