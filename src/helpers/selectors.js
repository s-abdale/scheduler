export function getAppointmentsForDay(state, day) {
  const appointmentsOutput = [];
  const daysArray = state.days;
  const appointmentsObj = state.appointments;

  daysArray.forEach(availableDay => {
    if (availableDay.name === day){
      availableDay.appointments.forEach(bookedAppointment => {
        appointmentsOutput.push(appointmentsObj[bookedAppointment])
      })
      
    }
  })
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
  // const days = state.days;
  const result = [];

  for (const availableDay of state.days) {
    if (availableDay.name === day) {
      for (const interviewerID of availableDay.interviewers){
        result.push(state.interviewers[interviewerID]);
      }
    }
  }
  return result;
}