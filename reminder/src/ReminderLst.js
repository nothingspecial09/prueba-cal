import React from 'react'

export default function ReminderLst({reminders}) {
  return (
    <div>
    {
        reminders.map(
            reminder=>{
                return <Reminder key={item.id} Reminder={reminder}/>
            }
        )
    } 
    </div>
  )
}
