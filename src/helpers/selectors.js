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
  // console.log(`🥦INTERVIEW OUTPUT: `, interviewOutput);
  return null;
};

export function getInterviewersForDay(state, day) {
  const days = state.days;
  const result = [];

  // console.log(`state: `,state); //runs twice

  for (let availableDay of days) {
    // console.log(`🚀🌌🛰FUNCTION🚀🌌🛰 day: `,availableDay);
    // console.log(state.interviewers["1"].name);
    // looking for state.interviewers.[id].name
    if(availableDay.name === day) {
      // console.log(`INTERVIEWERS PER DAY: `, availableDay.interviewers);
      // for (let interviewersDay of availableDay.appointments)
      for (let interviewersDay of availableDay.interviewers) {
        // result.push(state.appointments[interviewersDay]);
        // console.log(`INTERVIEWERS DAY: `, interviewersDay);
        // gets us the interviewers id's

        
        let interviewerID = state.appointments[interviewersDay].id;
        // console.log(state.interviewers[interviewerID]); // returns interviewer object
        // console.log(state.interviewers[interviewerID].name); // returns interviewer name
        result.push(state.interviewers[interviewerID]);

      }
    }
  }
  console.log("result: ", result);
  // console.log(`interviewer: `, interviewersDay)
  return result;
}