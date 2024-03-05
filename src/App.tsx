import {Suspense, lazy, useEffect} from "react";
import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";

import usePocketbase from "@/hooks/usePocketbase";
import {pb} from "@/utils/pocketbase";
import Loading from "./pages/Loading";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Project = lazy(() => import("@/pages/Project"));
const Login = lazy(() => import("@/pages/Login"));
const Landing = lazy(() => import("@/pages/Landing"));

const App = () => {
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

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          {pb.authStore.isValid ? (
            <>
              <Route path="*" element={<Navigate to={"/dashboard"} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<Project />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Navigate to={"/login"} />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
