
import React, { useState } from "react";
import {
  Zap,
  Target,
  Clock,
  CheckCircle2,
  Plus,
  Circle,
  Trash2,
  Play,
  RotateCcw,
} from "lucide-react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React fundamentals", done: false },
    { id: 2, title: "Practice JavaScript", done: true },
    { id: 3, title: "Build a portfolio project", done: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const completed = tasks.filter((task) => task.done).length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        done: false,
      },
    ]);

    setNewTask("");
  }
 // Focus timer countdown
  React.useEffect(() => {
    if (!running || seconds <= 0) return;

    const timerId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [running, seconds]);

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function formatTime() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Zap size={23} />
          </div>
          <span>FocusFlow</span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <div className="nav-item active">
          <Target size={18} />
          Dashboard
        </div>

        <div className="nav-item">
          <CheckCircle2 size={18} />
          My Tasks
        </div>

        <div className="nav-item">
          <Clock size={18} />
          Focus Timer
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">F</div>
          <div>
            <strong>Focus mode</strong>
            <p>One thing at a time.</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>
              Dashboard <span>✦</span>
            </h1>
            <p className="subtitle">
              Make today count, one task at a time.
            </p>
          </div>

          <div className="status">
            <i />
            Ready to focus
          </div>
        </header>

        <section className="stats">
          <article className="stat-card">
            <div className="stat-heading">
              Total tasks <Target />
            </div>
            <strong>{tasks.length}</strong>
            <p>Tasks on your list</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              Completed <CheckCircle2 />
            </div>
            <strong>{completed}</strong>
            <p>Tasks finished</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              Daily progress <Zap />
            </div>
            <strong>{progress}%</strong>
            <p>Keep up the momentum</p>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel timer-panel">
            <p className="eyebrow">STAY IN THE ZONE</p>
            <h2>Focus timer</h2>

            <div className="timer-ring">
              <div className="timer-inner">
                <span>FOCUS SESSION</span>
                <strong>{formatTime()}</strong>
                <small>25-minute session</small>
              </div>
            </div>

            <div className="timer-actions">
              <button
                className="primary-btn"
                onClick={() => setRunning(!running)}
              >
                <Play size={17} />
                {running ? "Pause" : "Start focus"}
              </button>

              <button
                className="reset-btn"
                onClick={() => {
                  setRunning(false);
                  setSeconds(25 * 60);
                }}
                aria-label="Reset timer"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <p className="tip">
              Small steps create big results.
            </p>
          </article>

          <article className="panel tasks-panel">
            <div className="tasks-heading">
              <div>
                <p className="eyebrow">MAKE IT HAPPEN</p>
                <h2>Today's tasks</h2>
              </div>

              <span className="count">
                {completed}/{tasks.length}
              </span>
            </div>

            <div className="progress-label">
              <span>Daily progress</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                style={{ width: `${progress}%` }}
              />
            </div>

            <form className="add-form" onSubmit={addTask}>
              <input
                value={newTask}
                onChange={(event) =>
                  setNewTask(event.target.value)
                }
                placeholder="Add a task for today..."
                aria-label="New task"
                maxLength={120}
              />

              <button type="submit" aria-label="Add task">
                <Plus size={20} />
              </button>
            </form>

            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-row" key={task.id}>
                  <button
                    className={`check-btn ${
                      task.done ? "checked" : ""
                    }`}
                    onClick={() => toggleTask(task.id)}
                    aria-label="Toggle task completion"
                  >
                    {task.done ? (
                      <CheckCircle2 size={21} />
                    ) : (
                      <Circle size={21} />
                    )}
                  </button>

                  <span className={task.done ? "done" : ""}>
                    {task.title}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="empty">
                  Add your first task above.
                </p>
              )}
            </div>
          </article>
        </section>

        <footer>
          ✦ FocusFlow
          <span>Built for better focus, one day at a time.</span>
        </footer>
      </main>
    </div>
  );
}
