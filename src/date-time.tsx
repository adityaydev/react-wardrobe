import * as A from "react-aria-components";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useThemeAttributes } from "./provider";
export interface DateFieldProps extends Omit<
  A.DateFieldProps<A.DateValue>,
  "children" | "className"
> {
  label: string;
  errorMessage?: string;
}
export function DateField({ label, errorMessage, ...props }: DateFieldProps) {
  return (
    <A.DateField
      {...props}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field"
    >
      <A.Label className="rw-label">{label}</A.Label>
      <A.DateInput className="rw-date-input">
        {(s) => <A.DateSegment segment={s} className="rw-date-segment" />}
      </A.DateInput>
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
    </A.DateField>
  );
}
export interface TimeFieldProps extends Omit<
  A.TimeFieldProps<A.TimeValue>,
  "children" | "className"
> {
  label: string;
  errorMessage?: string;
}
export function TimeField({ label, errorMessage, ...props }: TimeFieldProps) {
  return (
    <A.TimeField
      {...props}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field"
    >
      <A.Label className="rw-label">{label}</A.Label>
      <A.DateInput className="rw-date-input">
        {(s) => <A.DateSegment segment={s} className="rw-date-segment" />}
      </A.DateInput>
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
    </A.TimeField>
  );
}
export interface RangeCalendarProps extends Omit<
  A.RangeCalendarProps<A.DateValue>,
  "children" | "className"
> {
  className?: string;
}
export function RangeCalendar(props: RangeCalendarProps) {
  return (
    <A.RangeCalendar
      {...props}
      className={`rw-calendar ${props.className ?? ""}`}
    >
      <header>
        <A.Button slot="previous" className="rw-calendar-nav">
          <ChevronLeft size={17} />
        </A.Button>
        <A.Heading />
        <A.Button slot="next" className="rw-calendar-nav">
          <ChevronRight size={17} />
        </A.Button>
      </header>
      <A.CalendarGrid>
        {(date) => <A.CalendarCell date={date} className="rw-calendar-cell" />}
      </A.CalendarGrid>
    </A.RangeCalendar>
  );
}
export interface DateRangePickerProps extends Omit<
  A.DateRangePickerProps<A.DateValue>,
  "children" | "className"
> {
  label: string;
  errorMessage?: string;
}
export function DateRangePicker({
  label,
  errorMessage,
  ...props
}: DateRangePickerProps) {
  const theme = useThemeAttributes();
  return (
    <A.DateRangePicker
      {...props}
      isInvalid={!!errorMessage || props.isInvalid}
      className="rw-field"
    >
      <A.Label className="rw-label">{label}</A.Label>
      <A.Group className="rw-date-input rw-date-range">
        <A.DateInput slot="start">
          {(s) => <A.DateSegment segment={s} className="rw-date-segment" />}
        </A.DateInput>
        <span aria-hidden>–</span>
        <A.DateInput slot="end">
          {(s) => <A.DateSegment segment={s} className="rw-date-segment" />}
        </A.DateInput>
        <A.Button className="rw-calendar-nav">
          <CalendarDays size={16} />
        </A.Button>
      </A.Group>
      <A.FieldError className="rw-error">{errorMessage}</A.FieldError>
      <A.Popover {...theme} className="rw-root rw-popover">
        <A.Dialog className="rw-calendar-dialog">
          <RangeCalendar />
        </A.Dialog>
      </A.Popover>
    </A.DateRangePicker>
  );
}
