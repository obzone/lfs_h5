import { useAxios } from "../../context/axios";

import { host, qiniu_upload_host } from "../../config";

export function useUploadMediaMutation() {
  const [_t, getToken] = useAxios(
    {
      url: `${host}/api/qiniu/token`,
      method: "GET",
    },
    { manual: true }
  );

  const [_u, uploadMedia] = useAxios(
    {
      url: qiniu_upload_host,
      method: "POST",
    },
    { manual: true }
  );

  return [getToken, uploadMedia];
}
