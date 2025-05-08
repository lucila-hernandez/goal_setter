import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoal } from '../redux/goalSlice';
import { motion } from 'framer-motion';

export default function GoalForm() {
  const dispatch = useDispatch();
  const editingGoal = useSelector((state) => state.goals.find(g => g.editing));
  
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setStartDate(editingGoal.startDate);
      setTargetDate(editingGoal.targetDate);
    }
  }, [editingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startDate || !targetDate) return;

    if (editingGoal) {
      dispatch(updateGoal({ id: editingGoal.id, title, startDate, targetDate }));
    } else {
      dispatch(addGoal(title, startDate, targetDate));
    }

    setTitle('');
    setStartDate('');
    setTargetDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <label className="block font-medium">Goal Title:</label>
      <input
        type="text"
        className="block w-full border p-2 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Start Date:</label>
          <input
            type="date"
            className="block w-full border p-2 rounded-lg"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block font-medium">Target Date:</label>
          <input
            type="date"
            className="block w-full border p-2 rounded-lg"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
      </div>

      <motion.button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        >
        {editingGoal ? 'Update Goal' : 'Add Goal'}
      </motion.button>
    </form>
  );
}
