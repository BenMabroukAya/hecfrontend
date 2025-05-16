import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import des composants
import Dashboard from "./components/admin/Dashboard";
//import Home from "./components/admin/Home";
import Menu from "./components/admin/Menu";


//client
import { CartProvider } from "use-shopping-cart";
//import ListprojectsCard from "./components/client/ListprojectsCard";
//import Cart from "./components/client/Cart"
import ListprojectsClient from "./components/client/Listprojects";
import Simulator from './components/client/Simulator';

//Project Card
import ListProjectCard from "./components/admin/projects/ListProjectCard";



// Projets
import Editproject from "./components/admin/projects/Editproject";
import Insertproject from "./components/admin/projects/Insertproject";
import Listprojects from "./components/admin/projects/Listprojects";
import Viewproject from "./components/admin/projects/Viewproject";


// Messages
import Editmessage from "./components/admin/messages/Editmessages";
import Insertmessage from "./components/admin/messages/Insertmessages";
import Listmessages from "./components/admin/messages/Listmessages";
import Viewmessage from "./components/admin/messages/Viewmessage";

// Catégories
import Editcategorie from "./components/admin/categories/Editcategorie";
import Insertcategorie from "./components/admin/categories/Insertcategorie";
import Listcategories from "./components/admin/categories/Listcategories";
import ViewCategorie from "./components/admin/categories/Viewcategorie";

// Sous-catégories
import Editscategorie from './components/admin/scategories/Editscategorie';
import Insertscategorie from './components/admin/scategories/Insertscategorie';
import Listscategories from './components/admin/scategories/Listscategories';
import Viewscategorie from './components/admin/scategories/Viewscategorie';

const App = () => {
  return (
    <CartProvider>
    {/*<div>*/}
      <Router>
        <Routes>

          {/* Route for LoisteProjectsCard */}
          <Route path='/projectsCard'  element={ <ListProjectCard/>}/>


          {/* Routes Projets */}
          <Route path="/projects" exact element={<Listprojects/>}/>
          <Route path="/projects/add" element={<Insertproject/>}/>
          <Route path="/projects/edit/:id" element={<Editproject />} />
          <Route path="/projects/view/:id" element={<Viewproject />} />


          {/* Routes Messages */}
          <Route path="/messages" exact element={<Listmessages/>}/>
          <Route path="/messages/add" element={<Insertmessage/>}/>
          <Route path="/message/edit/:id" element={<Editmessage/>}/>
          <Route path="/message/view/:id" element={<Viewmessage/>}/>
          
          {/* Routes Catégories */}
          <Route path="/categories" exact element={<Listcategories/>}/>
          <Route path="/categories/add" element={<Insertcategorie/>}/>
          <Route path="/categories/edit/:id" element={<Editcategorie/>}/>
          <Route path="/categories/view/:id" element={<ViewCategorie/>}/>
          
          {/* Routes Sous-catégories */}
          <Route path="/scategories" exact element={<Listscategories/>}/>
          <Route path="/scategories/add" element={<Insertscategorie/>}/>
          <Route path="/scategories/edit/:id" element={<Editscategorie/>}/>
          <Route path="/scategories/view/:id" element={<Viewscategorie/>}/>

          {/*Client route*/}
          <Route path="/client" element={<ListprojectsClient/>}/>
         {/*<Route path="/cart" element={<Cart/>}/>*/}

          {/* Route Menu */}
          <Route path="/menu" element={<Menu/>}/>

          {/* Route Home */}
          {/*<Route path="/home" element={<Home/>}/>*/}

          {/* Route Dashboard */}
          <Route path="/dashboard" element={<Dashboard/>}/>

          

          {/* Route simulator */}
          <Route path="/simulator" element={<Simulator/>}/>
        </Routes>
      </Router>
    {/*</div>*/}
    </CartProvider>
  );
}

export default App;