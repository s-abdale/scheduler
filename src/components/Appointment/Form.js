import React, { useState } from 'react';

import Button from "../Button";

import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewers, setInterviewer] = useState(props.person || null);
  // const [interviewers, setInterviewer] = useState();


  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          // mappedInterviewers={mappedInterviewers}
          interviewers={props.interviewers}
          // onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}