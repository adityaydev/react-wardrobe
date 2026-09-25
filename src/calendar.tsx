import {
  Calendar as AriaCalendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  Button as AriaButton,
  DatePicker as AriaDatePicker,
  DateInput,
  DateSegment,
  Label,
  Group,
  Popover,
  Dialog,
  FieldError,
  type CalendarProps as AriaCalendarProps,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
} from "react-aria-components";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useThemeAttributes } from "./provider";

export interface CalendarProps extends Omit<
  AriaCalendarProps<DateValue>,
  "children" | "className"
> {
  className?: string;
}
export function Calendar(props: CalendarProps) {
  return (
    <AriaCalendar {...props} className={`rw-calendar ${props.className ?? ""}`}>
      <header>
        <AriaButton slot="previous" className="rw-calendar-nav">
          <ChevronLeft size={17} />
        </AriaButton>
        <Heading />
        <AriaButton slot="next" className="rw-calendar-nav">
          <ChevronRight size={17} />
        </AriaButton>
      </header>
      <CalendarGrid>
        {(date) => <CalendarCell date={date} className="rw-calendar-cell" />}
      </CalendarGrid>
    </AriaCalendar>
  );
}
export interface DatePickerProps extends Omit<
  AriaDatePickerProps<DateValue>,
  "children" | "className"
> {
  label: string;
  errorMessage?: string;
  className?: string;
}
export function DatePicker({
  label,
  errorMessage,
  className,
  ...props
}: DatePickerProps) {
  const theme = useThemeAttributes();
  return (
    <AriaDatePicker
      {...props}
      isInvalid={props.isInvalid || !!errorMessage}
      className={`rw-field ${className ?? ""}`}
    >
      <Label className="rw-label">{label}</Label>
      <Group className="rw-date-input">
        <DateInput>
          {(segment) => (
            <DateSegment segment={segment} className="rw-date-segment" />
          )}
        </DateInput>
        <AriaButton className="rw-calendar-nav">
          <CalendarDays size={17} />
        </AriaButton>
      </Group>
      <FieldError className="rw-error">{errorMessage}</FieldError>
      <Popover {...theme} className="rw-root rw-popover">
        <Dialog className="rw-calendar-dialog">
          <Calendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}
