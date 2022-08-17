import React, {
  ChangeEventHandler,
  FocusEventHandler,
  SetStateAction,
} from 'react';

import { setNameFormat } from '@/utils/nameFormatter';

const VetfluxLabelAndInput = ({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  readOnly = true,
  placeHolder,
  autoComplete = 'on',
}: {
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeHolder?: string;
  autoComplete?: string;
  readOnly?: boolean;
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className='text-[.8125rem] text-[#808495] hover:cursor-pointer'
      >
        {label}
      </label>
      <input
        id={label}
        type='text'
        className={
          'border-[#e9e9f0] block w-full h-[3.25rem] rounded-md border-1 mt-[.375rem] input-shadow placeholder-neutral-dark read-only:placeholder-neutral-light read-only:text-[#b0aebc] focus:border-primary ' +
          (value && 'text-[#4d4f5c]')
        }
        placeholder={
          placeHolder
            ? placeHolder
            : `${setNameFormat(label, '을/를')} 입력해주세요`
        }
        value={value}
        onChange={onChange}
        onFocus={readOnly ? null : onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        readOnly={readOnly}
      />
    </div>
  );
};

export default VetfluxLabelAndInput;
