import { useAxios } from "../../context/axios";

import { host } from "../../config";

export function useDeleteKnowledgeMutation(id) {
  const [_t, deleteKnowledge] = useAxios(
    {
      url: `${host}/api/knowledges/${id}`,
      method: "DELETE",
    },
    { manual: true }
  );

  return [deleteKnowledge];
}
