import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from './components/Join';
import Chat from './components/Chat';

function App() {

  return (
    <>
      <h1>asdasd</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Join} />
          <Route path='/chat' exact Component={Chat} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
