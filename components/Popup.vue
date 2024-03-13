<template>
  <transition name="fade">
    <div class="popup" v-if="visible" @click="handleClickOutside">
      <!-- 弹窗内容，使用阻止冒泡来确保点击内容内部不会关闭弹窗 -->
      <div class="popup-content" @click.stop>
        <div class="dropdown">
          <div class="dropdown-item">
            <div class="dropdown-item-prefix">
              <img class="set" src="../assets/images/设置.png" style="font-size: 14px;width: 16px;height: 16px">
            </div>
            <div class="set-children" style="flex: 1">账户设置</div>
          </div>
          <div class="divider"></div>
          <div class="dropdown-item">
            <div class="dropdown-item-prefix">
              <img class="quit" src="../assets/images/退出登录.png" style="font-size: 14px;width: 16px;height: 16px">
            </div>
            <div class="quit-children" style="flex: 1">
              <span class="color-danger">退出登录</span>
            </div>
            <div class="login-out">
              <span class="loginout-tooltip" @click="switchLanguage">
                <div class="linkwrapper">
                  <img class="set-icon" :src="currentLanguage === 'zh' ? zhIcon : enIcon" alt="Language">
                  <span class="tooltiptext">{{ currentLanguage === 'zh' ? '切换中文' : 'English' }}</span>
                </div>
              </span>
            </div>
            <div class="login-out">
              <span class="loginout-tooltip"  @click="switchTheme">
                <div class="linkwrapper">
                  <img class="switchtheme-icon" :src="currentTheme === 'light' ? lightIcon : darkIcon" alt="Theme">
                  <span class="tooltiptext">{{ currentTheme === 'light' ? '亮色' : '暗黑' }}</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref } from "vue";
defineProps({
  visible: Boolean
});
const emit = defineEmits(['update:visible']);

function handleClickOutside(event) {
  // 检查点击事件的目标是否是弹窗内容或其子元素
  if (!event.target.closest('.popup-content')) {
    // 如果不是，则关闭弹窗
    emit('update:visible', false);
  }
}

const currentLanguage = ref('en'); // 假设初始语言是英文
const currentTheme = ref('light'); // 假设初始主题是浅色

const zhIcon = '/切换中文.png';
const enIcon = '/中英文切换（英）.png';
const lightIcon = '/太阳.png';
const darkIcon = '/月亮.png';

function switchLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'zh' : 'en';
}

function switchTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
}
</script>

<style scoped>
.quit-children:hover{background-color: #e4e6e7}
.set-children:hover{background-color: #e4e6e7}
.linkwrapper:hover{background-color: #e4e6e7}
/* Popup 样式 */
.popup {
  /* 确保弹窗覆盖了整个可点击区域 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
.popup-content {
  opacity: 1;
  transform-origin: center bottom 0px;
  transform: scale(1);
  transition: opacity 0.225s cubic-bezier(0.075, 0.82, 0.165, 1) 0s, transform 0.225s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  z-index: 1063;
  position: absolute;
  left: 3px;
  top: 676px;
  width: max-content;
}
.dropdown{
  font-size: 14px;
  color: #262626;
  overflow-y: hidden;
  max-height: 280px;
  padding: 8px 0;
  background: #fff;
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow:  0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
  min-width: 208px;
}
.dropdown-item{
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  min-height: 32px;
  margin: 0 8px;
  padding: 4px 8px;
  background: #fff;
  border-radius: 4px;
  transition: .15s;
}
.dropdown-item-prefix{
  display: flex;
  align-items: center;
  width: max-content;
  margin-right: 8px;
}
.divider{
  margin: 8px 0;
  width: 100%;
  border-bottom: 1px solid #dee0e3;
  font-size: 14px;
  color: #262626;
}
.login-out{
  display: flex;
  align-items: center;
}
.login-out .loginout-tooltip{
  height: 32px;
  width: 32px;
  border: 1px solid #e7e9e8;
  border-radius: 6px;
  margin-left: 8px;
  cursor: pointer;
}
.login-out .loginout-tooltip .linkwrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 100%;
  color: #8a8f8d;
}
.linkwrapper{overflow: hidden;}
.login-out .loginout-tooltip .linkwrapper img{font-size: 20px}
.set-icon{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  width: 16px;
  height: 16px;
}
.switchtheme-icon{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  width: 16px;
  height: 16px;

}
.login-out {
  display: flex;
  align-items: center;
}

.loginout-tooltip {
  position: relative; /* 用于定位 tooltip */
  display: inline-block;
  cursor: pointer;
}

.loginout-tooltip .tooltiptext {
  visibility: hidden;
  width: auto; /* 根据内容自动调整宽度 */
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 4px 8px; /* 调整内边距 */
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  bottom: 100%; /* 定位到元素下方 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  opacity: 0;
  transition: opacity 0.3s, bottom 0.3s; /* 过渡效果 */
  white-space: nowrap; /* 防止文本换行 */
  font-size: 12px; /* 调整字体大小 */
}

.loginout-tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  bottom: calc(100% + 10px); /* 根据需要调整距离 */
}

.set-icon,
.switchtheme-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle; /* 垂直居中图标 */
  transition: transform 0.2s; /* 过渡效果 */
}

.loginout-tooltip:hover .set-icon,
.loginout-tooltip:hover .switchtheme-icon {
  transform: scale(1.1); /* 悬停时放大图标 */
}
</style>