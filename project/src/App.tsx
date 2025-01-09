import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import NewsWidget from './components/NewsWidget';
import Cricket from './components/Cricket';
import Politics from './components/Politics';
import GeographicPage from './components/Geo';
import TeluguPage from './components/Telugu';

function App() {
  const { session } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<NewsWidget />} />
            <Route
              path="/login"
              element={!session ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!session ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/cricket" element={<Cricket/>}/>
            <Route path="/politics" element={<Politics/>}/>
            <Route path="/geography" element={<GeographicPage/>}/>
            <Route path="/telugunews" element={<TeluguPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;