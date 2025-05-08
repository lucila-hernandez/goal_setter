import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import GoalFilterControls from './components/GoalFilterControls';

function App() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">🎯 GOAL SETTER</h1>
      <div className="space-y-6">
        <GoalForm />
        <GoalFilterControls />
      </div>
      <GoalList className="mt-6" />
    </main>
  );
}

export default App;
