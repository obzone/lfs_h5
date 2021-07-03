import { useAxios } from "../../context/axios";

import { host } from "../../config";

export function useGetKnowledgeQuery(id) {
  const [{ data, loading, error }] = useAxios({
    url: `${host}/api/knowledges/${id}`,
    method: "GET",
  });
  return [data, loading, error];
}
