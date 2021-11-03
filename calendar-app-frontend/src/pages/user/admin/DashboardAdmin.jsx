import { useState, useEffect } from "react";
import DashboardNav from "../../../components/DashboardNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { allRooms, deleteRoom } from "../../../store/actions/room";
import { toast } from "react-toastify";
import SmallCard from "../../../components/cards/SmallCard/SmallCard";

const DashboardAdmin = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let { data } = await allRooms(auth.token);
    setRooms(data);
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteRoom(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadSellersHotels();
    }).catch((err) => {
      toast.error("Permission denied");
      console.log(err);
    });
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/rooms/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {rooms.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleHotelDelete={handleHotelDelete}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {connected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardAdmin;
