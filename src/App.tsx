import {useEffect, useState} from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {pb} from './helpers/db';
import usePocketbase from './hooks/usePocketbase';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Login from './pages/Login';

function App() {
  const [loading, setLoading] = useState(true);
  const {fetch, subscribe, unsubscribe} = usePocketbase();

  useEffect(() => {
    if (pb.authStore.isValid) {
      fetch();
      subscribe();
    }

    return () => {
      if (pb.authStore.isValid) unsubscribe();
    };

    // eslint-disable-next-line
  }, [pb.authStore]);

  useEffect(() => {
    // pb.authStore.clear();
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', () => {
        setLoading(false);
      });
    }
    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Router>
        <Routes>
          {pb.authStore.isValid ? (
            <>
              <Route path="*" element={<Navigate to={'/dashboard'} />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Navigate to={'/login'} />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
