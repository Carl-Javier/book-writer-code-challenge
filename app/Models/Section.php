<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function parentSection()
    {
        return $this->belongsTo(Section::class, 'parent_section_id');
    }

    public function childSections()
    {
        return $this->hasMany(Section::class, 'parent_section_id');
    }

    public function subsections()
    {
        return $this->hasMany(Subsection::class);
    }
}
