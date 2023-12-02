import { Input } from "@ui-kitten/components";
import { TextInput } from "../../types/types";

interface inputProps {
  textInputProps: TextInput;
}

const TextInputBase = ({ textInputProps }: inputProps) => {

  return (
    <Input
      placeholder={textInputProps.placeholder}
      value={textInputProps.value}
      onChangeText={textInputProps.method}
    />
  );
};

export default TextInputBase;
