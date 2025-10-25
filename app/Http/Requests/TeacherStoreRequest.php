<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'fname' => ['required', 'string', 'max:50'],
            'phone_number' => ['required', 'integer'],
            'education' => ['required', 'string', 'max:50'],
        ];
    }
    public function messages()
    {
        return[
            'fname'=>'The father name field is required.',
            'phone_number'=>'The phone number field is required.'
        ];
    }
}
