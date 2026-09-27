import { useState, type ReactNode } from "react";
import * as A from "react-aria-components";
import { Check, ChevronDown, Search, X, UploadCloud } from "lucide-react";
import { Button, Checkbox, type SelectOption } from "./controls";
import { useThemeAttributes } from "./provider";

export interface ComboBoxProps extends Omit<
  A.ComboBoxProps<SelectOption>,
  "children" | "className" | "items" | "defaultItems"
> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}
export function ComboBox({
  label,
  options,
  placeholder,
  description,
  errorMessage,
  ...props
}: ComboBoxProps) {
  const theme = useThemeAttributes();
  return (
    <A.ComboBox
      {...props}
      defaultItems={options}
      disabledKeys={options.filter((o) => o.disabled).map((o) => o.id)}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field"
      allowsEmptyCollection
    >
      <A.Label className="rw-label">{label}</A.Label>
      <A.Group className="rw-input-group">
        <A.Input className="rw-input" placeholder={placeholder} />
        <A.Button className="rw-calendar-nav">
          <ChevronDown size={16} />
        </A.Button>
      </A.Group>
      {description && (
        <A.Text slot="description" className="rw-description">
          {description}
        </A.Text>
      )}
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
      <A.Popover {...theme} className="rw-root rw-popover rw-select-popover">
        <A.ListBox<SelectOption>
          className="rw-listbox"
          renderEmptyState={() => (
            <span className="rw-empty">No matching options</span>
          )}
        >
          {(item) => (
            <A.ListBoxItem
              id={item.id}
              textValue={item.label}
              className="rw-option"
            >
              <A.Text slot="label">{item.label}</A.Text>
              <Check size={16} className="rw-option-check" />
            </A.ListBoxItem>
          )}
        </A.ListBox>
      </A.Popover>
    </A.ComboBox>
  );
}
export interface MultiSelectProps extends Omit<
  A.SelectProps<SelectOption, "multiple">,
  "children" | "className"
> {
  label: string;
  hideLabel?: boolean;
  options: SelectOption[];
  description?: string;
  errorMessage?: string;
}
export function MultiSelect({
  label,
  hideLabel,
  options,
  description,
  errorMessage,
  ...props
}: MultiSelectProps) {
  const theme = useThemeAttributes();
  return (
    <A.Select
      {...props}
      selectionMode="multiple"
      isInvalid={!!errorMessage || props.isInvalid}
      disabledKeys={options.filter((o) => o.disabled).map((o) => o.id)}
      className="rw-field"
    >
      <A.Label className={hideLabel ? "rw-label rw-sr-only" : "rw-label"}>
        {label}
      </A.Label>
      <A.Button className="rw-select-trigger">
        <A.SelectValue />
        <ChevronDown size={16} />
      </A.Button>
      {description && (
        <A.Text slot="description" className="rw-description">
          {description}
        </A.Text>
      )}
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
      <A.Popover {...theme} className="rw-root rw-popover rw-select-popover">
        <A.ListBox items={options} className="rw-listbox">
          {(item) => (
            <A.ListBoxItem
              id={item.id}
              textValue={item.label}
              className="rw-option"
            >
              <A.Text slot="label">{item.label}</A.Text>
              <Check size={16} className="rw-option-check" />
            </A.ListBoxItem>
          )}
        </A.ListBox>
      </A.Popover>
    </A.Select>
  );
}
export interface SearchFieldProps extends Omit<
  A.SearchFieldProps,
  "children" | "className"
> {
  label: string;
  placeholder?: string;
}
export function SearchField({
  label,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <A.SearchField {...props} className="rw-field">
      <A.Label className="rw-label">{label}</A.Label>
      <A.Group className="rw-input-group">
        <Search size={16} />
        <A.Input className="rw-input" placeholder={placeholder} />
        <A.Button className="rw-calendar-nav" aria-label="Clear search">
          <X size={15} />
        </A.Button>
      </A.Group>
    </A.SearchField>
  );
}
export interface RadioGroupProps extends Omit<
  A.RadioGroupProps,
  "children" | "className"
> {
  label: string;
  options: SelectOption[];
  description?: string;
  errorMessage?: string;
}
export function RadioGroup({
  label,
  options,
  description,
  errorMessage,
  ...props
}: RadioGroupProps) {
  return (
    <A.RadioGroup
      {...props}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field rw-radio-group"
    >
      <A.Label className="rw-label">{label}</A.Label>
      {description && (
        <A.Text slot="description" className="rw-description">
          {description}
        </A.Text>
      )}
      {options.map((o) => (
        <A.Radio
          key={o.id}
          value={o.id}
          isDisabled={o.disabled}
          className="rw-radio"
        >
          <span className="rw-radio-dot" />
          {o.label}
        </A.Radio>
      ))}
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
    </A.RadioGroup>
  );
}
export interface CheckboxGroupProps extends Omit<
  A.CheckboxGroupProps,
  "children" | "className"
> {
  label: string;
  options: SelectOption[];
  errorMessage?: string;
}
export function CheckboxGroup({
  label,
  options,
  errorMessage,
  ...props
}: CheckboxGroupProps) {
  return (
    <A.CheckboxGroup
      {...props}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field"
    >
      <A.Label className="rw-label">{label}</A.Label>
      {options.map((o) => (
        <Checkbox key={o.id} value={o.id} isDisabled={o.disabled}>
          {o.label}
        </Checkbox>
      ))}
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
    </A.CheckboxGroup>
  );
}
export interface SliderProps extends Omit<
  A.SliderProps<number | number[]>,
  "children" | "className"
> {
  label: string;
  thumbLabels?: string[];
}
export function Slider({ label, thumbLabels, ...props }: SliderProps) {
  return (
    <A.Slider {...props} className="rw-slider">
      <div className="rw-inline">
        <A.Label className="rw-label">{label}</A.Label>
        <A.SliderOutput className="rw-description" />
      </div>
      <A.SliderTrack className="rw-slider-track">
        {({ state }) => (
          <>
            {state.values.map((_, index) => (
              <A.SliderThumb
                key={index}
                index={index}
                aria-label={
                  thumbLabels?.[index] ??
                  (state.values.length > 1 ? `${label} ${index + 1}` : label)
                }
                className="rw-slider-thumb"
              />
            ))}
          </>
        )}
      </A.SliderTrack>
    </A.Slider>
  );
}
export interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  isDisabled?: boolean;
  onFilesChange: (files: File[]) => void;
  description?: ReactNode;
}
export function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  isDisabled,
  onFilesChange,
  description,
}: FileUploadProps) {
  const [error, setError] = useState("");
  const [names, setNames] = useState<string[]>([]);
  function receive(list: File[]) {
    const files = multiple ? list : list.slice(0, 1);
    const filters = accept
      ?.split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const invalid = files.find(
      (f) =>
        f.size > maxSize ||
        (filters &&
          !filters.some((t) =>
            t.startsWith(".")
              ? f.name.toLowerCase().endsWith(t)
              : t.endsWith("/*")
                ? f.type.startsWith(t.slice(0, -1))
                : f.type === t,
          )),
    );
    if (invalid) {
      setError(
        `${invalid.name} is not an accepted file type or exceeds ${Math.round(maxSize / 1024 / 1024)} MB.`,
      );
      return;
    }
    setError("");
    setNames(files.map((f) => f.name));
    onFilesChange(files);
  }
  return (
    <div className="rw-field">
      <span className="rw-label">{label}</span>
      <A.DropZone
        isDisabled={isDisabled}
        aria-label={label}
        className="rw-upload"
        onDrop={async (e) => {
          const files = await Promise.all(
            e.items
              .filter((i) => i.kind === "file")
              .map((i) => (i.kind === "file" ? i.getFile() : Promise.reject())),
          );
          receive(files);
        }}
      >
        <UploadCloud size={27} aria-hidden />
        <strong>Drop files here</strong>
        <span className="rw-description">
          {description ??
            `Up to ${Math.round(maxSize / 1024 / 1024)} MB per file`}
        </span>
        <A.FileTrigger
          acceptedFileTypes={accept?.split(",")}
          allowsMultiple={multiple}
          onSelect={(files) => files && receive(Array.from(files))}
        >
          <Button variant="secondary" isDisabled={isDisabled}>
            Browse files
          </Button>
        </A.FileTrigger>
      </A.DropZone>
      {error && (
        <p role="alert" className="rw-error">
          {error}
        </p>
      )}
      {names.length > 0 && (
        <ul className="rw-file-list" aria-label="Selected files">
          {names.map((name, i) => (
            <li key={`${i}-${name}`}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export interface ToggleButtonProps extends Omit<
  A.ToggleButtonProps,
  "children" | "className"
> {
  children: ReactNode;
}
export function ToggleButton({ children, ...props }: ToggleButtonProps) {
  return (
    <A.ToggleButton
      {...props}
      className="rw-button rw-button--secondary rw-toggle"
    >
      {children}
    </A.ToggleButton>
  );
}
export interface SegmentedControlProps extends Omit<
  A.ToggleButtonGroupProps,
  "children" | "className"
> {
  label: string;
  options: SelectOption[];
}
export function SegmentedControl({
  label,
  options,
  ...props
}: SegmentedControlProps) {
  return (
    <A.ToggleButtonGroup {...props} aria-label={label} className="rw-segmented">
      {options.map((o) => (
        <A.ToggleButton
          key={o.id}
          id={o.id}
          isDisabled={o.disabled}
          className="rw-button rw-button--ghost"
        >
          {o.label}
        </A.ToggleButton>
      ))}
    </A.ToggleButtonGroup>
  );
}
