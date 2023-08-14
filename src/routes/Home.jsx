import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Title from "../components/Title";

import { useFirestoreState } from "../hooks/useFirestoreState";
import {formValidate} from "../utils/formValidate";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { errorsFirebase } from "../utils/errorsFirebase";

const Home = () => {
  const {data, loading, error, addData, deleteData, getData, updateData} = useFirestoreState(); 

  const [newOriginID, setNewOriginID] = useState();
  const { required, patternUrl } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  useEffect(() => { 
    getData();
  }, []);

  const loadingData = loading.getData && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>; 
  
  const handleClickDelete  = async (nanoid) => {
      await deleteData(nanoid);
  };

  const onSubmit = async ({ url }) => {
    try {  
      if (newOriginID) { 
        await updateData(newOriginID, url);
      } else {
        await addData(url);
      }
      setNewOriginID("");
      resetField("url");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };
  
  const handleClickEdit  = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const [copy, setCopy] = useState({});

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy((prev) => ({ ...prev, nanoid }));
  };


  return (
    <> 
      <Title text="Home" />
      {loadingData}
      {errorData} 

      <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Ingresa URL"
            placeholder="https://bluuweb.org/me-gusta-este-video"
            {...register("url", {
              required,
              pattern: patternUrl,
            })}
            error={errors.url}
          >
             <FormError error={errors.url} />
          </FormInput>
      </form>
      
      {
        data.map((item) => (
          <article
            key={item.nanoid}
            className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {window.location.href + item.nanoid}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.origin}
            </p>
            <div className="flex space-x-2">
              <Button
                type="button"
                text="Delete"
                color="red"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button
                type="button"
                text="Edit"
                color="yellow"
                onClick={() => handleClickEdit(item)}                
              />
              <Button
                type="button"
                text={copy?.nanoid === item.nanoid ? "Copied!" : "Copy ShortUrl"}
                color="indigo"
                onClick={() => handleClickCopy(item.nanoid)}
              />

            </div>
          </article>
        ))
      } 
    </>
  );
};

export default Home;
