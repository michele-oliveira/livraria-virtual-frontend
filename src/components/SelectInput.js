import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ label, options, value, onChange }) => {
    return (
        <div>
            {label && (
                <label htmlFor="select" className="block text-sm font-medium text-text-light">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id="select"
                    value={value}
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md"
                    required
                >
                    <option value="" disabled>Selecione uma opção</option>
                    {options.map((option, index) => (
                        <option value={option.value} key={index}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
