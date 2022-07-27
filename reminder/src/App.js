import React , {Component, useState,useRef,useMemo} from 'react';
import './App.css';
import { useTable } from 'react-table'
import Reminder from './Reminder'
import AddReminderBtn from './AddReminderBtn';


function App() {
  const reminderTextRef=useRef();
  const reminderTimeRef=useRef();
  const reminderDateRef=useRef();
  const selectedDay=useRef();
  const [reminders,setReminders]=useState([])
  const [calDays,setCalDays]=useState([])
  const [selected,setSelected]=useState([])
 

  var items=[];

  function getNextId()
  {
    return reminders.length+1;
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

  function handleSelected(w)
  {

    console.log(w);
    let reminder=reminders.find(x=>x.id==w);
    setSelected(reminder);
    reminderTextRef.current.value=reminder.text;
    reminderTimeRef.current.value=reminder.time;
    alert(reminder.when)
    reminderDateRef.current.value=((new Date(reminder.when)).getDate());
  }

  function handleCancel()
  {
    setSelected(null);
  }

  function handleSave()
  {
    if (!selected)return;
    selected.text=reminderTextRef.current.value;
    selected.time=reminderTimeRef.current.value;
    selected.when=  new Date(2022, 6, reminderDateRef.current.value) ;
    alert( selected.when);
    alert(  selected.id );
    let others=reminders.filter(x=>x.id!==selected.id);

    others.push(selected);
    setReminders(others);
    setSelected(null);
    console.log(reminders)
  }
  function handleAddNew(){
    let newReminder={id:getNextId(),  day:null,text:'' ,time:'', when:new Date()};
    alert("new id " + newReminder.id);
     setSelected(newReminder);
  
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getReminderText(key)
  {
    let calDate=calDays.find(x=>x.key==key);
    console.log("qqqqq:",calDate);
 
    if(!calDate || !calDate.when) return "-";
    
    let q=reminders.filter(x=>x.when==calDate.when);
    console.log(q);
    if(!q) return "*";
    return q ?<> 
      {q.map(r=>(
       <> 
          <div  >
            <Reminder reminder={r} handleClick={handleSelected}/>
          </div> 
       </>
      ) )}
      </>:""
  }
  const getCalValues=()=>{
    setSelected(null)
    console.log("getCalValues called!!!")

    let dayLst=[];
    
    let curr=(new Date());
    let firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
    let lastDay = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let prev = new Date(curr.getFullYear(), curr.getMonth(), 0);
    let start=prev.getDate()-firstDay.getDay();
    console.log(start);
    var ids=1;
    let calItems=[];
    for(let i=1;i<7*7;i++)
    {
      let x=new Date(prev.getFullYear(),prev.getMonth(),(start+i));
      dayLst.push(x);
    }
    let weekLst=[];
    for(let i=0;i<6;i++)
    {
      weekLst.push(
        {
          col1: <div class={dayLst[(i*7)].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)].getDate()}</div>,
          col2: <div class={dayLst[(i*7)+1].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+1].getDate()}</div>,
          col3: <div class={dayLst[(i*7)+2].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+2].getDate()}</div>,
          col4: <div class={dayLst[(i*7)+3].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+3].getDate()}</div>,
          col5: <div class={dayLst[(i*7)+4].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+4].getDate()}</div>,
          col6: <div class={dayLst[(i*7)+5].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+5].getDate()}</div>,
          col7: <div class={dayLst[(i*7)+6].getMonth()==curr.getMonth() ? "td-div":"td-div2"}>{dayLst[(i*7)+6].getDate()}</div>,
        }
      );
      for(let j=1;j<8;j++){
        let s=dayLst[(i*7)+j-1].toDateString();
        calItems.push({key:("cell_" + (i ) + "_col"+j),   when:s });
        items.push({id:ids++,  day:dayLst[i*7+j-1],text:'' ,time:'', when:s,cell:("cell_" + (i ) + "_col"+j)});
 
      }
     
    }
    setReminders(items);
    if(calItems && calItems.length> 40) setCalDays(calItems);
    
   // console.log(calDays);
    return weekLst;
  }
  
  const data = React.useMemo(
    () =>  getCalValues()
      ,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sunday',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Monday',
        accessor: 'col2',
      },
      {
        Header: 'Tuesday',
        accessor: 'col3',
      },
      {
        Header: 'Wednesday',
        accessor: 'col4',
      },
      {
        Header: 'Thursday',
        accessor: 'col5',
      },
      {
        Header: 'Friday',
        accessor: 'col6',
      },
      {
        Header: 'Saturday',
        accessor: 'col7',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <>
    <div class="edit-box" hidden={selected?false:true}>
      <div>
        <label>Reminder Date: </label>
        <input ref={reminderDateRef}  type="number"/> 
      </div>
     
      <div>
        <label>Reminder Time: </label>
        <input ref={reminderTimeRef} type="time" />
      </div>

      <div>
        <label>Reminder Text: </label>
        <input ref={reminderTextRef} type="text" maxlength="30" />
      </div>

      <div>
        <button onClick={handleSave}>Save</button><button onClick={handleCancel}>Cancel</button>
      </div>      
    </div>
    
    <table {...getTableProps()} style={{ border: 'solid 1px #ccc' }} class="cal-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px #abf',
                  background: 'white',
                  color: 'black',
                  fontWeight: '500',
                  
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td 
                    
                    {...cell.getCellProps()}
                    style={{
                      padding: '5px',
                      border: 'solid 1px gray',
                      width:80,
                      height:80,
                      background: 'white',
                      verticalAlign:'top'
                    }}
                  >
                    <div class="calday-number">
                      { cell.render('Cell') }
                      <AddReminderBtn getCellProps={cell.getCellProps} handleClick={handleAddNew} />
                    </div>


                    <div class="reminder-text">
                    {  getReminderText(cell.getCellProps().key) }
                    </div>
                    
               
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

export default App;
