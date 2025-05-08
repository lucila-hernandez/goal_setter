import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import GoalFilterControls from './components/GoalFilterControls';

function App() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">🎯 Goal Setter</h1>
      <GoalForm />
      <GoalFilterControls />
      <GoalList />
    </main>
  );
}

export default App;
