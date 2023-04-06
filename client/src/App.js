import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-4 ml-4 mb-8 bg-slate-800 text-white rounded-lg md:rounded-xl">SpendWise</h1>
         <p className="text-md mb-4 text-gray-600 font-medium tracking-wider animated fadeIn">- Track Your Expenses -</p>
      </div>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
        <Graph></Graph>

        {/* Form */}
        <Form></Form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
