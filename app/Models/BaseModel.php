<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;
use Carbon\Carbon;

class BaseModel extends Model
{
    // Convert timestamps to Shamsi when reading
    public function getCreatedAtAttribute($value)
    {
        return $this->toShamsi($value);
    }

    public function getUpdatedAtAttribute($value)
    {
        return $this->toShamsi($value);
    }

    // Optional: if you use soft deletes
    public function getDeletedAtAttribute($value)
    {
        return $value ? $this->toShamsi($value) : null;
    }

    // Helper method
    protected function toShamsi($value)
    {
        if (!$value) return null;
        return Jalalian::fromCarbon(Carbon::parse($value))->format('Y-m-d H:i');
    }

    // You can also define the reverse conversion (Shamsi → Gregorian)
    public function fromShamsi($date)
    {
        return Jalalian::fromFormat('Y-m-d', $date)->toCarbon();
    }
}
