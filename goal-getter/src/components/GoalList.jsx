import { useSelector, useDispatch } from 'react-redux';
import { markCompleted, setEditing } from '../redux/goalSlice';

export default function GoalList() {
  const goals = useSelector((state) => state.goals);
  const filter = useSelector((state) => state.filters);
  const sortBy = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  let visibleGoals = [...goals];

  // Filter
  if (filter === 'completed') {
    visibleGoals = visibleGoals.filter(g => g.completedDate);
  } else if (filter === 'incomplete') {
    visibleGoals = visibleGoals.filter(g => !g.completedDate);
  }

  // Sort
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
          <p>Start: {goal.startDate}</p>
          <p>Target: {goal.targetDate}</p>
          {goal.completedDate ? (
            <p className="text-green-600">✅ Completed on {goal.completedDate}</p>
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
