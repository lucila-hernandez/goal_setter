import { useSelector, useDispatch } from 'react-redux';
import { markCompleted, setEditing, duplicateGoal } from '../redux/goalSlice';
import { motion } from 'framer-motion';

const formatDate = (dateStr) => {
  if (dateStr.includes('T')) {
    // Detects and formats 'completedDate' stored as an ISO timestamp
    const d = new Date(dateStr);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  // Standard YYYY-MM-DD format (from input fields)
  const [year, month, day] = dateStr.split('-');
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
        <li key={goal.id} className="bg-white p-4 rounded-lg shadow relative">
          <div className="flex justify-between items-start">
            <h2 className="font-semibold text-lg">{goal.title}</h2>
            {!goal.completedDate && (
              <motion.button
                onClick={() => dispatch(setEditing(goal.id))}
                className="text-sm bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
            )}
          </div>

          <p>Start: {formatDate(goal.startDate)}</p>
          <p>Target: {formatDate(goal.targetDate)}</p>

          {goal.completedDate ? (
            <p className="text-green-600">✅ Completed on {formatDate(goal.completedDate)}</p>
          ) : (
            <motion.button
              onClick={() => dispatch(markCompleted(goal.id))}
              className="mt-2 mr-2 text-sm bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mark Completed
            </motion.button>
          )}

          <motion.button
            onClick={() => dispatch(duplicateGoal(goal.id))}
            className="mt-2 text-sm bg-pink-600 hover:bg-pink-500 text-white px-3 py-1 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Duplicate
          </motion.button>

        </li>
      ))}
    </ul>
  );
}
