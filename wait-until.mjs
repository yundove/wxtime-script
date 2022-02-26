import { until } from "selenium-webdriver";
import { playerElGetter } from "./element.mjs";
import { driver } from "./helper.mjs";
import player from "./player.mjs";

// 检测视频播放完成比较阈值
export const VIDEO_END_DETACT_MS = 1000;

// Firefox 全屏提示消失延迟
export const FULLSCREEN_TIP_HIDE_DELAY_MS = 5000;

// 查找播放器延迟探测时间，比视频播放完成阈值大一点
export const LOOKUP_PLAYER_DETACT_DELAY_MS = VIDEO_END_DETACT_MS + 1000;

// 授权成功后加载出来页面，延迟一段时间后跳转，防止出现二次登录问题
export const AFTER_LOGINED_PAGE_LOADED_DELAY_MS = 3000;

async function userAuthorized() {
  await driver.wait(
    until.urlMatches(/https:\/\/open\.work\.weixin\.qq\.com\//)
  );
  await driver.wait(until.urlMatches(/https:\/\/wxtime\.geekbang\.org\//));

  // 等待登录成功落地页面部分加载
  await driver.sleep(AFTER_LOGINED_PAGE_LOADED_DELAY_MS);
}

async function playerLoaded() {
  await driver.wait(until.elementLocated(playerElGetter()));
}

async function videoEnd() {
  const endTime = await player.getEndTime();
  await driver.wait(async () => {
    const currentTime = await player.getTime();
    return endTime - currentTime <= VIDEO_END_DETACT_MS / 1000;
  });
}

export default {
  userAuthorized,
  playerLoaded,
  videoEnd,
};
