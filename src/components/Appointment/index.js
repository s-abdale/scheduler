import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  function confirm() {
    console.log(`confirming`);

    transition(CONFIRM);
  }

  function cancel() {
    console.log(`cancelling`);

    transition(DELETING);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }



  return(
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirm}
        />
      )}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)} 
          onSave={save}
          onDelete={confirm}
        />
      }

      {mode === SAVING && <Status message="Saving"/>}

      {mode === DELETING && <Status message="Deleting"/>}

      {mode === CONFIRM && 
        <Confirm 
          message="Delete the appointment?"
          onConfirm={cancel}
          onCancel={()=> back()}
        />
      }

    </article>
  );
}