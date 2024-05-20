import React, { useState } from 'react'
import { addPasswordToUser, getUserData } from '../FirebaseFunctions';

export default function AddPassword({userData, update}) {
    
    const [isOpen, setIsOpen] = useState(false);

    const [record, setRecord] = useState({
      name: '',
      link: '',
      username: '',
      password: '',
    });
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleChange = (e) => {

      const { name, value } = e.target;
      
      setRecord((prevRecord) => ({
          ...prevRecord,
          [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Handle form submission

        let oldRecord = record;

        const oldPassword = record.password

        oldRecord.password = oldPassword

        await addPasswordToUser(userData, oldRecord)
        
        console.log(userData)
        console.log(userData.UUID)
        
        const newUser = await getUserData(userData.UUID)
        
        update(newUser)
        setIsOpen(!isOpen)

    }
  
    return (
      <div className="collapsible-tile">
        <div className="header">
          <h3>Add Password</h3>
          <button className="toggle-button" onClick={handleToggle}>
            {isOpen ? '▲' : '▼'}
          </button>
        </div>
        {isOpen ? (
          <div className="content">
            <form id="add-password-form" onSubmit={handleSubmit} >
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={record.name}
                  onChange={handleChange}
                  className="input-add-record"
                  required
                />
              </div>
              <div className="input-group">
                <label>Link:</label>
                <input
                  type="text"
                  name="link"
                  value={record.link}
                  onChange={handleChange}
                  className="input-add-record"
                  required
                />
              </div>
              <div className="input-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={record.username}
                  onChange={handleChange}
                  className="input-add-record"
                  required
                />
              </div>
              <div className="input-group">
                <label>Password:</label>
                <input
                  type="text"
                  name="password"
                  value={record.password}
                  onChange={handleChange}
                  className="input-add-record"
                  required
                />
              </div>
              
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : <></>}
      </div>
    );
}
