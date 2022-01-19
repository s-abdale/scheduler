import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";




export default function InterviewerList(props) {

  const {interviewers, interviewer, setInterviewer} = props;
  const mappedInterviewers = interviewers.map((person , index) => { 
    return ( 
      <InterviewerListItem 
        key={index}
        id={person.id}
        name={person.name} 
        avatar={person.avatar} 
        selected={person.id === interviewer}
        setInterviewer={() => props.setInterviewer(person.id)}
      />
    )
  });


  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  );
}