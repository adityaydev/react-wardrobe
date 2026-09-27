import type { ReactNode } from "react";
import {
  Button as AriaButton,
  TextField as AriaTextField,
  Input,
  TextArea as AriaTextArea,
  Label,
  Text,
  FieldError,
  NumberField as AriaNumberField,
  Group,
  Select as AriaSelect,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Checkbox as AriaCheckbox,
  Switch as AriaSwitch,
  type ButtonProps as AriaButtonProps,
  type TextFieldProps as AriaTextFieldProps,
  type NumberFieldProps as AriaNumberFieldProps,
  type CheckboxProps as AriaCheckboxProps,
  type SwitchProps as AriaSwitchProps,
  type Key,
} from "react-aria-components";
import { Check, ChevronDown, Minus, Plus, LoaderCircle } from "lucide-react";
import { cx } from "./utils";
import { useThemeAttributes } from "./provider";

export interface ButtonProps extends Omit<
  AriaButtonProps,
  "className" | "children"
> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}
export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  isDisabled,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cx(
        "rw-button",
        `rw-button--${variant}`,
        `rw-button--${size}`,
        className,
      )}
      isDisabled={isDisabled}
      isPending={loading || props.isPending}
    >
      {loading ? (
        <LoaderCircle className="rw-spin" size={16} aria-hidden />
      ) : (
        icon
      )}
      {children}
    </AriaButton>
  );
}
export interface TextFieldProps extends Omit<
  AriaTextFieldProps,
  "children" | "className"
> {
  label: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
}
export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  multiline,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      isInvalid={props.isInvalid || !!errorMessage}
      className={cx("rw-field", className)}
    >
      <Label className="rw-label">
        {label}
        {props.isRequired && <span aria-hidden> *</span>}
      </Label>
      {multiline ? (
        <AriaTextArea
          className="rw-input rw-textarea"
          placeholder={placeholder}
        />
      ) : (
        <Input className="rw-input" placeholder={placeholder} />
      )}{" "}
      {description && (
        <Text slot="description" className="rw-description">
          {description}
        </Text>
      )}
      <FieldError className="rw-error">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
export interface NumberFieldProps extends Omit<
  AriaNumberFieldProps,
  "children" | "className"
> {
  label: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}
export function NumberField({
  label,
  description,
  errorMessage,
  className,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      isInvalid={props.isInvalid || !!errorMessage}
      className={cx("rw-field", className)}
    >
      <Label className="rw-label">{label}</Label>
      <Group className="rw-number">
        <AriaButton slot="decrement" className="rw-stepper">
          <Minus size={15} />
        </AriaButton>
        <Input className="rw-input" />
        <AriaButton slot="increment" className="rw-stepper">
          <Plus size={15} />
        </AriaButton>
      </Group>
      {description && (
        <Text slot="description" className="rw-description">
          {description}
        </Text>
      )}
      <FieldError className="rw-error">{errorMessage}</FieldError>
    </AriaNumberField>
  );
}
export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
export interface SelectProps {
  label: string;
  hideLabel?: boolean;
  options: SelectOption[];
  selectedKey?: Key | null;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key | null) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  className?: string;
}
export function Select({
  label,
  hideLabel,
  options,
  description,
  errorMessage,
  className,
  ...props
}: SelectProps) {
  const theme = useThemeAttributes();
  return (
    <AriaSelect
      {...props}
      isInvalid={!!errorMessage}
      disabledKeys={options.filter((o) => o.disabled).map((o) => o.id)}
      className={cx("rw-field", className)}
    >
      <Label className={cx("rw-label", hideLabel && "rw-sr-only")}>
        {label}
      </Label>
      <AriaButton className="rw-select-trigger">
        <SelectValue>
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <ChevronDown size={16} />
      </AriaButton>
      {description && (
        <Text slot="description" className="rw-description">
          {description}
        </Text>
      )}
      <FieldError className="rw-error">{errorMessage}</FieldError>
      <Popover {...theme} className="rw-root rw-popover rw-select-popover">
        <ListBox className="rw-listbox" items={options}>
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.label}
              className="rw-option"
            >
              <div>
                <Text slot="label">{item.label}</Text>
                {item.description && (
                  <Text slot="description" className="rw-description">
                    {item.description}
                  </Text>
                )}
              </div>
              <Check className="rw-option-check" size={16} />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
export interface CheckboxProps extends Omit<
  AriaCheckboxProps,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
}
export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={cx("rw-checkbox", className)}>
      <span className="rw-checkbox-box">
        <Check size={13} />
      </span>
      {children}
    </AriaCheckbox>
  );
}
export interface SwitchProps extends Omit<
  AriaSwitchProps,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
}
export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={cx("rw-switch", className)}>
      <span className="rw-switch-track">
        <span />
      </span>
      {children}
    </AriaSwitch>
  );
}

import {
  Form as AriaForm,
  type FormProps as AriaFormProps,
} from "react-aria-components";
export interface FormProps extends Omit<
  AriaFormProps,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
}
export function Form({ children, className, ...props }: FormProps) {
  return (
    <AriaForm {...props} className={cx("rw-form", className)}>
      {children}
    </AriaForm>
  );
}
