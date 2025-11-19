import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { Controls } from '@/components/design-system/controls';
import { useTheme } from '@/components/design-system/utils';
import { textStyles } from '@/components/design-system/typography';

import { formSchema } from "./TransformationForm";

type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
  type = 'text',
  placeholder,
  options = [],
}: CustomFieldProps) => {
  const { theme } = useTheme();

  // If we need to render a specific input based on type
  if (render) {
    return (
      <div className={className}>
        {formLabel && (
          <label 
            className="block mb-2"
            style={textStyles.subhead}
          >
            {formLabel}
          </label>
        )}
        {render({ field: {} })} {/* Will be handled by the parent form */}
      </div>
    );
  }

  // Otherwise, render based on type
  return (
    <div className={className}>
      {formLabel && (
        <label 
          className="block mb-2"
          style={textStyles.subhead}
        >
          {formLabel}
        </label>
      )}
      {type === 'text' || type === 'number' ? (
        <Controls.TextInput
          theme={theme}
          value=""
          onChange={() => {}}
          placeholder={placeholder}
          type={type}
        />
      ) : type === 'select' ? (
        <Controls.PopupButton
          value=""
          onChange={() => {}}
          options={options}
          theme={theme}
        />
      ) : type === 'checkbox' ? (
        <Controls.Checkbox
          checked={false}
          onChange={() => {}}
          theme={theme}
          label={placeholder}
        />
      ) : (
        <Controls.TextInput
          theme={theme}
          value=""
          onChange={() => {}}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};