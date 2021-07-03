import { useAxios } from "../../context/axios";

import { host } from "../../config";

export function useCreateKnowledgeMutation() {
  const [_t, createKnowledge] = useAxios(
    {
      url: `${host}/api/knowledges`,
      method: "POST",
    },
    { manual: true }
  );

  return [createKnowledge];
}
