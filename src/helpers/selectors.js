export function getAppointmentsForDay(state, day) {
  const appointmentsOutput = [];
  const daysArray = state.days; // one big array
  const appointmentsObj = state.appointments; // one big object

  // loop through to state.days array to find name=day
  daysArray.forEach(availableDay => {
    if (availableDay.name === day){
      // takes us to the object with the correct day. now loop through appointments and compare each one to the items in appointmentsObj
      availableDay.appointments.forEach(bookedAppointment => {
        appointmentsOutput.push(appointmentsObj[bookedAppointment])
      })
      
    }
  })
  //... returns an array of appointments for that day
  return appointmentsOutput;
}

export function getInterview(state, interview) {
  const interviewOutput = {};

  for (const data in state.interviewers) {
    // going down one level to access id...
    if (interview && (state.interviewers[data].id === interview.interviewer)) {
      // if interview data exists, and the interviewers/interviewer objects match ...
      interviewOutput["student"] = interview.student; // pushes student name to obj
      interviewOutput["interviewer"] = state.interviewers[data]; // pushes interviewer.id,name,avatar to obj
      
      // returns an obj containing student and interviewer data
      return interviewOutput
    }
  }
  // returns null if the above fails
  return null;
}