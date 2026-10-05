import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSiteData } from '../../context/SiteDataContext';
import {
  LayoutDashboard,
  Palette,
  FileText,
  Wrench,
  Search,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { settings } = useSiteData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/settings', label: 'Identidade & Cores', icon: Palette },
    { to: '/admin/pages', label: 'Conteúdo das Páginas', icon: FileText },
    { to: '/admin/services', label: 'Serviços', icon: Wrench },
    { to: '/admin/seo', label: 'SEO Individual', icon: Search },
    { to: '/admin/leads', label: 'Gestão de Leads', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Topbar Superior do Painel */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Abrir Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-3">
              <img
                src={settings.logo_url || '/logo.jpeg'}
                alt={settings.site_name}
                className="h-9 w-auto object-contain rounded bg-white p-0.5"
              />
              <div className="hidden sm:block">
                <span className="font-bold text-sm text-white tracking-wide block leading-none">
                  Pressurize Prime
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Painel de Controle CMS
                </span>
              </div>
            </Link>
          </div>

          {/* Ações da Direita */}
          <div className="flex items-center gap-3">
            {/* Visualizador de Cores do Tema Ativo */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
              <span className="text-[11px] font-semibold text-slate-400">Tema:</span>
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shadow-xs"
                style={{ backgroundColor: settings.primary_color }}
                title={`Cor Primária: ${settings.primary_color}`}
              ></span>
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shadow-xs"
                style={{ backgroundColor: settings.secondary_color }}
                title={`Cor Secundária: ${settings.secondary_color}`}
              ></span>
            </div>

            {/* Ver Site ao Vivo */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Ver Site</span>
            </Link>

            {/* Usuário e Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-white leading-tight">
                  {user?.name || 'Administrador'}
                </span>
                <span className="block text-[10px] text-emerald-400 font-semibold uppercase">
                  Online
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Sair do Painel"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Lateral Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-1 shrink-0">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Menu de Gestão
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 mt-auto">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Segurança Ativa</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Todas as alterações de cores, textos e SEO têm reflexo instantâneo no site.
              </p>
            </div>
          </div>
        </aside>

        {/* Sidebar Mobile Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            ></div>

            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 p-4 text-white z-50 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-3">
                <span className="font-bold text-sm tracking-wide">Menu Administrativo</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 flex-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-md font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 py-2.5 rounded-xl text-sm font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair do Painel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Área de Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
