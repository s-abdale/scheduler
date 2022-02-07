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
  
    const allDays = state.days;

    for (let day of allDays) {

      if (day.name === state.day) {

        let bookedAppointmentCount = 0;
        for (let appointment of day.appointments) {
          if (state.appointments[appointment].interview !== null) {
            bookedAppointmentCount ++
          }
        }

        day.spots = (5 - bookedAppointmentCount);
      } 
    }    
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


    console.log(`booking interview, updating spots remaining ...`);
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


    console.log(`cancelling interview! updating spots remaining ...`);
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