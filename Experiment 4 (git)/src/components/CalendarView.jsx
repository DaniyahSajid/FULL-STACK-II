import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import {
    format,
    parse,
    startOfWeek,
    getDay,
} from "date-fns";

import { enUS } from "date-fns/locale";

import {
    postSelectors,
    updatePost,
} from "../features/posts/postSlice";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Calendar.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const platformInfo = {
    twitter: {
        icon: "🐦",
        name: "Twitter",
    },
    linkedin: {
        icon: "💼",
        name: "LinkedIn",
    },
    instagram: {
        icon: "📸",
        name: "Instagram",
    },
};

function CalendarView() {
    const drafts = useSelector(postSelectors.selectAll);
    const dispatch = useDispatch();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState("month");
    const [selectedDraft, setSelectedDraft] = useState(null);
    const [newSchedule, setNewSchedule] = useState("");

    const calendarEvents = useMemo(() => {
        return drafts
            .filter(
                (draft) =>
                    draft &&
                    draft.schedule &&
                    draft.schedule !== ""
            )
            .map((draft) => {
                const date = new Date(draft.schedule);

                const shortTitle =
                    draft.title && draft.title.length > 18
                        ? `${draft.title.substring(0, 18)}...`
                        : draft.title || "Untitled Draft";

                return {
                    id: draft.id,

                    title: `${
                        platformInfo[draft.platform]?.icon || "📄"
                    } ${shortTitle}`,

                    start: date,

                    end: new Date(
                        date.getTime() + 30 * 60000
                    ),

                    resource: draft,
                };
            });
    }, [drafts]);

    const handleReschedule = () => {
        if (!newSchedule) {
            alert("Please select a date & time.");
            return;
        }

        dispatch(
            updatePost({
                id: selectedDraft.id,
                changes: {
                    schedule: newSchedule,
                },
            })
        );

        setSelectedDraft({
            ...selectedDraft,
            schedule: newSchedule,
        });

        alert("Schedule updated successfully.");

        setSelectedDraft(null);
    };

    return (
        <>
            <div className="calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    date={currentDate}
                    view={currentView}
                    onNavigate={(date) => setCurrentDate(date)}
                    onView={(view) => setCurrentView(view)}
                    onSelectEvent={(event) => {
                        setSelectedDraft(event.resource);
                        setNewSchedule(event.resource.schedule);
                    }}
                    popup
                    selectable
                    toolbar
                    views={[
                        "month",
                        "week",
                        "day",
                        "agenda",
                    ]}
                    eventPropGetter={() => ({
                        className: "calendar-event",
                    })}
                    style={{
                        height: "78vh",
                    }}
                />
            </div>

            {selectedDraft && (
                <div
                    className="calendar-modal-overlay"
                    onClick={() => setSelectedDraft(null)}
                >
                    <div
                        className="calendar-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="calendar-modal-header">
                            <h2>
                                {selectedDraft.title ||
                                    "Untitled Draft"}
                            </h2>

                            <button
                                className="close-modal-btn"
                                onClick={() =>
                                    setSelectedDraft(null)
                                }
                            >
                                ✖
                            </button>
                        </div>

                        <p>
                            <strong>Platform:</strong>{" "}
                            {
                                platformInfo[selectedDraft.platform]
                                    ?.icon
                            }{" "}
                            {
                                platformInfo[selectedDraft.platform]
                                    ?.name
                            }
                        </p>

                        <p>
                            <strong>Scheduled:</strong>{" "}
                            {selectedDraft.schedule
                                ? new Date(
                                      selectedDraft.schedule
                                  ).toLocaleString()
                                : "Not Scheduled"}
                        </p>

                        {selectedDraft.image && (
                            <img
                                src={selectedDraft.image}
                                alt="Draft"
                                className="calendar-modal-image"
                            />
                        )}

                        <div className="calendar-content">
                            <strong>Post Content</strong>

                            <p>{selectedDraft.content}</p>
                        </div>

                        <hr
                            style={{
                                margin: "20px 0",
                            }}
                        />

                        <h3>Reschedule Draft</h3>

                        <input
                            type="datetime-local"
                            className="schedule-input"
                            value={newSchedule}
                            onChange={(event) =>
                                setNewSchedule(event.target.value)
                            }
                        />

                        <button
                            className="save-btn"
                            disabled={
                                newSchedule ===
                                selectedDraft.schedule
                            }
                            onClick={handleReschedule}
                            style={{
                                marginTop: "15px",
                                width: "100%",
                            }}
                        >
                            💾 Save New Schedule
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => setSelectedDraft(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CalendarView;