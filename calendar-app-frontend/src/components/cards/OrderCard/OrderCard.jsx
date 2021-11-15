import React from "react";
import { Divider } from "antd";
import "./OrderCard.css";
import moment from "moment";

export default function OrderCard({ order }) {
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
                    <td>{order.firstName ? order.firstName : "None"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last name</th>
                    <td>{order.lastName ? order.lastName : "None"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{order.phone ? order.phone : "None"}</td>
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
                    <td>
                      {order.amount? order.amount: 'None'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end mx-5">
                <button className="btn btn-block btn-lg pl-3 btn-warning mt-3">
                  Edit
                </button>
                <button className="btn btn-block btn-lg btn-danger mx-2 mt-3">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
