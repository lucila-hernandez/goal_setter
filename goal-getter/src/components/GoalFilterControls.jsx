import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filtersSlice';

export default function GoalFilterControls() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters);

  const filters = ['all', 'completed', 'incomplete'];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`px-3 py-1 rounded ${
            currentFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
