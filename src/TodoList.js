import React, { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik ,handleBlur} from 'formik';
import { signUpSchema } from "./schema"
import * as yup from 'yup';
function TodoList({name}) {
////////////////////////////////////////////////
const [heading, setHeading] = useState("");
const [description, setDescription] = useState("");
const initialValues={heading1:'',description1:''};

const {values,errors,handleChange,handleBlur,handleSubmit,touched}=useFormik(
  {
    initialValues:initialValues,
    validationSchema:signUpSchema,
     
    onSubmit:(values,action)=>{console.log(values,'bjblkjxkjlkjlbk');action.resetForm();},
  }
   
)


 
  ////////////////////////////////////////////
  let initTodo = [];
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
    console.log("initTodo");
  } //mian linee...................................................

  console.log("rerender");
  const [time, setTime] = useState("");
  const [addShow, setAddShow] = useState(false);
  
  const [hr, setHr] = useState(0);
  const [sno1, setSno1] = useState(0);
  const [min, setMin] = useState("");
  const [todo, setTodo] = useState(initTodo);
  const [status, setStatus] = useState("");
  const [counter, setCounter] = useState(0);
  const [checkVisible,setCheckVisible]=useState(false);
  

  const FullTime = new Date();
  console.log(todo, "todo");
  useEffect(() => {
    console.log(localStorage.getItem("todos"), "getting");
    localStorage.setItem("todos", JSON.stringify(todo));
    setHr(FullTime.getHours());
    setMin(FullTime.getMinutes());
  }, [hr, todo, sno1]);

  const addFunction = () => {
    if(description==='' || heading==='')
    {
     alert('Please fill the heading and description');
    return;
     }
    console.log(FullTime, "ft");
    console.log(FullTime.getHours());
    const hr1 = FullTime.getHours().toString;
    console.log(typeof hr1, "type");
    const hrgetter = FullTime.getHours();
    console.log(typeof hrgetter);
    setHr(hrgetter);
    console.log(hr, "after hour");
    setMin(FullTime.getMinutes());

    console.log(todo.length, "useS1ate addFunction");
    let sno;
    if (todo.length === 0) {
      sno = 1;
    } else {
      sno = todo[todo.length - 1].sno + 1;
    }

    const myList = {
      sno: sno,
      heading: heading,
      description: description,
      hour: hr,
      min: min,
      status: "PENDING",
      color: "green",
      check: false,
      visiblePending:true,
      visibleInprogress:true,
      visibleCompleted:true,
    };

    setTodo([...todo, myList]);
    console.log(myList, "myList");
    console.log(todo, "todo");

    setAddShow(false);
    setHeading("");
    setDescription("");
    console.log(localStorage.getItem("todos"), "jsiahlkhn");

    //main line........................................
    localStorage.setItem("todos", JSON.stringify(todo));
  };

  const deleteItem = (sno) => {
    console.log(sno);
    const updated1 = todo.filter((each) => {
      return each.sno != sno;
    });
    setTodo(updated1);
    setStatus("Completed");
    setCheckVisible(false);
  };

  const statusSetter = (statusNew, snoEach, colorEach) => {
    // const selectedItem=todo.filter((each)=>{return each.sno===snoEach});

    todo.map((each) => {
      if (each.sno === snoEach) {
        each.status = statusNew;
      }
    });
    if (statusNew === "PENDING") {
      todo.map((each) => {
        if (each.sno === snoEach) {
          each.color = "GREEN";
        }
      });
    } else if (statusNew === "COMPLETED") {
      todo.map((each) => {
        if (each.sno === snoEach) {
          each.color = "BLUE";
        }
      });
    } else if (statusNew === "INPROGRESS") {
      todo.map((each) => {
        if (each.sno === snoEach) {
          each.color = "orange";
        }
      });
    } else {
      todo.map((each) => {
        if (each.sno === snoEach) {
          each.color = "black";
        }
      });
    }

    // console.log(selectedItem,"selected");
    setStatus(statusNew);
  };

  const deleteMultiple = () => {
    
    console.log("deletemultiple called");
    console.log('counter',counter)
    if(todo.length===0)
    {
      alert('Please add Todo First ');
      return;
    }
    if(checkVisible==false)
    {
      setCheckVisible(true);
    }
    if (counter === 0) {
     
      
      console.log('counter',counter);
      alert("Please select atleast 1 Todo to Delete");
      return;
    }
    else{
      console.log(counter,'in else')
        const updated=todo.filter((each)=>{
          console.log(each.check,'insider ');
          return each.check != true;

        })
        const updatedTrue=todo.filter((each)=>{
          console.log(each.check,'insider ');
          return each.check != false;

        })
        console.log(updated,'upp');
        console.log(updated.length,'ufalse');
        console.log(updatedTrue.length,'uTrue')
        setCounter(counter-updatedTrue.length)
        
        setTodo(updated);
        setCheckVisible(false);
     
      
    }
    
    console.log(todo,'last');
  };
  console.log(todo,'lastoutside');


  const checkFun = (e, check) => {
    console.log(e.target.checked,'etc');
    if (e.target.checked === true) {
      setCounter(counter+1);
      console.log('counter incremented');
      console.log(check,'before');
      check=true;
      console.log(check,'after');
    } else {
      check=false;
      setCounter(counter-1);
      console.log('counter decremented');
    }
    console.log(counter,'c insidesite')
  };
  console.log(counter,'c outsite')
  //*************************
  return (
    <>
      <h1 className="heading">
        <u>TODOLIST</u>
      </h1>
      <h4>USER : {name}</h4>
      <p align="right" style={{ margin: "12px", padding: "5px" }}>
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={() => {
            deleteMultiple();
          }}
        >
          DELETE MULTIPLE
        </button>
      </p>

      <TodoItem
        todo={todo}
        hr={hr}
        min={min}
        deleteItem={deleteItem}
        status={status}
        statusSetter={statusSetter}
        checkFun={checkFun}
        checkVisible={checkVisible}
        
        
      ></TodoItem>
      <Button
        variant="success"
        onClick={() => setAddShow(true)}
        style={{ margin: "12px" }}
      >
        +
      </Button>
      {addShow ? (
        <Form onSubmit={handleSubmit} className="form">
          <h3 className="heading">
            <u>ADD ITEM FORM</u>
          </h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Heading of Todo</Form.Label>
            <Form.Control
              type="text"
              name="heading1"
              value={values.heading1}
              onBlur={handleBlur}

             

             onChange={(e)=>{handleChange(e);setHeading(e.target.value)}}
              placeholder="Enter Heading"
            /><br/>{errors.heading1 && touched.heading1?<p>{errors.heading1}</p>:<><br/></>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description1"
              value={values.description1}
              onChange={(e)=>{setDescription(e.target.value);handleChange(e)}} 
              onBlur={handleBlur}
            
              placeholder="Description"
            /><br/>{errors.description1 && touched.description1?<p>{errors.description1}</p>:null}
          </Form.Group>
          <input type='submit'value='add item' onSubmit={handleSubmit} variant="success" onClick={(e) =>{ addFunction();handleSubmit(e)}}/>
           
          
          {/* <input type='submit' value='submit'/> */}
        </Form>
      ) : null}
    </>
  );
}
export default TodoList;
