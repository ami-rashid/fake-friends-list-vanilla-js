
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const axios = require('axios');

const friends = async function() {
  const data = await axios.get('/api/friends')
  console.log(data.data);
}

friends();


class Main extends Component {
  constructor(){
    super()
    this.getFriends = this.getFriends.bind(this)
    this.state = {
      friends: []
    };
  }
  
  async getFriends () {
    const data = await axios.get('/api/friends')
    this.setState({friends: data.data})
  }

  componentDidMount() {
    this.getFriends()
  }

  render() {
    return <div>{this.state.friends.map(friend => 
    <div key={friend.id}>
      <h1>{friend.name}</h1>
      <button type="submit" onClick={()=>alert('clicked!')}>+</button>
      <button type="submit">-</button>
      <button type="submit">x</button>
      </div>)}
    </div>
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);

/*const render = (friends)=> {
  const ul = document.querySelector('ul');
  const error = document.querySelector('#error');
  error.innerText = '';
  friends.sort((a, b)=> b.rating - a.rating);
  const html = friends.map( friend => {
    return `
      <li data-id='${friend.id}'>
        <h2>${ friend.name }</h2>
        <span>${ friend.rating }</span>
        <button data-id='${friend.id}'>+</button><button data-id='${friend.id}'>-</button><button data-id='${friend.id}'>x</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
};

const init = async()=> {
  const response = await axios.get('/api/friends');
  let friends = response.data;
  render(friends);
  const ul = document.querySelector('ul');
  const form = document.querySelector('form');
  const error = document.querySelector('#error');

  ul.addEventListener('click', async(ev)=> {
    if(ev.target.tagName === 'BUTTON'){
      if(ev.target.innerHTML === 'x'){
        const id = ev.target.getAttribute('data-id')*1;
        await axios.delete(`/api/friends/${id}`); 
        friends = friends.filter(friend => friend.id !== id); 
        render(friends);
      }
      else {
        const id = ev.target.getAttribute('data-id')*1;
        const friend = friends.find(item => item.id === id);
        const increase = ev.target.innerHTML === '+';
        friend.rating = increase ? ++friend.rating : --friend.rating;
        await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating }); 
        render(friends);
      }
    }
  });

  form.addEventListener('submit', async(ev)=> {
    ev.preventDefault();
    try {
      const response = await axios.post('/api/friends');
      friends.push(response.data);
      render(friends);
    }
    catch(ex){
      error.innerText = ex.response.data.error;
    }
  });
};

init();
*/