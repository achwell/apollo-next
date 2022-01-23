import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UserEvent, deleteUserEvent, updateUserEvent } from '../../redux/user-events'
import { useDispatch } from 'react-redux'

interface Props {
    event: UserEvent
}

const EventItem: React.FC<Props> = ({ event }) => {
    const dispatch = useDispatch()
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id))
    }
    const [editable, setEditable] = useState<boolean>(false)
    const [title, setTitle] = useState(event.title);
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (editable) {
            inputRef.current?.focus()
        }
    }, [editable]);
    const handleTitleClick = () => {
        setEditable(true);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleBlur = () => {
        if (title !== event.title) {
            dispatch(
                updateUserEvent({
                    ...event,
                    title
                })
            )
        }
        setEditable(false)

    }

    return (
        <div className="calendar-event">
            <div className="calendar-event-info">
                <div className="calendar-event-time">10:00 - 12:00</div>
                <div className="calendar-event-title">
                    {editable ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <span onClick={handleTitleClick}>{event.title}</span>
                    )}
                </div>
            </div>
            <button
                className="calendar-event-delete-button"
                onClick={handleDeleteClick}
            >
                &times;
            </button>
        </div >
    )
}

export default EventItem
