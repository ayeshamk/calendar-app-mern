import { useState, useEffect } from "react";
import { allRooms } from "../../store/actions/room";
import SmallCard from "../../components/cards/SmallCard/SmallCard";
import SearchForm from "../../components/forms/SearchForm/SearchForm";

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadAllrooms();
  }, []);

  const loadAllrooms = async () => {
    let res = await allRooms();
    setRooms(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Rooms</h1>
      </div>
      <div className="col">
        <br />
        <SearchForm />
      </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(rooms, null, 4)}</pre> */}
        {rooms.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;