import { useEffect, useState } from "react";
import { useFirestoreState } from "../hooks/useFirestoreState";
import { useParams } from "react-router-dom";
import Title from "../components/Title";

const Editar = () => {
  const params = useParams();
  const [url, setUrl] = useState("");
  const { getDataParams, loading, error, updateData } = useFirestoreState();

  useEffect(() => {
    console.log("getUrlDB");
    getDataParams(params.nanoid).then((res) => setUrl(res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(params.nanoid, url).then(() => navigate("/"));
  };
  

  const loadingData = loading.getDataParams && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;

  return (
    <>
      <Title text="Editar" />
      {errorData}
      {loadingData}
      {url !== "" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Editar</button>
        </form>
      )}
    </>
  );
};

export default Editar;
