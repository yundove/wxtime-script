import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

async function connect() {
  const connection = { address: process.env.OBS_ADDRESS };
  if (process.env.OBS_PASSWORD) {
    connection.password = process.env.OBS_PASSWORD;
  }
  return await obs.connect(connection);
}

async function disconnect() {
  return obs.disconnect();
}

async function start() {
  return await obs.send("StartRecording");
}

async function stop() {
  return await obs.send("StopRecording");
}

async function rename(filename) {
  await obs.send("SetFilenameFormatting", {
    "filename-formatting": filename,
  });
}

export default {
  connect,
  disconnect,
  start,
  stop,
  rename,
};
