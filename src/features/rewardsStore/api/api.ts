import axios from "axios";

export const getServicerCurrentScore = async (agencyCode: string) => {
  const { data } = await axios.get(`/api/proxy/GetServicerCurrentScore`, {
    params: { agencyCode },
  });
  return data;
};

// export const getServicerData = async (agencyCode: string) => {
//   const { data } = await axios.get(`/api/proxy/GetServicerData`, {
//     params: { agencyCode },
//   });
//   return data;
// };