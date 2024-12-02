
import * as React from "react";
import HomeRoute from "../Router/HomeRoute";
import SignifyLoader from "../Loader/SignifyLoader";



const App = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    //   the loader for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds
  }, []);

  return (
    <div>
      {loading ? <SignifyLoader /> : <HomeRoute />}

    </div>
  );
};

export default App;
