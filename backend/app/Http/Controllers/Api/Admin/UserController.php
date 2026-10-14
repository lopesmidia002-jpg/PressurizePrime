<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Gestão de usuários do painel (somente papel "admin", via middleware "admin").
 * Papéis: "admin" = acesso total; "user" = todo o painel, exceto esta gestão de usuários.
 */
class UserController extends Controller
{
    private const ROLES = ['admin', 'user'];

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => User::orderBy('name')->get(['id', 'name', 'email', 'role', 'created_at', 'updated_at']),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'role' => ['required', Rule::in(self::ROLES)],
            'password' => 'required|string|min:8|max:255',
        ], $this->messages());

        $user = User::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso.',
            'data' => $user->only(['id', 'name', 'email', 'role', 'created_at', 'updated_at']),
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['required', Rule::in(self::ROLES)],
            'password' => 'nullable|string|min:8|max:255',
        ], $this->messages());

        $isDemotion = $user->role === 'admin' && $data['role'] !== 'admin';
        if ($isDemotion && $this->isLastAdmin($user)) {
            return $this->fail('Não é possível remover o papel de administrador do único admin do painel.');
        }
        if ($isDemotion && $user->id === $request->user()->id) {
            return $this->fail('Você não pode remover o seu próprio acesso de administrador.');
        }

        $passwordChanged = !empty($data['password']);
        if (!$passwordChanged) {
            unset($data['password']);
        }

        $user->update($data);

        // Senha nova ou rebaixamento: encerra as sessões abertas desse usuário (exceto a do próprio editor)
        if (($passwordChanged || $isDemotion) && $user->id !== $request->user()->id) {
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuário atualizado com sucesso.',
            'data' => $user->only(['id', 'name', 'email', 'role', 'created_at', 'updated_at']),
        ]);
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return $this->fail('Você não pode excluir a sua própria conta.');
        }
        if ($user->role === 'admin' && $this->isLastAdmin($user)) {
            return $this->fail('Não é possível excluir o único administrador do painel.');
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuário excluído com sucesso.',
        ]);
    }

    private function isLastAdmin(User $user): bool
    {
        return User::where('role', 'admin')->where('id', '!=', $user->id)->doesntExist();
    }

    private function fail(string $message): JsonResponse
    {
        return response()->json(['success' => false, 'message' => $message], 422);
    }

    private function messages(): array
    {
        return [
            'name.required' => 'Informe o nome.',
            'email.required' => 'Informe o e-mail.',
            'email.email' => 'Informe um e-mail válido.',
            'email.unique' => 'Já existe um usuário com este e-mail.',
            'role.required' => 'Informe o nível de acesso.',
            'role.in' => 'Nível de acesso inválido.',
            'name.max' => 'O nome pode ter no máximo 255 caracteres.',
            'email.max' => 'O e-mail pode ter no máximo 255 caracteres.',
            'password.max' => 'A senha pode ter no máximo 255 caracteres.',
            'password.required' => 'Informe uma senha.',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
        ];
    }
}
