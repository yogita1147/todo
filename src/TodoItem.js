import React from "react";
import './App.css';

function TodoItem({todo,deleteItem,statusSetter,checkFun,checkVisible})
{
    console.log(todo,'prop');
   
    
    return(
        <>
          {
            todo.map((eachItem)=>{
             return(
                <div key={eachItem.sno} className='eachItem'>
                
                <h4>{eachItem.heading.toUpperCase()}</h4>
                <h5>{eachItem.description}</h5>
                {/* <h4>{eachItem.color}</h4> */}
                <h6 style={{textAlign:'right'}}>{eachItem.hour}:{eachItem.min}</h6>
                <h6 id='statusHeading'style={{textAlign:'right',color:eachItem.color}}>{eachItem.status}</h6>
                {!checkVisible?<button style={{color:'red'}} onClick={()=>{deleteItem(eachItem.sno)}}>DELETE</button>:null}

                {eachItem.visiblePending?<button style={{color:'green'}} onClick={()=>{statusSetter('PENDING',eachItem.sno,eachItem.color)}}>PENDING</button>:null}
                {eachItem.visibleInprogress?<button style={{color:'orange'}} onClick={()=>{statusSetter('INPROGRESS',eachItem.sno);eachItem.visiblePending =false}}>INPROGRESS</button>:null}
                <button style={{color:'blue'}}onClick={()=>{statusSetter('COMPLETED',eachItem.sno);eachItem.visibleInprogress=false;eachItem.visiblePending=false}}>COMPLETED</button>
                <br/><br/>{checkVisible?<input className="checkBox" type='checkbox'onChange={(e)=>{(eachItem.check=e.target.checked );checkFun(e,eachItem.check);;console.log(eachItem.check,'insidee');}}/>:null}
                </div>
             )
            })
          }
        
        </>
    )
}
export default TodoItem;