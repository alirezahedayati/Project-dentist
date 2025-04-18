<?php

namespace Core;

class Validator
{
    private $data;
    private $rules;
    private $errors = [];

    public function __construct($data, $rules)
    {
        $this->data = $data;
        $this->rules = $rules;
        $this->validate();
    }

    private function validate()
    {
        foreach ($this->rules as $field => $rule) {
            $rules = explode('|', $rule);
            foreach ($rules as $rule) {
                $params = explode(':', $rule);
                $method = 'validate' . ucfirst($params[0]);
                if (!method_exists($this, $method)) continue;
                $payload = isset($params[1]) ? $params[1] : null;
                $this->$method($field, $payload);
            }
        }
    }

    private function validateRequired($field, $payload)
    {
        if (!isset($this->data[$field]) || empty($this->data[$field])) {
            $this->errors[$field][] = 'این مقدار الزامی است.';
        }
    }

    private function validateString($field, $payload)
    {
        if (isset($this->data[$field]) && !is_string($this->data[$field])) {
            $this->errors[$field][] = 'باید یک عبارت صحیح باشد.';
        }
    }

    private function validateEmail($field, $payload)
    {
        if (isset($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field][] = 'ایمیل معتبر نیست.';
        }
    }

    private function validateEnum($field, $payload)
    {
        $allowedValues = explode(',', $payload);
        if (isset($this->data[$field]) && !in_array($this->data[$field], $allowedValues, true)) {
            $this->errors[$field][] = 'این مقدار نامعتبر است.';
        }
    }

    private function validateMobile($field, $payload)
    {
        $pattern = '/^09\d{9}$/';
        if (isset($this->data[$field]) && preg_match($pattern, $this->data[$field]) !== 1) {
            $this->errors[$field][] = 'شماره موبایل صحیح نیست.';
        }
    }

    public function fails()
    {
        return !empty($this->errors);
    }

    public function errors()
    {
        return $this->errors;
    }
}
