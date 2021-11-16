import { Divider } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./OrderCard.css";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import OrderEditModal from "../../modals/OrderEditModal/OrderEditModal";
import { patchOrder } from "../../../store/actions/order";

const { confirm } = Modal;

export default function OrderCard({ order }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderForm, setOrderForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleModalOk = async () => {
    setIsLoading(true);
    console.log(orderForm);
    await updateOrder(order._id, orderForm).then((res) => {
      console.log('--- update order', res);
    }).catch((err) => {
      console.log('--- update order', err);
    });

    // await this.addOrder(orderForm)
    //   .then((response) => {
    //     setIsModalVisible(false);
    //     setOrderForm({});
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setIsLoading(false);
  };

  const updateOrder = async (orderId, data) => {
    return await patchOrder(orderId, data);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setOrderForm({});
  };

  const handleModalChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const openEditModal = () => {
    setOrderForm(order);
    setIsModalVisible(true);
  };

  const handleOrderDelete = async (roomId) => {
    console.log(roomId);
    confirm({
      title: "Do you Want to delete this order?",
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
    <div className="orderCard">
      {!order && <div>Select an order to show details at here</div>}
      {order && (
        <div>
          <h3>Title: {order.title}</h3>
          <Divider />
          <div className="row">
            <div className="col">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">First name</th>
                    <td>{order.firstName ? order.firstName : "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last name</th>
                    <td>{order.lastName ? order.lastName : "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{order.phoneNumber ? order.phoneNumber : "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Order starts</th>
                    <td>
                      {moment(new Date(order.start)).format("MMMM Do YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Order ends</th>
                    <td>
                      {moment(new Date(order.end)).format("MMMM Do YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Amount</th>
                    <td>{order.amount ? order.amount : "-"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <h4>
                  {" "}
                  {order && (
                    <>
                      <EditOutlined
                        className="text-warning mx-3"
                        onClick={() => openEditModal()}
                      />
                      <DeleteOutlined
                        onClick={() => handleOrderDelete()}
                        className="text-danger"
                      />
                    </>
                  )}
                </h4>
              </div>
            </div>
          </div>
          <OrderEditModal
            values={orderForm}
            setValues={setOrderForm}
            handleChange={handleModalChange}
            handleOk={handleModalOk}
            handleCancel={handleModalCancel}
            visible={isModalVisible}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
