import React, {Component} from 'react';
import './customers.css';

class Customers extends Component {
  constructor(){
      super();
      this.state = {customers:[]}
  }

  componentDidMount(){
      fetch('./api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers},()=>console.log('customers fetched',customers)))

      const data = {id:1,Name:"jj"};
      const options = {
          method :'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify(data)    
          }
          fetch('/api',options)
      }
  

  render(){
  return (
    <div className="Customers">
        <h2>Customers</h2>
        <ul>
            {this.state.customers.map(customer =>
                <li key= {customer.id}>{customer.Name}</li>)}
        </ul>

    </div>
  );
}}

export default Customers;