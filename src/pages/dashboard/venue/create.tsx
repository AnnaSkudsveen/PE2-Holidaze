import { useNavigate } from "react-router-dom";
import VenueCreationForm from "../../../components/VenueCreationForm";

function VenueCreate() {
  const navigate = useNavigate();
  return (
    <VenueCreationForm
      onVenueSuccess={(id) => {
        console.log("Venue created with ID:", id);
        navigate(`/Venue/${id}`);
      }}
    />
  );
}

export default VenueCreate;
