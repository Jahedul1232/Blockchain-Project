import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from "../../../firabase_config";

function LoginLandingPage() {
  // const [user, setUser] = useState();

  const location = useLocation();
  const docRef = doc(db, "cities", location.state.id);
  const docSnap = getDoc(docRef);
  // const doc = getDocFromCache(docRef);
  // console.log(docSnap.data.name);
  // console.log(docRef);
  // setUser(docSnap.data());
  // console.log(user);
  // const data = docSnap.data();
  // console.log(data.name);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // // console.log(location.state.id);
  // const userID = location.state.id;
  return (
    <div>
      <div>
        <h3></h3>
        <h2>welcome to Name</h2>
        {/* <h3>{docSnap.data()}</h3> */}
        {/* <p>{userID}</p> */}
      </div>
    </div>
  );
}

export default LoginLandingPage;
