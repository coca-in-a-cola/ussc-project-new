import { useSelector } from 'react-redux';

export function useProfile() {
  const profile = useSelector((state) => state.profile);

  const isFilledProfile = () => {
    for (let [_, value] of Object.entries(profile)) {
      if (value === null) return false;
    }
    return true;
  };

  return [{ ...profile }, isFilledProfile];
}
