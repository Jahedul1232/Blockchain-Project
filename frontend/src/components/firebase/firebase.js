import { useState, useEffect } from "react";
import { db } from "../../firabase_config";
import { collection, getDocs } from "firebase/firestore";

function Firebase_db() {
  const [users, setUsers] = useState([]);
  const connectionRef = collection(db, "patient_info");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(connectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getUsers();
  }, []);
  return (
    <div>
      <h2>Welcome to firebase database</h2>
      {users.map((user) => {
        return (
          <div>
            <h1>Name:{user.patient_name}</h1>
            <h2>Age:{user.patient_age}</h2>
          </div>
        );
      })}
      <button onClick={""}>Button</button>
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
