import React, { Component } from 'react';
import api from '../services/api';


class Property extends Component {

  state = {
    properties: [],
  }
  
  async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await api.get('/propertyData/'+ id)
    console.log(res.data);
    this.setState({ properties: res.data });
  }


  render() {
    
    const {properties}  = this.state;
    return (
        properties.map((comercial,id) => (
            <div key={id}>  
            <h3>
            <p>{comercial.person.nome}</p>
            <p>{comercial.person.telefone}</p>
            </h3>
            </div>)) 
     ) };
};

export default Property;