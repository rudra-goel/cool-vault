import React, { useState, useEffect } from 'react'

import { useAuth } from './contexts/AuthContext'

import { useNavigate } from "react-router-dom"

import { getUserData } from "./FirebaseFunctions.js"
import PasswordRecord from './Components/PasswordRecord.js'
import AddPassword from './Components/AddPassword.js'
import Loading from "./Loading.js"

export default function Home() {

  const { currentUser } = useAuth();

  const navigate = useNavigate()

  const [userData, setUserData] = useState();

  useEffect(() => {
    async function loadUserInfo() {
      if(!userData) {
        const docData = await getUserData(currentUser.uid)

        setUserData(docData)
      }
    }

    loadUserInfo(0)
  }, [])



  if(userData) {
    return (
      <div>
        <h1 className="welcome-label">Welcome back {userData.Name} </h1>
        <p className="note-under-title" >Your data is secured on Google's backend servers and encrypted via my custom encryption scheme</p>
        <AddPassword userData={userData} update={setUserData} />
        <div className="my-passwords">
          {
            userData.Records.map((record, i) => {
              return (
                <PasswordRecord id={i} key={i} data={record} userData={userData} update={setUserData} />
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Loading />
      </div>
    )
  }
}
