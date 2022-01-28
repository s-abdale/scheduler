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
};

export function getInterview(state, interview) {
  const interviewOutput = {};

  for (const data in state.interviewers) {

    if (interview && (state.interviewers[data].id === interview.interviewer)) {
      interviewOutput["student"] = interview.student;
      interviewOutput["interviewer"] = state.interviewers[data];
      
      return interviewOutput
    }
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  const days = state.days;
  const result = [];

  for (let availableDay of days) {
    if(availableDay.name === day) {
      for (let interviewersDay of availableDay.appointments) {
        result.push(state.appointments[interviewersDay]);
      }
    }
  }
  return result;
}