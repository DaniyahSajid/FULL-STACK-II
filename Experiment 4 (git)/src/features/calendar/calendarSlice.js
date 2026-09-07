import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    events: [],

};

const calendarSlice = createSlice({

    name: "calendar",

    initialState,

    reducers: {

        addEvent(state, action) {

            state.events.push(action.payload);

        },

        moveEvent(state, action) {

            const {

                id,

                start,

                end,

            } = action.payload;

            const event = state.events.find(

                (item) => item.id === id

            );

            if (event) {

                event.start = start;

                event.end = end;

            }

        },

        deleteEvent(state, action) {

            state.events = state.events.filter(

                (item) => item.id !== action.payload

            );

        },

        clearEvents(state) {

            state.events = [];

        },

    },

});

export const {

    addEvent,

    moveEvent,

    deleteEvent,

    clearEvents,

} = calendarSlice.actions;

export default calendarSlice.reducer;