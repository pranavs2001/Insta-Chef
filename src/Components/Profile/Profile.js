import React from 'react'
import fire from "../SignIn/fire";
import Modal from 'react-modal';
import './Profile.css'
import { faUser, faSearch, faWindowClose, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from 'react-bootstrap'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newPassword1: '',
      newPassword2: '',
      enteredPassword: '',
      actionMsg: '',
      requestDelete: false,
    };

    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.currentInfo = this.currentInfo.bind(this);
    this.ChangePasswordForm = this.ChangePasswordForm.bind(this);
    this.DeleteAccountForm = this.DeleteAccountForm.bind(this);
    this.CurrentPasswordForm = this.CurrentPasswordForm.bind(this);
  }

  // Update a user's name in firebase
  updateUserName() {
    const user = fire.auth().currentUser;
    if (this.state.newName !== '') {
      user.updateProfile({
        displayName: this.state.newName,
      }).then(() => {
        this.setState({
          actionMsg: "Username Updated",
          newName: '',
        });
      }).catch(() => {
        console.log("Error updating profile")
      })
    } else {
      this.setState({
        actionMsg: "Enter a username"
      })
    }
  }

  // Change a user's password
  updatePassword() {
    // Non-matching passwords
    if (this.state.newPassword1 !== this.state.newPassword2) {
      this.setState({
        actionMsg: "ERROR: Passwords must match",
      });
    } else {
      // Invalid password
      if (this.state.newPassword1.length < 6) {
        this.setState({
          actionMsg: "Invalid password"
        });
        return;
      }
      // Update password
      const user =fire.auth().currentUser;
      // authenticate
      fire.auth().signInWithEmailAndPassword(user.email, this.state.enteredPassword).then(() => {
        fire.auth().currentUser.updatePassword(this.state.newPassword1).then(() => {
          this.setState({
            newPassword1: '',
            newPassword2: '',
            actionMsg: "Password Updated",
          });
        }).catch(() => {
          this.setState({
            actionMsg: "Error updating password. Try signing in again"
          });
        })
      }).catch(() => {
        this.setState({
          actionMsg: "Entered current password is invalid",
        })
      })
    }
  }

  // Toggle the modal window to delete a profile
  toggleDeleteModal() {
    this.setState({
      requestDelete: !this.state.requestDelete,
      enteredPassword: '',
    })
  }

  // Delete a user's account
  deleteAccount() {
    const user = fire.auth().currentUser;
    console.log("Deleting account");
    // authenticate
    fire.auth().signInWithEmailAndPassword(user.email, this.state.enteredPassword).then(() => {
      user.delete().catch(() => {
        this.setState({
          requestDelete: false,
          actionMsg: "Error deleting account",
        })
      })
    }).catch(() => {
      this.setState({
          requestDelete: false,
          actionMsg: "Error deleting account",
        })
    })

  }

  currentInfo(props) {
    return(
      <div>
      <div>
        <h3>Current Info:</h3>
        <p> Name: {props.user.displayName}</p>
        <div>
            Email: {props.user.email}
        </div>
      </div>
        <h3> Update name: </h3>
          <div className="input-container">
            <icon className= "icon"> {<FontAwesomeIcon icon={faUser} />} </icon>
              <input
                className="input-field"
                type="text"
                name="name"
                value={this.state.newName}
                placeholder={"Enter name"}
                onChange={(e) => { this.setState({ newName: e.target.value }); }}
              />
          </div>
        <button onClick={this.updateUserName}>Change Username</button>
      </div>
    )
  }

  ChangePasswordForm() {
    return (
      <div>
        <form>
          <div className="input-container">
            <icon className= "icon"> {<FontAwesomeIcon icon={faKey} />} </icon>
            <input
              className = "input-field"
              value={this.state.newPassword1}
              type="password"
              placeholder={"New Password"}
              onChange={(e) => {
                this.setState({
                  updatedProfile: false,
                  newPassword1: e.target.value,
                });
              }}
              autoComplete="new-password"
            />
          </div>
        </form>
        <form>
          <div className="input-container">
            <icon className= "icon"> {<FontAwesomeIcon icon={faKey} />} </icon>
            <input
              className = "input-field"
              value={this.state.newPassword2}
              type="password"
              placeholder={"Confirm Password"}
              onChange={(e) => { this.setState({ newPassword2: e.target.value }); }}
              autoComplete="new-password"
            />
          </div>
        </form>
        <button onClick={this.updatePassword}>Change Password</button>
      </div>
    )
  }

  CurrentPasswordForm() {
    return (
      <div>
        <form>
          <div className="input-container">
            <icon className= "icon"> {<FontAwesomeIcon icon={faKey} />} </icon>
            <input
              className = "input-field"
              value={this.state.enteredPassword}
              type="password"
              placeholder={"Current Password"}
              onChange={(e) => { this.setState({ enteredPassword: e.target.value }); }}
              autoComplete="current-password"
            />
          </div>
        </form>
      </div>
    )
  }

  DeleteAccountForm() {
    return(
      <div>
        <h3>Delete Acount:</h3>
        <button onClick={this.toggleDeleteModal}>DELETE ACCOUNT</button>
        <Modal
              isOpen={this.state.requestDelete}
              // onAfterOpen={afterOpenModal}
              // onRequestClose={closeModal}
              contentLabel="Request delete account"
          >
          <h1>ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT?</h1>
          <button onClick={this.toggleDeleteModal}>Cancel</button>
          <h1>Enter password to confirm:</h1>
          <form>
            <div className="input-container">
              <icon className= "icon"> {<FontAwesomeIcon icon={faKey} />} </icon>
              <input
                className = "input-field"
                value={this.state.enteredPassword}
                type="password"
                placeholder={"Enter Password"}
                onChange={(e) => {this.setState({enteredPassword: e.target.value});}}
                autoComplete="current-password"
              />
            </div>
          </form>
          <button onClick={this.deleteAccount}>
            Confirm Delete
          </button>
        </Modal>
      </div>
    )
  }

  render() {
    const user = fire.auth().currentUser;
    return (
      <div className="main-profile-box">
        <div>
          <h1>Account Info</h1>
          <hr/>
          <p style={{color: 'red'}}>
            {this.state.actionMsg !== '' ? this.state.actionMsg : null}
          </p>
          <this.currentInfo user={user}/>
          <h3>Change Password:</h3>
          <this.CurrentPasswordForm/>
          <this.ChangePasswordForm/>
          <this.DeleteAccountForm/>
        </div>
      </div>
    );
  }
}


export default Profile;