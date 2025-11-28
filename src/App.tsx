import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { fetchContactInfo } from "@/redux/thunks/user.thunk";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContactInfo());
    }, [dispatch]);

    return <RouterProvider router={router} />;
}

export default App;
