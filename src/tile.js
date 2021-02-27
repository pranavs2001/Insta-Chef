import React from 'react';
import './tile.css';

class Tile extends React.Component {//prop inputs: image, title, instr, link, ingred, meas
  constructor(props) {
    super(props);
    this.state = {
      flipped = false,
    };
  }

  flipTile() {
    this.state.flipped = !this.state.flipped;
  }

  ingredList(ingred, meas) {
    var listItems = ""

    for(i = 0; i < ingred.length; i++) {
      listItems = listItems + " " + ingred[i] + " " + "(" + meas[i] + ")" + ","
    }

    return listItems
  }

  render() {//button composed of image, the name of recipe, then link
    const flip = this.state.flipped;

    if(flip) {
      return (
        <button class="tile-back" onClick={this.flipTile}>
          <h5>Ingredients:</h5>
          <br/>
          <p>{this.ingredList(this.props.ingred, this.props.meas)}</p>
          <br/>
          <p>{this.props.instr}</p>
        </button>
      );
    } else {
      return (
        <button class="tile-front" onClick={this.flipTile}>
          <img src={this.props.image} width="100" height="100"/>
          <br/>
          <h3>{this.props.title}</h3>
          <br/>
          <input type="button" target="_blank" rel="noopener noreferrer" onclick={this.props.link} value="Video" />
        </button>
      );
    }
  }
}

export default Tile;