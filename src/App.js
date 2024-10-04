import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Listproduct } from "./pages/products/Listprodut";
import { Createproduct } from "./pages/products/Createproduct";
import { Editproduct } from "./pages/products/Editproduct";


function App() {
  return (
    <>
      <Routes>
        <Route path="/product" element={<Home />}>
          <Route path="list" element={<Listproduct />} />
          <Route path="add" element={<Createproduct />} />
           <Route path="edit/:id" element={<Editproduct />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/product/list" />} />
      </Routes>
    </>
  );
}

export default App;
