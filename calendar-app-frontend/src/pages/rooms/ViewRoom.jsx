import React, { useState, useEffect } from "react";
import { getRoom, diffDays } from "../../store/actions/room";
import moment from "moment";
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import OrderCard from "../../components/cards/OrderCard/OrderCard";

const ViewRoom = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    let res = await getRoom(match.params.roomId);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 px-5 mt-2">
            {hotel._id && (
              <Calendar roomId={hotel._id} handleOrder={setOrder} />
            )}
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-end mx-5">
              <button
                className="btn btn-block btn-lg pl-3 btn-warning mt-3"
                disabled={loading}
              >
                Edit
              </button>
              <button
                className="btn btn-block btn-lg btn-danger mx-2 mt-3"
                disabled={loading}
              >
                Delete
              </button>
            </div>
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text"></p>
            {/* <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p> */}
            <div className="d-flex justify-content-end">
              <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <OrderCard order={order} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRoom;
