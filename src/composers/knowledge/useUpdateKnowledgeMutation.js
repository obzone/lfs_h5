import { useAxios } from "../../context/axios";

import { host } from "../../config";

export function useUpdateKnowledgeMutation(id) {
  const [_t, uploadKnowledge] = useAxios(
    {
      url: `${host}/api/knowledges/${id}`,
      method: "PUT",
    },
    { manual: true }
  );

  return [uploadKnowledge];
}
