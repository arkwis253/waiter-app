import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/pages/NotFound/NotFound";
import TablePage from "./components/pages/TablePage/TablePage";
import AllTables from "./components/pages/AllTables/AllTables";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<AllTables />} />
        <Route path="/table/:id" element={<TablePage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
