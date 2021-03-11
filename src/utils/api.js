import axios from "axios";
import { apiClient } from "@liskhq/lisk-client";

export const getHttpClient = () => axios;

let wsClientCache;

export const getWsClient = async () => {
  const endpoint = process.env.REACT_APP_WS_API;

  if (!wsClientCache) {
    wsClientCache = await apiClient.createWSClient(endpoint);
  }

  return wsClientCache;
};

export const uploadFile = async file => {
  const endpoint = `${process.env.REACT_APP_IPFS_API}/ipfs/upload/file`;

  const client = getHttpClient();

  let formData = new FormData();
  formData.append("file", file);

  return client
    .post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res => res.data);
};

export const uploadText = async text => {
  const endpoint = `${process.env.REACT_APP_IPFS_API}/ipfs/upload/text`;

  const client = getHttpClient();

  return client
    .post(endpoint, text, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then(res => res.data);
};

export const downloadIpfsAsset = async cid => {
  const endpoint = `${process.env.REACT_APP_IPFS_API}/ipfs/${cid}`;

  const client = getHttpClient();
  const res = await client.get(endpoint);

  if (res.headers["content-type"].includes("text")) {
    return res.data;
  }

  return new File([res.data], cid);
};
