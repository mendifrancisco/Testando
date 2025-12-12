import React from "react";
import { AuthPage } from "../../components/AuthPage";
import { AppView, Role } from "../../../types";

interface Props {
    onNavigate: (view: AppView) => void;
    onLogin: (email: string, role: Role) => void;
}

const Login: React.FC<Props> = ({ onNavigate, onLogin }) => {
    return (
        <AuthPage
            view={AppView.LOGIN}
            onNavigate={onNavigate}
            onLogin={onLogin}
        />
    );
};

export default Login;
