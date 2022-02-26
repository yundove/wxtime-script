import "dotenv";
import { driver } from "./helper.mjs";
import player from "./player.mjs";
import recorder from "./recorder.mjs";
import waitUntil, {
  FULLSCREEN_TIP_HIDE_DELAY_MS,
  LOOKUP_PLAYER_DETACT_DELAY_MS,
} from "./wait-until.mjs";

try {
  // 连接录像软件
  await recorder.connect();

  // 访问极客时间企业微信版本链接
  await driver.get(`https://wxtime.geekbang.org/`);

  // 等待用户扫码授权
  await waitUntil.userAuthorized();

  // 访问课程链接
  await driver.get(`https://wxtime.geekbang.org/course/detail/100026801-93596`);

  // 获取视频列表
  const videoList = await player.getVideoList();

  // 播放列表中的所有视频
  // 极客时间电脑版本的视频会自动播放下一节，等到最后一节课播放完成后跳出循环
  for (;;) {
    // 等待播放器组件加载
    await waitUntil.playerLoaded();

    // 获取播放器视频标题
    const title = await player.getTitle();

    // 查找真正的视频标题（视频标题肯定在列表中）
    const videoTitle = videoList.find((videoTitle) =>
      title.includes(videoTitle)
    );
    console.log(videoTitle);

    // 修改本地录制视频名称
    await recorder.rename(videoTitle);

    // 设置起始播放时间
    await player.setTime(0);

    // 设置全屏
    await player.setFullscreen();

    // 隐藏影响录屏的页面元素
    await player.hideControl();

    // 等待 firefox 浏览器的全屏提示消失
    await driver.sleep(FULLSCREEN_TIP_HIDE_DELAY_MS);

    // 开启视频录制
    await recorder.start();

    // 播放视频
    await player.play();

    // 等待视频播放完成
    await waitUntil.videoEnd();

    // 播放完成时，停止视频录制
    await recorder.stop();

    // 当视频播放到列表中最后一条时，终止循环
    if (videoTitle === videoList[videoList.length - 1]) {
      break;
    } else {
      await driver.sleep(LOOKUP_PLAYER_DETACT_DELAY_MS);
    }
  }
} catch (err) {
  console.error(err);
} finally {
  // 停止录屏，并断开连接
  await recorder.stop();
  await recorder.disconnect();

  // 终止模拟
  await driver.quit();
}
