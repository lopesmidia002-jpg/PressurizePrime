<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'group',
    ];

    /**
     * Retorna um array chave => valor com todas as configurações ou de um grupo específico.
     */
    public static function getFormattedSettings(?string $group = null): array
    {
        $query = static::query();
        if ($group) {
            $query->where('group', $group);
        }

        return $query->pluck('value', 'key')->toArray();
    }

    /**
     * Atualiza ou cria uma configuração rapidamente.
     */
    public static function setVal(string $key, ?string $value, string $group = 'general'): self
    {
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );
    }
}
