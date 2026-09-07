import { Link } from "react-router-dom";

import Header from "../components/Header";
import CalendarView from "../components/CalendarView";

function Calendar() {
    return (
        <div className="app">

            <div className="calendar-page">

                <Header />

                <div className="calendar-header">

                    <div>

                        <h2>
                            📅 Interactive Calendar
                        </h2>

                        <p>
                            Manage and visualize scheduled posts efficiently.
                        </p>

                    </div>

                    <Link
                        to="/dashboard"
                        className="back-btn"
                    >
                        ← Dashboard
                    </Link>

                </div>

                <CalendarView />

            </div>

        </div>
    );
}

export default Calendar;
