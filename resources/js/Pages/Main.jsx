import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Account from "./Account";
import Dashboard from "./Dashboard";

function Main() {
    return (
        <div>
            <AppLayout />
        </div>
    );
}

export default Main;
