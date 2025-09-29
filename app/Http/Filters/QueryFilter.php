<?php

namespace App\Http\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

/**
 * Geeneral QueryFilter class for all filters
 * and for all models
 */
abstract class QueryFilter {
    protected $builder;
    protected $request;

    /**
     * Summary of __construct
     * @param \Illuminate\Http\Request $request
     */
    public function __construct(Request $request) {
        $this->request = $request;
    }

    /**
     * Use this filter in ontroller Class for applying filter
     * @param mixed $arr
     * @return Builder
     */
    protected function filter($arr)
    {
        foreach ($arr as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }
        return $this->builder;
    }

    public function apply(Builder $builder) {
        $this->builder = $builder;

        foreach ($this->request->all() as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }

        return $builder;
    }


}