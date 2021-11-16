import React, { useState, useEffect } from "react";
import { getRoom, diffDays } from "../../store/actions/room";
import moment from "moment";
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import OrderCard from "../../components/cards/OrderCard/OrderCard";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ViewRoom = ({ match, history }) => {
  const [room, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    let res = await getRoom(match.params.roomId);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/room/image/${res.data._id}`);
  };

  const handleHotelDelete = async (roomId) => {
    console.log(roomId);
    confirm({
      title: "Do you Want to delete this room?",
      icon: <ExclamationCircleOutlined />,
      content:
        "You can delete the room if there's no any active orders for the room.",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{room.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 px-5 mt-2">
            {room._id && <Calendar roomId={room._id} handleOrder={setOrder} />}
          </div>

          <div className="col-md-6">
              <h3>
                {room && (
            <div className="d-flex justify-content-end my-3">
                    <Link to={`/room/edit/${room._id}`} className="d-flex mx-3">
                      <EditOutlined className="text-warning " />
                    </Link>
                      <DeleteOutlined
                        onClick={() => handleHotelDelete(room._id)}
                        className="text-danger"
                      />
                </div>
                )}
              </h3>
            <br />
            <b>{room.content}</b>
            <p className="alert alert-info mt-3">${room.price}</p>
            <p className="card-text"></p>
            {/* <p>
              From <br />{" "}
              {moment(new Date(room.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(room.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p> */}
            <div className="d-flex justify-content-end">
              <i>Posted by {room.postedBy && room.postedBy.name}</i>
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
