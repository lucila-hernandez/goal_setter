import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoal } from '../redux/goalSlice';

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
      // optional: clear editing state here (see step 4)
    } else {
      dispatch(addGoal(title, startDate, targetDate));
    }

    // Clear form
    setTitle('');
    setStartDate('');
    setTargetDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
      <label className="block font-medium">Goal Title</label>
      <input
        type="text"
        className="block w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block font-medium">Start Date</label>
      <input
        type="date"
        className="block w-full border p-2 rounded"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label className="block font-medium">Target Date</label>
      <input
        type="date"
        className="block w-full border p-2 rounded"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingGoal ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
}
