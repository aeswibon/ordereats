"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IOption, IOptionList } from "@u/types";

interface OptionSelectorProps {
  optionList: IOptionList;
  selectedOptions: IOption[];
  setSelectedOptions: (options: IOption[]) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  optionList,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleChange = (option: IOption, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => opt.id !== option.id));
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{optionList.name}</FormLabel>
      {optionList.selection_type === "must_select_one" ? (
        <RadioGroup
          value={selectedOptions[0]?.id || ""}
          onChange={(event) => {
            const selectedOption = optionList.options.find(
              (opt) => opt.id === parseInt(event.target.value)
            );
            if (selectedOption) {
              setSelectedOptions([selectedOption]);
            }
          }}
        >
          {optionList.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id.toString()}
              control={<Radio />}
              label={`${option.name} (${
                option.surcharge > 0
                  ? `+$${option.surcharge.toFixed(2)}`
                  : "Free"
              })`}
            />
          ))}
        </RadioGroup>
      ) : (
        <FormGroup>
          {optionList.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={selectedOptions.some((opt) => opt.id === option.id)}
                  onChange={(event) =>
                    handleChange(option, event.target.checked)
                  }
                />
              }
              label={`${option.name} (${
                option.surcharge > 0
                  ? `+$${option.surcharge.toFixed(2)}`
                  : "Free"
              })`}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default OptionSelector;
