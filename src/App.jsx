import { useEffect, useRef, useState } from "react";
import "./App.css";
import Contents from "./Components/Contents";
import { useCallback } from "react";

function App() {
  const totalPage = useRef(-1);
  const ismouse = useRef(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      totalPage.current += 1;
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          totalPage.current * 10
        }&select=title,price`
      );

      const resdata = await res.json();
      updateContent(resdata.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ismouse.current) {
      getData();
      window.scrollTo(0, 0);
      ismouse.current = true
    }
  }, []);

  const updateContent = (content) => {
    setData((prev) => [...prev, ...content]);
  };
  return (
    <Contents
      loading={loading}
      data={data}
      totalPage={totalPage}
      getdata={getData}
    />
  );
}

export default App;
