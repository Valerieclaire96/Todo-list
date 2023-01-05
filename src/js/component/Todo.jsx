import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/valeriedubach")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  },[]);
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/valeriedubach", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  },[todos]);
  const addTodo = () => {
    setTodos([...todos, formValue]);
};
    const inputChange = (e) => {
      setFormValue({ label: e.target.value, done: false });
    };

    const removeTodo = (index) => {
      setTodos((todo) => {
        return todo.filter((item, i) => i !== index);
      });
    };
    return (
      <div>
        <div className="form-container">
          <input onChange={inputChange} type="text" />
          <button onClick={addTodo}>Add To-do</button>
        </div>
        <h2>Todos</h2>
        {todos.length
          ? todos.map((item, index) => {
              return (
                <h6>
                  {item.label}
                  <button onClick={() => removeTodo(index)}>X</button>
                </h6>
              );
            })
          : null}
      </div>
    );
};
export default Todo;
