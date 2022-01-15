import { auth } from "google-auth-library";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/global/Loading";
import { refreshLogin } from "./redux/actions/authAction";
import { getHomeBlogs } from "./redux/actions/blogAction";
import { getCategory } from "./redux/actions/categoryAction";
import Router from "./Router";
import { RootStore } from "./utils/TypeScript";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);

  useEffect(() => {
    dispatch(refreshLogin());
    dispatch(getCategory());
    dispatch(getHomeBlogs());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
}

export default App;
