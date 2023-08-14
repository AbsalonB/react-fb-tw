import ButtonLoading from "./ButtonLoading"; 

const Button = ({ text, type, color = "indigo", loading, onClick }) => {
  if (loading) return <ButtonLoading />;

  const classButtonBase =
    "focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ";

  let classButtonColor;
  if (color === "indigo") {
    classButtonColor =
      "bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900";
  }
  if (color === "pink") {
    classButtonColor =
      "bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900";
  }
  if (color === "purple") {
    classButtonColor =
      "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
  }
  if (color === "red") {
    classButtonColor =
      "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
  }
  if (color === "blue") {
    classButtonColor =
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900";
  }
  if (color === "green") {
    classButtonColor =
      "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900";
  }
  if (color === "yellow") {
    classButtonColor =
      "bg-yellow-400 hover:bg-yellow-700 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900";
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={classButtonBase + classButtonColor}
    >
      {text}
    </button>
  );
};
export default Button;
