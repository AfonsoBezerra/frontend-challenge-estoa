import * as SelectRadix from '@radix-ui/react-select';
import { CaretDownIcon } from '@radix-ui/react-icons';

type SelectProps = {
  placeholder: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
};
type SelectOptionProps = Types.FC<{ value: string }, {}, false>;

export const Select: Types.FC<SelectProps, {}, false> & { Option: SelectOptionProps } = ({
  children,
  placeholder,
  defaultValue,
  onValueChange,
}) => {
  return (
    <div className="relative z-50 max-w-[250px] w-full [&>div]:w-full [&>div]:!absolute [&>div]:left-0">
      <SelectRadix.Root defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectRadix.Trigger className="flex outline-none focus:ring-4 ring-yellow-400/20 items-center w-full justify-between px-4 py-2  border-2 border-yellow-500 rounded-md">
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon>
            <CaretDownIcon className="w-6 h-6 text-yellow-500" />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Content
          sideOffset={8}
          position="popper"
          className="bg-zinc-800 py-2 rounded-md"
        >
          <SelectRadix.Viewport>{children}</SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Root>
    </div>
  );
};

Select.Option = ({ children, value }) => {
  return (
    <SelectRadix.Item
      value={value}
      className="flex items-center h-6 p-5 relative select-none focus:bg-zinc-600 outline-none [&[data-state=checked]]:bg-zinc-500 [&[data-state=checked]]:focus:bg-zinc-500"
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  );
};
