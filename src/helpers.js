import axios from "axios";

export const updateQlikTask = async function (connectionData) {
  connectionData.modifiedDate = new Date().toISOString();
  await makeRequest(
    "PUT",
    `externalprogramtask/${connectionData.id}`,
    connectionData
  );
};

export const deleteQlikTask = async function (taskId) {
  await makeRequest("DELETE", `externalprogramtask/${taskId}`);
};

export const createQlikTask = async function (taskData) {
  await makeRequest("POST", "externalprogramtask", taskData);
};

export const getQlikTasks = async function () {
  return await makeRequest("GET", "externalprogramtask/full").then(
    (response) => {
      return response.data;
    }
  );
};

export const getQlikTask = async function (taskId) {
  return await makeRequest("GET", "externalprogramtask/full");
};

export async function makeRequest(method, path, data) {
  let config = {
    method: method,
    url: `https://SENSE_HOST/jwt/qrs/${path}?xrfkey=123456789ABCDEFG`,
    headers: {
      authorization: `Bearer SENSE_JWT`,
      "x-Qlik-Xrfkey": "123456789ABCDEFG",
    },
  };

  if (data) config.data = data;

  const res = await axios(config);

  return res;
}
