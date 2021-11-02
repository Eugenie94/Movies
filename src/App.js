import './App.css';
import { movies$ } from './movies';
import ReactDOM from 'react-dom';
import React, { Component } from "react";

class App extends Component {
  constructor(props, movies$){
    super(props)
    this.card = ""
    this.cardData = ""
    this.state = { data: [], isLoading: true };
    this.movies$ = movies$
    this.handleClick = this.handleClick.bind(this)
    this.render()
  }

  componentDidMount(){
      movies$.then(movies => {
        if(this.state.isLoading){
          this.setState({ data: movies })
        }
    })
  }
  componentWillUnmount() {
    this.state.isLoading = false
  }
  // setState(state => ({
     //     isLiked: !state.isLiked
     //   }));
  handleClick(id) {
    this.setState( prevState => {
      return prevState.data.map(movie => {
        if(movie.id == id){
          movie.likes++
        }
      }) 
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.data.map(movie =>
        <div key={movie.id} className="card">
        <h2>
          {movie.title}
        </h2>
        <p>
          {movie.category}
        </p>
        <div className="jauge">
        <progress id="file" max="100" value={(Number(movie.likes) / Number((movie.likes) + Number(movie.dislikes))) * 100 }>
        </progress>
        </div>
        <button type="button" onClick={() => this.handleRemove(movie.id)}>
          delete
        </button>
        <button onClick={() => this.handleClick(movie.id)}>
          {this.state.data.isLiked ? 'Dislike' : 'Like'}
        </button>
      </div>)}
      </div>
    );
  }

}

export default App
ReactDOM.render(<App />, document.getElementById("root"))
