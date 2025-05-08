import { useSelector, useDispatch } from 'react-redux';
import { markCompleted, setEditing } from '../redux/goalSlice';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

export default function GoalList() {
  const goals = useSelector((state) => state.goals);
  const filter = useSelector((state) => state.filters);
  const sortBy = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  let visibleGoals = [...goals];

  if (filter === 'completed') {
    visibleGoals = visibleGoals.filter(g => g.completedDate);
  } else if (filter === 'incomplete') {
    visibleGoals = visibleGoals.filter(g => !g.completedDate);
  }

  if (sortBy === 'title') {
    visibleGoals.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'date') {
    visibleGoals.sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
  }

  return (
    <ul className="mt-4 space-y-2">
      {visibleGoals.map((goal) => (
        <li key={goal.id} className="bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{goal.title}</h2>
          <p>Start: {formatDate(goal.startDate)}</p>
          <p>Target: {formatDate(goal.targetDate)}</p>
          {goal.completedDate ? (
            <p className="text-green-600">✅ Completed on {formatDate(goal.completedDate)}</p>
          ) : (
            <button
              onClick={() => dispatch(markCompleted(goal.id))}
              className="mt-2 mr-2 text-sm bg-green-500 text-white px-3 py-1 rounded"
            >
              Mark Completed
            </button>
          )}
          <button
            onClick={() => dispatch(setEditing(goal.id))}
            className="mt-2 text-sm bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}
