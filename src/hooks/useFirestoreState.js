import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import {nanoid} from 'nanoid'
export const useFirestoreState = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});
  const uid = auth.currentUser?.uid;

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));  
      const q = query(collection(db, "urls"), where("uid", "==", uid));  
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data()); 
      setData(datos);
    } catch (error) { 
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const getDataParams = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, getDataParams: true }));
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().origin;
      } else {
        throw new Error("No se encontró el documento");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getDataParams: false }));
    }
  };

  const updateData = async (nanoid, newUrl) => {
    try {
      console.log(nanoid,newUrl);
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newUrl });
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newUrl } : item
        )
      );
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };
  
  const searchData = async (nanoid) => {
    try { 
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }; 

  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((doc) => doc.nanoid !== nanoid));
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = { nanoid: nanoid(6), origin: url, uid };
      console.log(newData);
      const docRef = doc(db, "urls", newData.nanoid);
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  return { data, error, loading, getData, getDataParams, updateData, searchData, deleteData, addData };
};
