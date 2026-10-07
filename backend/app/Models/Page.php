<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Page extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'hero_title',
        'hero_subtitle',
        'hero_badge',
        'hero_cta_primary',
        'hero_cta_secondary',
        'microcopy',
    ];

    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class)->orderBy('order');
    }

    public function seo(): HasOne
    {
        return $this->hasOne(SeoMeta::class, 'page_slug', 'slug');
    }
}
