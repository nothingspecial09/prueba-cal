import React from 'react'

export default function Reminder(props) {

  function handleClick(id)
  {
    props.handleClick(id);
  }
  
  return (
    <div>
      <div class="reminder"  onClick={()=>{ handleClick(props.reminder.id) }} >
        <div>
          {props.reminder.time?formatTime(props.reminder.time):""}
        </div>
        <div class="reminder-text">
          {props.reminder.text}
        </div> 
      </div> 
    </div>
  )
}

function formatTime(t) {
  let pm="";
  let part = t.split(':');
  let hh =   part[0];
  let mm = part[1];
  
  pm= (hh < 12) ? 'a.m.': 'p.m.';
  if (hh > 12)  hh -= 12;
  if (hh == 0) hh = 12; 
  return hh + ':' + mm + ' ' + pm;
}

