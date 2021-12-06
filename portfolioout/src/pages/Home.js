import React from "react";
import useApi from "../apiHooks/useApi";

const Home = () => {
  const { loading, data } = useApi("/test");

  if (loading) return <h1>loading</h1>;
  return (
    <div>
      <h1>This is Home page</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Home;
