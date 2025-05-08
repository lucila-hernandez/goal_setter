import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filtersSlice';
import { motion } from 'framer-motion';

export default function GoalFilterControls() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters);

  const filters = ['all', 'completed', 'incomplete'];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`px-3 py-1 rounded-lg ${
            currentFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </motion.button>
      ))}
    </div>
  );
}
