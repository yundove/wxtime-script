import { By, until } from "selenium-webdriver";
import { driver } from "./helper.mjs";

export const statusTimeElGetter = () => By.css("[player-status-time]");
export const playerElGetter = () => By.css(".gk-video-player video");
export const fullscreenElGetter = () => By.css("[player-fullscreen-off]");
export const playerTitleElGetter = () => By.css("[player-title]");
export const playerCtrlWrapElGetter = () => By.css("[player-control-wrap]");
export const videoListElGetter = () => By.css(".detailMobile_videoList_3JVQc");

export async function getElement(elGetter) {
  await driver.wait(until.elementLocated(elGetter()));
  return await driver.findElement(elGetter());
}
