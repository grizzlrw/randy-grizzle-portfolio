"use client"
import React from 'react';
import DynamicForm from '@/app/components/_dynamic-form/dynamic-form';
import { InputFieldProps } from '@/app/components/_inputs/InputField';
import { SelectFieldProps } from '@/app/components/_inputs/SelectField';
import Box from '@mui/material/Box';

type FormSchema = Array<InputFieldProps|SelectFieldProps>

const myFormSchema: FormSchema = [
    { type: 'text', name: 'firstName', label: 'First Name', required: true, validation: ['required'] },
    { type: 'email', name: 'email', label: 'Email', validation: ['required', 'email'] },
    { type: 'select', name: 'role', label: 'Select Role', options: [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }, { value: 'guest', label: 'Guest' }], validation: ['required'] }
];

export default function DynamicFormPage() {
    return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
      <Box component="section" sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 8, px: 2 }}>
        <h1>My Dynamic Form</h1>
        <DynamicForm schema={myFormSchema} />
      </Box>
    </main>
    );
}