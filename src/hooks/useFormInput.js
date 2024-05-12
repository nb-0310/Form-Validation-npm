import React from 'react';

const useFormInput = (initialValue, isFile = false) => {
  const [value, setValue] = React.useState(initialValue);
  const [file, setFile] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isFile) {
    const onChange = (event) => {
      setValue(event.target.value);
    };

    return { value, onChange };
  } else {
    const onChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile)
    }

    return { file, onChange }
  }
};

export default useFormInput;