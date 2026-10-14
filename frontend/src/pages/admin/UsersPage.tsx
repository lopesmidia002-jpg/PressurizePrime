import React, { useEffect, useState } from 'react';
import {
  UserCog,
  UserPlus,
  Pencil,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  User as UserIcon,
  AlertTriangle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { User, UserRole } from '../../types';

interface FormState {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

const emptyForm: FormState = { name: '', email: '', role: 'user', password: '' };

const ROLE_INFO: Record<UserRole, { label: string; description: string }> = {
  admin: { label: 'Administrador', description: 'Acesso total, inclusive à gestão de usuários.' },
  user: { label: 'Usuário', description: 'Acesso a todo o painel, exceto à gestão de usuários.' },
};

// Extrai a mensagem de erro da API (validação 422 ou regra de negócio)
const apiErrorMessage = (err: any): string => {
  const data = err?.response?.data;
  if (data?.errors) {
    const first = Object.values(data.errors as Record<string, string[]>)[0];
    if (first?.[0]) return first[0];
  }
  return data?.message || 'Não foi possível concluir a operação. Tente novamente.';
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';

export const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Formulário: null = fechado; 'new' = cadastro; número = edição do usuário com esse id
  const [editing, setEditing] = useState<'new' | User['id'] | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState<User['id'] | null>(null);
  const [deletingId, setDeletingId] = useState<User['id'] | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setListError(null);
    try {
      const { data } = await adminApi.get('/users');
      setUsers(data.data || []);
    } catch (err) {
      setListError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const flash = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 3500);
  };

  const openCreate = () => {
    setEditing('new');
    setForm(emptyForm);
    setFormError(null);
    setShowPassword(false);
  };

  const openEdit = (u: User) => {
    setEditing(u.id);
    setForm({ name: u.name, email: u.email, role: u.role, password: '' });
    setFormError(null);
    setShowPassword(false);
  };

  const closeForm = () => {
    setEditing(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const isNew = editing === 'new';
    if (isNew && form.password.length < 8) {
      setFormError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (!isNew && form.password && form.password.length < 8) {
      setFormError('A nova senha deve ter pelo menos 8 caracteres (ou deixe em branco para manter a atual).');
      return;
    }

    const payload: Partial<FormState> = { name: form.name.trim(), email: form.email.trim(), role: form.role };
    if (form.password) payload.password = form.password;

    setSaving(true);
    try {
      if (isNew) {
        await adminApi.post('/users', payload);
        flash('Usuário cadastrado com sucesso.');
      } else {
        await adminApi.put(`/users/${editing}`, payload);
        flash('Usuário atualizado com sucesso.');
      }
      closeForm();
      await loadUsers();
    } catch (err) {
      setFormError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (u: User) => {
    setDeletingId(u.id);
    try {
      await adminApi.delete(`/users/${u.id}`);
      setConfirmDeleteId(null);
      if (editing === u.id) closeForm();
      flash(`Usuário ${u.name} excluído.`);
      await loadUsers();
    } catch (err) {
      setConfirmDeleteId(null);
      setListError(apiErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const isSelf = (u: User) => String(u.id) === String(currentUser?.id);
  const adminCount = users.filter(u => u.role === 'admin').length;

  const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
        role === 'admin'
          ? 'bg-amber-50 text-amber-800 border-amber-200'
          : 'bg-slate-100 text-slate-700 border-slate-200'
      }`}
    >
      {role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
      {ROLE_INFO[role]?.label || role}
    </span>
  );

  const RowActions: React.FC<{ u: User }> = ({ u }) => {
    if (confirmDeleteId === u.id) {
      return (
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs font-semibold text-red-700">Excluir?</span>
          <button
            type="button"
            onClick={() => handleDelete(u)}
            disabled={deletingId === u.id}
            className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-60"
          >
            {deletingId === u.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Sim
          </button>
          <button
            type="button"
            onClick={() => setConfirmDeleteId(null)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Não
          </button>
        </div>
      );
    }

    const lastAdmin = u.role === 'admin' && adminCount <= 1;
    const cannotDelete = isSelf(u) || lastAdmin;
    return (
      <div className="flex items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={() => openEdit(u)}
          className="inline-flex items-center gap-1 text-primary hover:bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold"
          aria-label={`Editar ${u.name}`}
        >
          <Pencil className="w-3.5 h-3.5" />
          Editar
        </button>
        <button
          type="button"
          onClick={() => setConfirmDeleteId(u.id)}
          disabled={cannotDelete}
          title={isSelf(u) ? 'Você não pode excluir a sua própria conta' : lastAdmin ? 'O painel precisa de pelo menos um administrador' : 'Excluir usuário'}
          className="inline-flex items-center gap-1 text-red-600 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label={`Excluir ${u.name}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Excluir
        </button>
      </div>
    );
  };

  const editingUser = editing !== null && editing !== 'new'
    ? users.find(u => String(u.id) === String(editing))
    : undefined;
  const editingSelf = editingUser ? isSelf(editingUser) : false;

  return (
    <div className="space-y-8 pb-12">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Usuários do Painel</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Cadastre, edite e remova quem acessa o painel. Administradores gerenciam usuários; usuários têm acesso a todo o resto.
          </p>
        </div>
        {editing === null && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-sm w-full sm:w-auto"
          >
            <UserPlus className="w-4 h-4" />
            Novo Usuário
          </button>
        )}
      </div>

      {notice && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold px-4 py-3 rounded-xl" role="status">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notice}
        </div>
      )}

      {/* Formulário de cadastro / edição */}
      {editing !== null && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-primary">
                {editing === 'new' ? <UserPlus className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {editing === 'new' ? 'Cadastrar Novo Usuário' : `Editar ${editingUser?.name || 'Usuário'}`}
              </h2>
            </div>
            <button type="button" onClick={closeForm} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Fechar formulário">
              <X className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="user-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nome</label>
              <input
                id="user-name"
                type="text"
                required
                maxLength={255}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label htmlFor="user-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">E-mail de acesso</label>
              <input
                id="user-email"
                type="email"
                required
                maxLength={255}
                autoComplete="off"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="nome@empresa.com.br"
              />
            </div>

            <div>
              <label htmlFor="user-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {editing === 'new' ? 'Senha' : 'Nova senha (opcional)'}
              </label>
              <div className="relative">
                <input
                  id="user-password"
                  type={showPassword ? 'text' : 'password'}
                  required={editing === 'new'}
                  minLength={editing === 'new' ? 8 : undefined}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 pr-11 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={editing === 'new' ? 'Mínimo de 8 caracteres' : 'Deixe em branco para manter a atual'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {editing !== 'new' && !editingSelf && (
                <p className="mt-1.5 text-[11px] text-slate-500">Ao trocar a senha, as sessões abertas desse usuário são encerradas.</p>
              )}
            </div>

            <fieldset>
              <legend className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nível de acesso</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(ROLE_INFO) as UserRole[]).map(role => {
                  const lockedSelf = editingSelf && editingUser?.role === 'admin' && role === 'user';
                  return (
                    <label
                      key={role}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                        form.role === role ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'
                      } ${lockedSelf ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={form.role === role}
                        disabled={lockedSelf}
                        onChange={() => setForm({ ...form, role })}
                        className="mt-0.5 accent-[var(--color-primary)]"
                      />
                      <span>
                        <span className="block text-sm font-bold text-slate-900">{ROLE_INFO[role].label}</span>
                        <span className="block text-[11px] text-slate-500 leading-snug">{ROLE_INFO[role].description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {editingSelf && editingUser?.role === 'admin' && (
                <p className="mt-1.5 text-[11px] text-slate-500">Você não pode remover o seu próprio acesso de administrador.</p>
              )}
            </fieldset>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={closeForm} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md text-sm disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editing === 'new' ? 'Cadastrar Usuário' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <UserCog className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Usuários cadastrados {!loading && <span className="text-slate-400 font-semibold">({users.length})</span>}
          </h2>
        </div>

        {listError && (
          <div className="m-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="flex-1">{listError}</span>
            <button type="button" onClick={() => setListError(null)} className="text-red-500 hover:text-red-700" aria-label="Fechar aviso">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-slate-500 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando usuários...
          </div>
        ) : (
          <>
            {/* Desktop: tabela */}
            <table className="hidden md:table w-full text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="text-left font-bold px-6 py-3">Nome</th>
                  <th className="text-left font-bold px-6 py-3">E-mail</th>
                  <th className="text-left font-bold px-6 py-3">Nível</th>
                  <th className="text-left font-bold px-6 py-3">Cadastro</th>
                  <th className="text-right font-bold px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className={editing === u.id ? 'bg-primary/5' : 'hover:bg-slate-50/60'}>
                    <td className="px-6 py-3.5 font-semibold text-slate-900">
                      {u.name}
                      {isSelf(u) && <span className="ml-2 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">VOCÊ</span>}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 break-all">{u.email}</td>
                    <td className="px-6 py-3.5"><RoleBadge role={u.role} /></td>
                    <td className="px-6 py-3.5 text-slate-500">{formatDate(u.created_at)}</td>
                    <td className="px-6 py-3.5"><RowActions u={u} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile: cartões */}
            <ul className="md:hidden divide-y divide-slate-100">
              {users.map(u => (
                <li key={u.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900">
                        {u.name}
                        {isSelf(u) && <span className="ml-2 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">VOCÊ</span>}
                      </p>
                      <p className="text-xs text-slate-600 break-all">{u.email}</p>
                    </div>
                    <RoleBadge role={u.role} />
                  </div>
                  <RowActions u={u} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
