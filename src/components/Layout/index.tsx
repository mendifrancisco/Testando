// Aqui é a lógica do sidebar e do layout geral

import React from 'react';
import {
    LayoutDashboard,
    Upload,
    LogOut,
    GraduationCap,
    History,
    Heart,
    BarChart3,
    Clock
} from 'lucide-react';

import { AppView } from '../../../types';
import * as styles from './styles';

import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
    currentView: AppView;
    onChangeView: (view: AppView) => void;
    onLogout?: () => void;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
    currentView,
    onChangeView,
    onLogout,
    children
}) => {

    // ⛔ ANTES estava pegando isManager (não existia)
    // ✅ Agora pega os valores reais do AuthContext
    const { isGestor, isAluno, user } = useAuth();

    // Nome exibido
    const displayName =
        user?.nome ??
        user?.name ??
        user?.email ??
        'Usuário';

    // Texto da função
    const roleLabel = isGestor ? 'Portal do Gestor' : 'Área do Aluno';

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.brandContainer}>
                    <div className={styles.logoWrapper}>
                        <GraduationCap size={24} className={styles.logoIcon} />
                    </div>
                    <div>
                        <h1 className={styles.brandName}>GitVideos</h1>
                        <p className={styles.brandSubtitle}>
                            {`${roleLabel} — ${displayName}`}
                        </p>
                    </div>
                </div>

                {/* Navegação */}
                <nav className={styles.nav}>
                    <button
                        onClick={() => onChangeView(AppView.DASHBOARD)}
                        className={styles.getButtonClass(currentView === AppView.DASHBOARD)}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Catálogo de Aulas</span>
                    </button>

                    {/* MENU ESPECÍFICO DO ALUNO */}
                    {isAluno && (
                        <>
                            <button
                                onClick={() => onChangeView(AppView.HISTORY)}
                                className={styles.getButtonClass(currentView === AppView.HISTORY)}
                            >
                                <Clock size={20} />
                                <span className="font-medium">Histórico</span>
                            </button>

                            <button
                                onClick={() => onChangeView(AppView.LIKED)}
                                className={styles.getButtonClass(currentView === AppView.LIKED)}
                            >
                                <Heart size={20} />
                                <span className="font-medium">Curtidos</span>
                            </button>
                        </>
                    )}

                    {/* MENU ESPECÍFICO DO GESTOR */}
                    {isGestor && (
                        <div className={styles.navSection}>
                            <p className={styles.navSectionTitle}>Gestão</p>

                            <button
                                onClick={() => onChangeView(AppView.STATS)}
                                className={styles.getButtonClass(currentView === AppView.STATS)}
                            >
                                <BarChart3 size={20} />
                                <span className="font-medium">Dashboard</span>
                            </button>

                            <button
                                onClick={() => onChangeView(AppView.UPLOAD)}
                                className={styles.getButtonClass(currentView === AppView.UPLOAD)}
                            >
                                <Upload size={20} />
                                <span className="font-medium">Enviar Novo Vídeo</span>
                            </button>
                        </div>
                    )}
                </nav>

                {/* Rodapé */}
                <div className={styles.footer}>
                    <button
                        onClick={onLogout}
                        className={styles.logoutButton}
                    >
                        <LogOut size={18} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Conteúdo principal */}
            <main className={styles.main}>
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </main>
        </div>
    );
};
