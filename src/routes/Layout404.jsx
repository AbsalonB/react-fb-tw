import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Layout404 = () => { 
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
    return (
      <div className="container mx-auto">
        <h1 className="text-center">404</h1>
        <Button
                type="button"
                text="Regresar al inicio"
                color="yellow"
                onClick={handleClick}                
              />
      </div>
    );
  };
  export default Layout404;
  