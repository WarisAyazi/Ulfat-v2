<?php

namespace App\Http\Filters;

/**
 * StudentFilter for filtering students based on their properties
 */
class StudentFilter extends QueryFilter {

    /**
     * This Function 'id' is used for filtering students based on
     * their ids
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function id($value) {
        return $this->builder->whereIn('id', explode(', ', $value));
    }

    /**
     * This Function 'name' is used for filtering users 
     * based on their name
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function name($value)
    {
        $likeStr = str_replace('*', '%', $value);
        return $this->builder->where('name', 'like', $likeStr);
    }
}