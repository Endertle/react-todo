import { useEffect, useReducer, useState } from "react";
import Modal from "./Modal";
import "./ToDo.css";

const initialTodos = [
  {
    id: 2342,
    isChecked: true,
    activity: "Walk the dog",
  },
  {
    id: 2354,
    isChecked: false,
    activity:
      "Authenticate with passport-js Authenticate with passport-js Authenticate with passport-js Authenticate with passport-js Authenticate with passport-js Authenticate with passport-js",
  },
  {
    id: 2142,
    isChecked: false,
    activity: "Validate",
  },
];

const ACTIONS = {
  ADD_TODO: "ADD",
  DELETE_TODO: "DELETE",
  CHANGE_CHECKE_STATUS: "CHANGE STATUS",
  EDIT_TODO: "EDIT TODO",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const isAlreadyIncluded = state.filter((todo) => {
        return todo.activity === action.payload;
      });

      return !isAlreadyIncluded.length
        ? [
            ...state,
            {
              id: Math.floor(Math.random() * 5000),
              isChecked: false,
              activity: action.payload,
            },
          ]
        : [...state];

    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => {
        return todo.id != action.payload;
      });

    case ACTIONS.CHANGE_CHECKE_STATUS:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isChecked: !todo.isChecked };
        } else {
          return todo;
        }
      });

    case ACTIONS.EDIT_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, activity: action.payload.activity };
        } else {
          return todo;
        }
      });
    default:
      break;
  }
}

function ToDo() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const [activity, setActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [activityToEdit, setActivityToEdit] = useState("");
  // const [message, setMessage] = useState("");

  // Update document title
  useEffect(() => {
    if (!todos.length) {
      document.title = "Todo";
    } else {
      document.title = `Todo (${todos.length})`;
    }
  }, [todos.length]);

  // Submit function
  function handleSubmit(e) {
    e.preventDefault();

    if (activity != "") {
      dispatch({ type: ACTIONS.ADD_TODO, payload: activity });
    }

    setActivity("");
  }

  function handleEdit(id, activity) {
    setIsOpen(true);

    setIdToEdit(id);
    setActivityToEdit(activity);
  }

  function hello(name) {
    console.log(`hello ${name}`);
  }
  return (
    <>
      <div className="todo">
        <div className="todo-header">
          <h1>Todo {`${!todos.length ? "" : `(${todos.length})`}`}</h1>
        </div>
        <div className="todo-contents">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter todo here"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
            <button className="submit-todo">Submit</button>
          </form>
          {/* <p className="message">{message}</p> */}
          <ul className="todo-items">
            {todos.map((todo) => (
              <li className="item" key={todo.id}>
                <input
                  type="checkbox"
                  value={todo.activity}
                  checked={todo.isChecked}
                  onChange={() =>
                    dispatch({
                      type: ACTIONS.CHANGE_CHECKE_STATUS,
                      payload: todo.id,
                    })
                  }
                />
                <p className={todo.isChecked ? "complete" : ""}>
                  {todo.activity}
                </p>
                <button
                  className="edit"
                  onClick={() => handleEdit(todo.id, todo.activity)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() =>
                    dispatch({ type: ACTIONS.DELETE_TODO, payload: todo.id })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        activity={activityToEdit}
        id={idToEdit}
        editFunction={(id, activity) =>
          dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, activity } })
        }
      />
    </>
  );
}

export default ToDo;
