import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestoreState } from "../../hooks/useFirestoreState";
import Title from "../Title";

const LayoutRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { searchData } = useFirestoreState();
  const params = useParams();

  useEffect(() => {
    searchData(params.nanoid).then((res) => {
      if (res.exists()) {
        location.href = res.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title text="Cargando redirección..." />;

  return <Outlet />;
};

export default LayoutRedirect;
