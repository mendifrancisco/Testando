import React from "react";
import { AuthPage } from "../../components/AuthPage";
import { AppView } from "../../../types";

interface Props {
    onNavigate: (view: AppView) => void;
    onLogin: () => void;
}

const Register: React.FC<Props> = ({ onNavigate, onLogin }) => {
    return (
        <AuthPage
            view={AppView.REGISTER}
            onNavigate={onNavigate}
            onLogin={onLogin}
        />
    );
};

export default Register;
