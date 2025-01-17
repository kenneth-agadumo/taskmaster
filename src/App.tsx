

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard-copy";
import './index.css'
import { GlobalProvider } from "./contexts/GlobalContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalProvider>
        <Router>
            <div>
              <Routes>
                
                <Route path="/" element={<Dashboard />} />
                
              </Routes>
            </div>
        </Router>
      </GlobalProvider>
    </DndProvider>
  )
}

export default App
