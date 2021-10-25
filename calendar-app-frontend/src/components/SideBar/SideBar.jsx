import React from 'react'
import './SideBar.css'
import { formatDate } from '@fullcalendar/react'

export default class Sidebar extends React.Component {

  state = {
    currentEvents: []
  }

  render() {
    return (
        <div className='sidebar'>
          <div className='sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='sidebar-section'>
            <h2>All Events ({this.props.allEvents.length})</h2>
            <ul>
              {this.props.allEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        </div>
      )
  }
}

function renderSidebarEvent(event, id) {
    return (
      <li key={id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }