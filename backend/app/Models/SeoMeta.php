<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $table = 'seo_meta';

    protected $fillable = [
        'page_slug',
        'meta_title',
        'meta_description',
        'keywords',
        'canonical_url',
        'og_title',
        'og_description',
        'og_image',
        'schema_markup',
    ];

    protected $casts = [
        'schema_markup' => 'array',
    ];
}
