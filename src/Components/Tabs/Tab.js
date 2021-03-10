import React, { Component } from "react";
import PropTypes from "prop-types";
import Pantry from "../Pantry/Pantry";

class Tab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      removeCategory: this.props.removeCategory,
    };
  }

  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    var xVal = "visible";
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    if(label == "+"){
      xVal = "hidden";
    }

    return (
        <li className={className} onClick={onClick}>
          {label}
          <button style={{visibility:xVal}} onClick={() => this.state.removeCategory(label)}>x</button>
        </li>
    );
  }
}

export default Tab;