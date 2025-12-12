import React, { useState } from 'react';
import { AppView, Role } from '../../../types';
import { GraduationCap, Mail, Lock, User, CheckCircle, Briefcase, Eye, EyeOff } from 'lucide-react';
import * as styles from './styles';

interface AuthPageProps {
    view: AppView.LOGIN | AppView.REGISTER;
    onNavigate: (view: AppView) => void;
    onLogin: (email: string, password: string) => void;
    onRegister: (name: string, email: string, password: string, role: Role) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ view, onNavigate, onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>('ALUNO');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isLogin = view === AppView.LOGIN;
    const isStudent = role === 'ALUNO';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await onLogin(email, password);
            } else {
                await onRegister(name, email, password, role);
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {/* Brand Logo above box */}
                <div className={styles.brandContainer}>
                    <div className={styles.brandContent}>
                        <div className={styles.logoWrapper}>
                            <GraduationCap size={28} className={styles.logoIcon} />
                        </div>
                        <span className={styles.brandName}>GitVideos</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.header}>
                        <h2 className={styles.headerTitle}>{isLogin ? 'Bem-vindo!' : 'Criar conta'}</h2>
                        <p className={styles.headerSubtitle}>
                            {isLogin
                                ? 'Acesse para gerenciar suas aulas.'
                                : (isStudent
                                    ? 'Preencha os dados abaixo para criar sua conta.'
                                    : 'Comece a organizar seu conteúdo hoje mesmo.')
                            }
                        </p>
                    </div>

                    <div className="px-8 pt-6 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setRole('ALUNO')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${role === 'ALUNO'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            <GraduationCap size={16} />
                            Aluno
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('GESTOR')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${role === 'GESTOR'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            <Briefcase size={16} />
                            Gestor
                        </button>
                    </div>

                    {error && (
                        <div className="px-8 pt-4">
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Nome Completo</label>
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={styles.input}
                                        placeholder="Digite seu nome completo"
                                    />
                                </div>
                            </div>
                        )}


                        <div className={styles.inputGroup}>
                            <label className={styles.label}>E-mail {role === 'GESTOR' ? 'Corporativo' : 'do Aluno'}</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.inputIcon} size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                    placeholder={role === 'GESTOR' ? "gestor@escola.com" : "aluno@escola.com"}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Senha</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${styles.input} pr-12`}
                                    placeholder={!isLogin ? "Mínimo 6 caracteres" : "••••••••"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {!isLogin && (
                                <small className={styles.helpText}>A senha deve ter no mínimo 6 caracteres</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.button}
                        >
                            {loading ? 'Processando...' : (isLogin ? 'Acessar' : 'Criar Conta')}
                            {!loading && <CheckCircle size={18} />}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <>
                            <div className={styles.footer}>
                                <p className={styles.footerText}>
                                    {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}
                                    <button
                                        onClick={() => onNavigate(isLogin ? AppView.REGISTER : AppView.LOGIN)}
                                        className={styles.linkButton}
                                    >
                                        {isLogin ? 'Cadastre-se' : 'Faça Login'}
                                    </button>
                                </p>
                            </div>
                            {isLogin && (
                                <p className={styles.forgotPasswordText}>
                                    Esqueceu sua senha?{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            alert('Funcionalidade de redefinir senha será implementada em breve');
                                        }}
                                        className={styles.forgotPasswordLink}
                                    >
                                        Redefinir senha
                                    </button>
                                </p>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};
