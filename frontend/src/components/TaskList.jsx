import { useAuth } from '../context/AuthContext';

const TaskList = ({ tasks, setEditingTask }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="border-b py-3">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <button 
                onClick={() => setEditingTask(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mt-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;