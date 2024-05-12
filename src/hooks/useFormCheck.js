import React from 'react';

const useFormCheck = (initialValue) => {
  const [checked, setChecked] = React.useState(initialValue)

  React.useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  const onChange = () => {
    setChecked(!checked)
  };

  return { checked, onChange };

};

export default useFormCheck;