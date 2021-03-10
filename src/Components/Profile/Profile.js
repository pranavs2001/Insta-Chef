import React from 'react'
import fire from "../SignIn/fire";
import Modal from 'react-modal';
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
    this.NameForm = this.NameForm.bind(this);
    this.ChangePasswordForm = this.ChangePasswordForm.bind(this);
    this.DeleteAccountForm = this.DeleteAccountForm.bind(this);
    this.CurrentPasswordForm = this.CurrentPasswordForm.bind(this);
  }

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
      console.log("Updating Password, entered password = ", this.state.enteredPassword);
      const user =fire.auth().currentUser;
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

  toggleDeleteModal() {
    this.setState({
      requestDelete: !this.state.requestDelete,
      enteredPassword: '',
    })
  }

  deleteAccount() {
    const user = fire.auth().currentUser;
    console.log("Deleting account");
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


  NameForm(props) {
    return(
      <div>
        <p> Name: {props.user.displayName}</p>
        <p>
          Update name:
        <input
            value={this.state.newName}
            placeholder={"Enter name"}
            onChange={(e) => { this.setState({ newName: e.target.value }); }}
          />
        </p>
        <button onClick={this.updateUserName}>Update</button>
      </div>
    )
  }

  ChangePasswordForm(props) {
    return(
      <div>
        <p> New password:
              <input
            value={this.state.newPassword1}
            type="password"
            placeholder={"New Password"}
            onChange={(e) => {
              this.setState({
                updatedProfile: false,
                newPassword1: e.target.value,
              });
            }}
          />
        </p>
        <p> Confirm password:
              <input
            value={this.state.newPassword2}
            type="password"
            placeholder={"Confirm Password"}
            onChange={(e) => { this.setState({ newPassword2: e.target.value }); }}
          />
        </p>
        <button onClick={this.updatePassword}>Change Password</button>
      </div>
    )
  }

  CurrentPasswordForm() {
    return(
      <p> Current password:
            <input
          value={this.state.enteredPassword}
          type="password"
          placeholder={"Current Password"}
          onChange={(e) => { this.setState({ enteredPassword: e.target.value }); }}
        />
      </p>
    )
  }

  DeleteAccountForm() {
    return(
      <div>
        <button onClick={this.toggleDeleteModal}>DELETE ACCOUNT</button>
        <Modal
              isOpen={this.state.requestDelete}
              // onAfterOpen={afterOpenModal}
              // onRequestClose={closeModal}
              contentLabel="Request delete account"
          >
          <h1>ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT????</h1>
          <button onClick={this.toggleDeleteModal}>Cancel</button>
          <p>Enter password to confirm</p>
          <input
            value={this.state.enteredPassword}
            type="password"
            placeholder={"Enter Password"}
            onChange={(e) => {this.setState({enteredPassword: e.target.value});}}
          />
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
      <div>
        <h1>Account Info</h1>
        <hr/>
        <p style={{color: 'red'}}>
          {this.state.actionMsg !== '' ? this.state.actionMsg : null}
        </p>
        <this.NameForm user={user}/>
        <div>
          Email: {user.email}
        </div>
        <h2>Change Password</h2>
        <this.CurrentPasswordForm/>
        <this.ChangePasswordForm/>
        <this.DeleteAccountForm/>
      </div>
    );
  }
}


export default Profile;