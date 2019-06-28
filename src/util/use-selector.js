import { useSelector as useSelectorOriginal } from 'react-redux';

export default function useSelector(selector) {
  const value = useSelectorOriginal(selector);
  if (value && value.toJS) {
    return value.toJS();
  }
  return value;
}
