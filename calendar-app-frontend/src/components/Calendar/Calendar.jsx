import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getRoomOrders, newOrder, getOrder } from "../../store/actions/order";
import OrderCreateModal from "../modals/OrderCreateModal/OrderCreateModal";

import "./Calendar.css";
import axios from "../../axios";
export default class Calendar extends React.Component {
  state = {
    currentEvents: [],
    isModalVisible: false,
    eventForm: {},
    isLoading: false
  };



  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  setIsLoading = (isLoading) => {
    this.setState({
      isLoading: isLoading,
    });
  };
  setEventForm = (values) => {
    this.setState({
      eventForm: values,
    });
  };

  handleModalOk = async () => {
    this.setIsLoading(true);
    const event = this.state.eventForm;
    if (event.title) {
      await this.addOrder(event)
        .then((response) => {
          this.setState({
            currentEvents: [...this.state.currentEvents, response.data],
          });
          this.setState({
            isModalVisible: false,
          });
          this.setEventForm({});
        })
        .catch((err) => {
          console.log(err);
        });
      this.setIsLoading(false);
    }
  };

  handleModalCancel = () => {
    this.setState({
      isModalVisible: false,
      eventForm: {},
    });
  };

  handleModalChange = (e) => {
    this.setState({
      eventForm: { ...this.state.eventForm, [e.target.name]: e.target.value },
    });
  };
  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    return (
      <div className="calendar-app">
        <div className="calendar-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={this.state.currentEvents}
            select={this.handleDateSelect}
            eventClick={this.handleEventClick}
            eventContent={renderEventContent}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={function () {}}
            eventChange={this.handleEventChange}
            // eventRemove={function () {}}
          />
        </div>
        <OrderCreateModal
          values={this.state.eventForm}
          setValues={this.setEventForm}
          handleChange={this.handleModalChange}
          handleOk={this.handleModalOk}
          handleCancel={this.handleModalCancel}
          visible={this.state.isModalVisible}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }

  handleDateSelect = async (selectInfo) => {
    this.showModal();
    const event = {
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: true,
    };
    this.setState({
      eventForm: event,
    });
  };

  handleEventClick = async (clickInfo) => {
    const eventId = clickInfo.event.extendedProps._id;
    console.log(eventId);
    this.getOrder(eventId).then((res) => {
      console.log('---- order res', res);
      this.props.handleOrder(res.data)
    }).catch((err) => {
      console.log(err);
    })
    // await this.deleteOrder(eventId)
    //   .then((res) => {
    //     clickInfo.event.remove();
    //   })
    //   .catch((err) => {
    //     console.log("delete error", err);
    //   });
  };

  handleEventChange = async (changeInfo) => {
    console.log(changeInfo.event);
    const eventId = changeInfo.event.extendedProps._id;
    const payload = changeInfo.event._instance.range;
    await this.updateOrder(eventId, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async updateOrder(eventId, payload) {
    const res = await axios.patch(`/events/${eventId}`, payload);
    console.log("---update", res.data);
    this.fetchOrders();
    return res;
  }

  async fetchOrders() {
    const roomId = this.props.roomId;
    console.log(roomId);
    const res = await getRoomOrders(roomId);
    console.log("--- get room orders", res);
    this.setState({
      currentEvents: res.data,
    });
  }

  async addOrder(event) {
    event.roomId = this.props.roomId;
    const response = await newOrder(event);
    console.log("--- reee", response);
    return response;
  }

  async getOrder(orderId) {
    const response = await getOrder(orderId);
    return response;
  }

  async deleteOrder(eventId) {
    const res = await axios.delete(`/events/${eventId}/`);
    this.fetchOrders();
    return res;
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <div>{eventInfo.event.title}</div>
    </>
  );
}
