import React from 'react';
import Modal from 'react-modal';
import Pantry from './Pantry'
import '../Tile/recipewindow.css';

const BarStyling = { width: "20rem", height: "2rem", background: "#F2F1F9", border: "bold", padding: "0.5rem" };

class CategoryModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
        this.updateSearch = this.updateSearch.bind(this);
        //this.handleOpen = this.handleOpen.bind(this)
        //this.handleExit = this.handleExit.bind(this)
    }

    updateSearch(value) {
        console.log(value)
        this.setState({
          keyword: value,
        });
      }

    render() {
        const keyword = this.state.keyword;
        return (
            <Modal
                isOpen={this.props.visible}
                onRequestClose={this.props.handleExit}
                animationType="fade"
                transparent={true}
                contentLabel="Add Category"
            >
                <button className="button-style" onClick={this.props.handleExit}>← Close</button>
                <input
                    style={BarStyling}
                    key="categoryModal"
                    value={keyword}
                    placeholder={"Add category"}
                    onChange={(e) => this.updateSearch(e.target.value)}
                />
                <button onClick={()=>this.props.updateCategories(keyword)}>
                    Add
                </button>
            </Modal>
        );
    }
}

export default CategoryModal;

/*props.updateCategories()*/