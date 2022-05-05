import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import GameRoom from './components/GameRoom';
import Test from './components/Test';

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
        <Route exact path="/test/:id" element={
          <Layout>
            <Test/>
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
