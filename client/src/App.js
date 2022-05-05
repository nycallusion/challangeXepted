import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import GameRoom from './components/GameRoom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <Layout>
            <Home/>
          </Layout>
        }
        />
        <Route exact path="/room/:id" element={
          <Layout>
            <GameRoom/>
          </Layout>
        }
        />
        <Route path="*" element={
            <div>
              doesnt exist
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
