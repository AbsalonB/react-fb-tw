import { useEffect, useState } from "react";
import {db} from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

export const useFirestore = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      getData();
    },[])
    const getData = async()=>{
      try {
        setLoading(true);
        const querySanpshot = await getDocs(collection(db,'urls'));
        const dataDB = querySanpshot.docs.map(doc=>(doc.data()))
        setData(dataDB);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally{
        setLoading(false);
      }
    }
    return {
      data,
      error,
      loading,
    }
}

const updateData = async (nanoid, newUrl) => {
    try {
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