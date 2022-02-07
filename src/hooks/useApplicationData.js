import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  // setDay
  const setDay = day => setState({ ...state, day });

  // spotsRemaining
  function spotsRemaining() {

    // console.log(state.day); 
    // console.log(`STATE: `);
    // console.log(state);
    // console.log(`----`);
    
    const allDays = state.days;
    for (let day of allDays) {
      // console.log(`🤖 beep boop 💡`)
      // console.log(day.name)
      // console.log(day.spots)

      if (day.name === state.day) { // just go for state.day right?
        console.log(`🤵‍♂️ For ${state.day} we have ${day.spots} spots remaining`) // tells us spots remaining!

        // if cancelling, +1. if adding, -1. if nothing, show.

        // change day.spots based on appointments count

        // console.log(`appointments = appointmentsPerDay where interview != null`)

        // 1. count appointments; 2. set day.spots=5-appointments

        // count state.appointments where appointments.interview !== null

        // match days.appointments to state.appointments, then check if state.appointments.id.interview = null
        // console.log(`🌞 NEW DAY 🌻`);
        // console.log(`day.appointments: ${day.appointments}`);
        // console.log(`entire day: `);
        // console.log(day);
        // console.log(`day.id: `);
        // console.log(day.id);
        // console.log(`state.appointments: `);
        // console.log(state.appointments); // returns all 25

        let bookedAppointmentCount = 0;
        for (let appointment of day.appointments) {
          // console.log(`today's appointments`);
          // console.log(appointment)
          if (state.appointments[appointment].interview !== null) {
            // console.log(`we have an appointment! 🚀`);
            // console.log(state.appointments[appointment].interview);
            bookedAppointmentCount ++
          }
        }
        console.log(`booked appointments = ${bookedAppointmentCount}`);
        console.log(`remaining appointments = ${5 - bookedAppointmentCount}`);
        // console.log(`state.appointments.[id].interview: ${state.appointments[day.id].interview !== null }`); // returns true if populated, null if not


        // now set day.spots to remaining appointments
        day.spots = (5 - bookedAppointmentCount);
        // day.spots=20;
      } 
    }
    
    // console.log(`📡 todays date is: ${state.day}`)
    
  };
  spotsRemaining();



  // bookInterview
  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    console.log(`booking interview, spots remaining ...`);
    spotsRemaining();


    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(setState({
        ...state,
        appointments
      }))
    )
  };

  // cancelInterview
  function cancelInterview(id) {
    console.log(`cancelling interview`);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    console.log(`cancelling interview! spots remaining ...`);
    spotsRemaining();


    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`, {id})
      .then(setState({
        ...state,
        appointments
      }))
    )
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}