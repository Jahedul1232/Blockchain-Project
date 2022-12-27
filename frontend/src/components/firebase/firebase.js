import { useState, useEffect } from "react";
import "./firebase.css";
// import "./doctor.css";
import { db } from "../../firabase_config";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

function Firebase_db() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newAddress, setnewAddress] = useState("");
  const [newGender, setnewGender] = useState("");
  const [newHeight, setnewHeight] = useState(0);
  const connectionRef = collection(db, "user");
  const createUser = async () => {
    await addDoc(connectionRef, {
      name: newName,
      age: Number(newAge),
      address: newAddress,
      gender: newGender,
      height: Number(newHeight),
      projectID: connectionRef.id,
    })
      .then((connectionRef) => {
        alert("Data successfully Submitted");
      })
      .catch((error) => console.log("Error in Adding Data ", error));
  };

  // useEffect(() => {
  //   (async () => {
  //     const colRef = collection(db, "user");
  //     const snapshot = await getDocs(colRef);
  //     const docs = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       data.id = doc.id;
  //       // console.log(data.id);

  //       return data;
  //     });
  //     console.log(docs);
  //   })();
  // }, []);

  const getUsers = async () => {
    const data = await getDocs(connectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(users);
    // console.log(`id is ${data.snapshot}`);
    // console.log("users are  : ", users[0]);
    // console.log(data._snapshot.docChanges[4].doc.key.path.segments[6]);
  };

  return (
    <div>
      <h2>Welcome to firebase database</h2>
      <div className="forms">
        <form>
          <div class="mb-6">
            <label
              // for="Patient Name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Patient Name
            </label>
            <input
              type="name"
              // id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              required
            />
          </div>
          <div class="mb-6">
            <label
              // for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Patient Age
            </label>
            <input
              type="Number"
              // id="age"
              placeholder="Age"
              onChange={(event) => {
                setNewAge(event.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label
              // for="Gender"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <input
              type="Gender"
              // id="gender"
              placeholder="Gender"
              onChange={(event) => {
                setnewGender(event.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label
              // for="Patient Address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="Name"
              // id="address"
              placeholder="Address"
              onChange={(event) => {
                setnewAddress(event.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label
              // for="Height"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Height
            </label>
            <input
              type="Number"
              // id="height"
              placeholder="Height"
              onChange={(event) => {
                setnewHeight(event.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </form>
      </div>
      <button className="save_button_design" onClick={createUser}>
        Save
      </button>
      <br />
      <button className="save_button_design" onClick={getUsers}>
        show Users
      </button>
      {users.map((user) => {
        return (
          <div className="cloud_data">
            <h3>SecretKey: {user.secKey}</h3>
            <p>Data: {user.encryptData}</p>
            <p>PatientID: {user.id}</p>
            {/* <h3>Name:{user.name}</h3>
            <p>Age:{user.age}</p>
            <p>Address:{user.address}</p>
            <p>Gender:{user.gender}</p>
            <p>Height:{user.height}</p> */}
          </div>
        );
      })}
    </div>
  );
}

export default Firebase_db;

// import { collection, getDocs, querySnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// import { useEffect, useState } from "react";

// function Firebase_db() {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     await getDocs(collection(db, "patient_info")).then((querySnapshot) => {
//       const newData = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setTodos(newData);
//       console.log(todos, newData);
//     });
//   };

//   return (
//     <div>
//       <h2>Weolcome to the firebase app</h2>
//     </div>
//   );
// }

// export default Firebase_db;
