import { useAxios } from "../../context/axios";
import { host } from "../../config";

export function useGetKnowledgesQuery() {
  const [{ data, loading, error }, getKnowledges] = useAxios(
    {
      url: `${host}/api/knowledges`,
      method: "GET",
    },
    {
      useCache: false,
    }
  );
  return [data, loading, error, getKnowledges];
}
