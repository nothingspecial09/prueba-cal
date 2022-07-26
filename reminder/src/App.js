import React , {Component, useState,useRef} from 'react';
import './App.css';
import { useTable } from 'react-table'

function App() {
  const reminderTextRef=useRef();
  const reminderTimeRef=useRef();
  const selectedDay=useRef();
  const [reminders,setReminders]=useState([])
  const [selected,setSelected]=useState([])
  
  var items=[];

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
    setSelected(w);
    reminderTextRef.current.value=w.text;
    reminderTimeRef.current.value=w.time;
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
    let others=reminders.filter(x=>x.id!==selected.id);
    others.push(selected);
    setReminders(others);
    setSelected(null);
    console.log(reminders)
  }

  function getReminderText(id)
  {
    let q=reminders.find(x=>x.id==id);
    
    return q ?<> <div>{q.time?formatTime(q.time):""}</div><div>{q.text}</div> </>  : "";
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
      for(let j=0;j<8;j++){
        items.push({id:"cell_" + (i ) + "_col"+j ,day:dayLst[i*7+j-1],text:'' ,time:''});
      }
     
    }
    setReminders(items);
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
      <div>Date: {selected && selected.day? selected.day.getFullYear() + "-" +  selected.day.getMonth() + "-"+ selected.day.getDate():'-'}</div>
     
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
                  <td onClick={()=>{handleSelected( reminders.find(x=>x.id===cell.getCellProps().key) ); }} 
                    
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
