import React from 'react'

export default function AddReminderBtn(props) {

    function handleClick()
    {
        let key=props.getCellProps().key;
       // console.log("> key:" + key);
        //props.handleClick(props.key);
        props.handleClick();
    }

 

    return (
        <div>
            
            <button class="add-reminder" onClick={handleClick}>
                +
            </button>
        </div>
    )
}
