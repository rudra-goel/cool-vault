import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { updatePasswordRecord, getUserData, deletePasswordRecord } from '../FirebaseFunctions';
import { stringToBinary } from '../Encryption';


export default function PasswordRecord({ id, data, userData, update }) {  

    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [isDeleteToggled, setIsDeleteToggled] = useState(false)

    let asterisk = "";
    for(let i = 0; i < data.password.length; i++) {
        asterisk+="*"
    }

    const [password, setPassword] = useState(asterisk)


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleDeleteSwitch = () => {
        setDeleteActive(!deleteActive)
        setIsDeleteToggled(!isDeleteToggled)
    }

    const toggleEditActive = () => {
        setEditActive(!editActive)
    }

    const updatePassword = async () => {
        const newLink = document.getElementById("edit-record-link").value
        const newUsername = document.getElementById("edit-record-username").value
        const newPassword = document.getElementById("edit-record-password").value

        if (newLink.length != 0) {
            data.link = newLink
        }

        if (newUsername != 0) {
            data.username = newUsername
        }

        if (newPassword.length != 0) {
            data.password = newPassword
            asterisk = "";
            for(let i = 0; i < data.password.length; i++) {
                asterisk+="*"
            }
            setPassword(asterisk)
        }

        await updatePasswordRecord(userData, data)

        const newUser = await getUserData(userData.UUID)
        
        update(newUser)

        setEditActive(!editActive)
    }

    const deletePassword = async () => {
        console.log(`Delete ID: ${id}`)
        await deletePasswordRecord(userData, data)

        const newUser = await getUserData(userData.UUID)
        toggleDeleteSwitch();
        update(newUser)
    }

    if(editActive === false) {
        return (
          <div className="dropdown-record">
            <div className="dropdown-header-record" onClick={toggleDropdown}>
              {data.name}
            </div>
            {isOpen && (
              <div className="dropdown-content-record">
                <label className="label-record">
                  Link:<>         </>
                  <a href={data.link} target="_blank"  className="record-link">{data.link}</a>
                </label>
                <label className="label-record">
                  <label className="record-username">Username/Email:  {data.username}</label>
                </label>
                <label className="label-record">
                  Password:
                  <div className="password-field-record">
                    <label className="input-record">{ showPassword ? data.password : password }</label>
                  </div>
                </label>
                <button className="password-toggle-record" onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
                <button className="edit-button-record" onClick={toggleEditActive}>Edit</button>
                <div className="dropdown-buttons-record">
                  <FormGroup >
                      <FormControlLabel control={<Switch color="warning" onChange={toggleDeleteSwitch} checked={isDeleteToggled}/>} label="Confirm Delete Record" />
                  </FormGroup>
                  {
                      !deleteActive ? 
                      <button className="delete-button-record-disabled" disabled>Delete</button>
                      :
                      <button className="delete-button-record" onClick={deletePassword}>Delete</button>
                  }            
                </div>
              </div>
            )}
          </div>
        )
    } else {
        return (
          <div className="dropdown-record">
            <div className="dropdown-header-record" onClick={toggleDropdown}>
              {data.name}
            </div>
            {isOpen && (
              <div className="dropdown-content-record">
                <label className="label-record">
                  Link:  
                  <input placeholder={data.link} id="edit-record-link" type="text" className="input-add-record" />
                </label>
                <label className="label-record">
                  Username/Email:
                  <input placeholder={data.username} id="edit-record-username" type="text" className="input-add-record" />
      
                </label>
                <label className="label-record">
                  Password:
                  <input placeholder={data.password} id="edit-record-password" type="text"  className="input-add-record" />
                </label>
                <div className="dropdown-buttons-record">
                  <button className="save-button-record" onClick={updatePassword}>Save</button>
                  <button className="delete-button-record" onClick={toggleEditActive}>Exit</button>       
                </div>
              </div>
            )}
          </div>
        )
    }
    
}