import useAxios from "axios-hooks";

import { host } from "../../config";

export function useLoginMutation() {
  const [{ data, loading, error }, login] = useAxios(
    {
      url: `${host}/api/passwordLogin`,
      method: "POST",
    },
    { manual: true }
  );

  return [login];
}
