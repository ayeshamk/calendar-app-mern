import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import Sidebar from "../SideBar/SideBar";
import axios from "../../axios";
export default class Calendar extends React.Component {
  state = {
    currentEvents: [],
  };

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    console.log('-- state', this.state.currentEvents);
    return (
      <div className="calendar-app">
        <Sidebar allEvents={this.state.currentEvents}></Sidebar>
        <div>
          {this.state.currentEvents.map((event, id) => {
            return <div key={id}>{event.title}{event.start}</div>;
          })}{" "}
        </div>
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
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={function () {}}
            eventChange={this.handleEventChange}
            eventRemove={function () {}}
          />
        </div>
      </div>
    );
  }

  handleDateSelect = async (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    if (title) {
      const event = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: true,
      };
      await this.addEvent(event).then((res) => {
        this.setState({
          currentEvents: [...this.state.currentEvents, res.data],
        });
      });
    }
  };

  handleEventClick = async (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const eventId = clickInfo.event.extendedProps._id;
      await this.deleteEvent(eventId)
        .then((res) => {
          clickInfo.event.remove();
        })
        .catch((err) => {
          console.log("delete error", err);
        });
    }
  };

  handleEventChange = async (changeInfo) => {
    console.log(changeInfo.event);
    const eventId = changeInfo.event.extendedProps._id;
    const payload = changeInfo.event._instance.range;
    await this.updateEvent(eventId, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async updateEvent(eventId, payload) {
    const res = await axios.patch(`/events/${eventId}`, payload);
    console.log('---update', res.data);
    this.fetchEvents();
    return res;
  }

  async fetchEvents() {
    const res = await axios.get("/events");
    this.setState({
      currentEvents: res.data,
    });
  }

  async addEvent(event) {
    const res = await axios.post("/events", event);
    return res;
  }

  async deleteEvent(eventId) {
    const res = await axios.delete(`/events/${eventId}/`);
    this.fetchEvents();
    return res;
  }
}
