import InputField from '@/app/components/_inputs/InputField';
import Select from '@/app/components/_inputs/SelectField';

// components/ComponentMap.js
const componentMap = {
  text: InputField,
  email: InputField,
  select: Select,
  // Add other component types as needed
};

export default componentMap;