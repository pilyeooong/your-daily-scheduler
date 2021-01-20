import React from 'react'
import { IEvent } from '../../typings/db'
import { EventItem } from './styles'

interface IProps {
  event: IEvent
}
const Event: React.FC<IProps> = ({ event }) => {
  return (
    <EventItem>
      {event.content}
    </EventItem>
  )
}

export default Event
