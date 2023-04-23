import {RouterProvider} from "react-router-dom";
import React, {Suspense} from "react";
import routes from "./routes/Routes";
import "./global.css";
import {Loader} from "./helpers/Loader.jsx";

function App() {
    localStorage.clear();
    localStorage.setItem("user", "0129479cju");


    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={routes}/>
        </Suspense>
    );
}

export default App;
