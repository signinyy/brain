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
              <span class="loginout-tooltip">
                <div class="linkwrapper">
                  <img class="set-icon" src="../assets/images/中英文切换（英）.png">
                </div>
              </span>
            </div>
            <div class="login-out">
              <span class="loginout-tooltip">
                <div class="linkwrapper">
                  <img class="switchtheme-icon" src="../assets/images/太阳.png">
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

const props = defineProps({
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
</script>

<style scoped>
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
</style>