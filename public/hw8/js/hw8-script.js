// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

// 8.6 – TaskCard: displays one task and reports deletes up to App
function TaskCard(props) {
  return (
    <div className={"task-card " + props.task.priority.toLowerCase()}>
      <span className="task-name">{props.task.name}</span>
      <span className={"badge " + props.task.priority.toLowerCase()}>
        {props.task.priority}
      </span>
      <button
        className="delete-btn"
        onClick={() => props.onDelete(props.task.id)}
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
}

// 8.7 – TaskList: renders a TaskCard per task, or an empty-state message
function TaskList(props) {
  if (props.tasks.length === 0) {
    return <p className="empty-state">No tasks yet — add one above!</p>;
  }

  return (
    <div className="task-list">
      {props.tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={props.onDelete} />
      ))}
    </div>
  );
}

// 8.8 – App: holds all state and handlers
function App() {
  const [tasks, setTasks] = React.useState([]);
  const [taskName, setTaskName] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');
  const [error, setError] = React.useState('');

  // 8.5 + 8.8 – validate, then add the task with the spread operator
  function addTask() {
    if (taskName.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }
    setError('');

    const newTask = { id: Date.now(), name: taskName.trim(), priority };
    setTasks([...tasks, newTask]);

    setTaskName('');
    setPriority('Medium');
  }

  // 8.9 – remove one task by id
  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  // 8.9 – remove everything
  function clearAll() {
    setTasks([]);
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Quick Tasks</h1>
        <span className="task-count">
          {`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}
        </span>
      </div>

      <div className="task-form">
        {/* 8.3 – controlled text input */}
        <input
          type="text"
          placeholder="What needs doing?"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />

        {/* 8.4 – controlled select */}
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <TaskList tasks={tasks} onDelete={deleteTask} />

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>Clear All</button>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
