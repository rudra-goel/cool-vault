import { db } from "./FirebaseConfig.js"
import { collection, addDoc, where, getDoc, query, getDocs, doc, updateDoc } from "firebase/firestore"; 

export const createNewUser = async (name, email, uuid) => {

    const docObj = {
        Name:name,
        Email: email,
        UUID: uuid,
        Records: []
    }


    const docRef = await addDoc(collection(db, "userData"), docObj);

    const snapshot = await getDoc(docRef)

    const docData = snapshot.data()

    return docData

}

export const getUserData = async (uid) => {
    const q = query(collection(db, "userData"), where("UUID", "==", uid))

    const snapshot = await getDocs(q)



    let docData;
    
    snapshot.forEach((doc) => {
        docData = doc.data();
        docData.id = doc.id;
    })

    docData.Records.sort((a, b) => b.id - a.id);


    return docData
}

export const addPasswordToUser = async (userData, newRecord) => {
    if(!newRecord.id) {
        newRecord.id = userData.Records.length-1;
    }

    userData.Records.push(newRecord)

    console.log(userData)

    const docRef = doc(db, "userData", userData.id);

    await updateDoc(docRef, userData)
}

export const updatePasswordRecord = async (userData, newRecord) => {
    userData.Records.forEach(record => {
        if(record.id === newRecord.id) {
            record = newRecord
        }
    })

    console.log(userData)
    
    const docRef = doc(db, "userData", userData.id);
    
    await updateDoc(docRef, userData)
    
}

export const deletePasswordRecord = async (userData, recordToDelete) => {
    let index = -1;
    
    userData.Records.forEach((record, i) => {
        if (record.name === recordToDelete.name) {
            index = i
        }
    })

    console.log(index)
    console.log(userData)
    
    if(index != -1) {
        userData.Records.splice(index, 1)
    }
    
    const docRef = doc(db, "userData", userData.id);
    
    await updateDoc(docRef, userData)

}