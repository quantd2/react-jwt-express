import React from 'react';

const FieldInput = (field) => (
    <label>
        <input
            {...field.input}
            placeholder={field.placeholder}
            type={field.type}
            className="input"
        />
        {
            field.meta.touched &&
            field.meta.error &&
            <p className="error">{field.meta.error}</p>
        }
    </label>
)

export default FieldInput;
