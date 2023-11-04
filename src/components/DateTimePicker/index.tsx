import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface Props {
  label: string;
  date: Dayjs | null;
  field: string;
  setFieldValue: (field: string, value: Dayjs | null) => void;
}

export default function BasicDateTimePicker({
  label,
  date,
  setFieldValue,
  field,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          value={date}
          onChange={(value) => setFieldValue(field, value)}
          label={label}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
