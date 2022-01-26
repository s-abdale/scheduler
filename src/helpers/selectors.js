export function getAppointmentsForDay(state, day) {
  const appointmentsOutput = [];
  const daysArray = state.days; // one big array
  const appointmentsObj = state.appointments; // one big object

  // loop through to state.days array to find name=day
  daysArray.forEach(availableDay => {
    if (availableDay.name === day){
      // takes us to the object with the correct day
      if (availableDay.appointments.length === 0) {
        // validation: what if there are no appointments? return empty array
        return []
      } else {
        // success: now loop through appointments and compare each one to the items in appointmentsObj
        availableDay.appointments.forEach(bookedAppointment => {
          appointmentsOutput.push(appointmentsObj[bookedAppointment])
        })
      }
    }
  })
  //... returns an array of appointments for that day
  return appointmentsOutput;
}