import {
  getElement,
  fullscreenElGetter,
  playerElGetter,
  statusTimeElGetter,
  playerTitleElGetter,
  playerCtrlWrapElGetter,
  videoListElGetter,
} from "./element.mjs";
import { driver } from "./helper.mjs";

async function play() {
  const playerEl = await getElement(playerElGetter);
  await driver.executeScript((el) => el.play(), playerEl);
}

async function pause() {
  const playerEl = await getElement(playerElGetter);
  await driver.executeScript((el) => el.pause(), playerEl);
}

async function setFullscreen() {
  const fullscreenBtn = await getElement(fullscreenElGetter);
  await fullscreenBtn.click();
}

async function setTime(time = 0) {
  const playerEl = await getElement(playerElGetter);
  await driver.executeScript(({ el, time }) => (el.currentTime = time), {
    el: playerEl,
    time,
  });
}

async function getTime() {
  const playerEl = await getElement(playerElGetter);
  return await driver.executeScript((el) => el.currentTime, playerEl);
}

async function getEndTime() {
  const statusTimeEl = await getElement(statusTimeElGetter);
  const statusTime = await driver.executeScript(
    (el) => el.textContent,
    statusTimeEl
  );
  const endTimeStr = statusTime
    .substring(statusTime.lastIndexOf(`/`) + 1)
    .replaceAll(" ", "");

  const endTime = endTimeStr
    .split(":")
    .reverse()
    .reduce((sum, cur, index) => sum + cur * 60 ** index, 0);
  return endTime;
}

async function getTitle() {
  const titleEl = await getElement(playerTitleElGetter);
  return await titleEl.getText();
}

async function getVideoList() {
  const playListEl = await getElement(videoListElGetter);
  return await driver.executeScript(
    (el) =>
      Array.from(el.querySelectorAll(`.detailMobile_title_23TI7`)).map((item) =>
        item.getAttribute(`title`)
      ),
    playListEl
  );
}

async function hideControl() {
  const titleEl = await getElement(playerTitleElGetter);
  const ctrlWrapEl = await getElement(playerCtrlWrapElGetter);

  await driver.executeScript((el) => (el.style.visibility = "hidden"), titleEl);
  await driver.executeScript(
    (el) => (el.style.visibility = "hidden"),
    ctrlWrapEl
  );
}

export default {
  play,
  pause,
  setFullscreen,
  setTime,
  getTime,
  getEndTime,
  getTitle,
  getVideoList,
  hideControl,
};
