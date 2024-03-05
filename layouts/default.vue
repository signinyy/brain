<template>
  <!-- 布局的最外层结构 -->
  <!-- 应用的主容器 -->
  <div id="app">
    <div class="brain">
      <div class="container" :style="{ width: sidebarWidth + 'px' }">
        <div class="index-module">
          <div class="dashboardsidebar">
            <div class="sidebarmenu">
              <slot name="sidebar"></slot>
            </div>
          </div>
          <div class="dragBar" @mousedown="startDrag" :style="{ left: sidebarWidth + 'px' }" ></div>
          <div class="resize" >
            <div class="dargBarresize" @click="toggleSidebar">
              <img class="contract-icon"  :class="{ 'rotate-icon': isCollapsed }"
                   src="../assets/images/收缩.png"
                   alt="Toggle Sidebar">
            </div>
          </div>
        </div>
      </div>
      <div class="main-wrapper" :style="{ width: mainWidth + 'px', marginLeft: sidebarWidth + 'px' }">
        <div class="main-right-content">
          <div class="mainright">
            <div class="dashboardlayout">
              <div class="ant-row">
                <div class="main">
                  <slot name="main"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarWidth = ref(216); // 侧边栏初始宽度
const mainWidth = ref('calc(100vw - 216px)'); // 主内容区域初始宽度
const isCollapsed = ref(true); // 侧边栏初始状态为收起
let dragStartX = 0; // 鼠标按下时的 X 坐标
let sidebarElement = null; // 侧边栏元素引用

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  sidebarWidth.value = isCollapsed.value ? 60 : 216; // 收起或展开的宽度
  mainWidth.value = isCollapsed.value ? 'calc(100vw - 60px)' : 'calc(100vw - 216px)';
};

const startDrag = (event) => {
  dragStartX = event.clientX;
  sidebarElement = event.target;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
};

const drag = (event) => {
  const dx = event.clientX - dragStartX;
  let newWidth = sidebarWidth.value + dx;
  const maxWidth = 400; // 最大宽度为 400px
  const minWidth = 208; // 最小宽度为 8px

  // 确保新宽度在最小和最大宽度之间
  newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

  // 更新侧边栏和主内容区域的宽度
  sidebarWidth.value = newWidth;
  mainWidth.value = `calc(100vw - ${newWidth}px)`;

  // 更新侧边栏元素的 left 属性
  sidebarElement.style.left = newWidth + 'px';
};

const endDrag = () => {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
};

onMounted(() => {
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
});

const resizeHandler = () => {
  sidebarWidth.value = isCollapsed.value ? 60 : 216;
  mainWidth.value = isCollapsed.value ? 'calc(100vw - 60px)' : 'calc(100vw - 216px)';
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}
.brain {
  position: relative;
  background: #fff;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  height: 100vh;
  position: fixed;
  z-index: 101;
}

.index-module {
  height: 100%;
}

.dashboardsidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  background-color: #fafafa;
  height: 100%;
  padding: 10px 0 0 0;
}

.sidebarmenu {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dragBar {
  position: absolute;
  z-index: 1010;
  top: 0;
  bottom: 0;
  right: -6px;
  width: 6px;
  user-select: none;
  cursor: col-resize;
}

.resize {
  width: 32px;
  height: 70px;
  position: absolute;
  top: 213px;
  right: 0;
  left: auto;
  transform: translateX(50%);
  padding-top: 15px;
  cursor: pointer;
  z-index: 1010;
}

.dragBar:hover .resize {
  display: block; /* 悬停时显示 */
}

.dargBarresize {
  height: 44px;
  width: 14px;
  background-color: #fff;
  border: 1px solid #e7e9e8;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .06);
  border-radius: 8px;
  line-height: 28px;
  text-align: center;
  margin-left: 10px;
}

.container .dargBarresize img {
  position: relative;
  top: 11px;
  left: -3px;
  width: 15px;
  height: 18px;
  color: #8a8f8d;
}
img:not(:root) {
  overflow: hidden;
}
.contract-icon {
  display: inline-block;
  font-style: normal;
  line-height: 1;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
}
.contract-icon {
  transition: transform 0.3s ease; /* 平滑过渡效果 */
}
.rotate-icon {
  transform: rotateY(180deg); /* 旋转180度 */
}
.main-wrapper {
  background: #fff;
  flex: 1 0;
  margin-left: 216px;
  margin-right: 0px;
}

.main-right-content {
  width: 100%;
  overflow-y: auto;
  padding-top: 0;
}

.mainright {
  min-height: calc(100vh - 108px);
}

.dashboardlayout {
  background-color: #fff;
  min-height: calc(100vh - 52px);
}

.ant-row {
  display: flex;
  flex-flow: row wrap;
}

.main {
  padding: 0;
  flex: auto;
  min-width: 0;
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
</style>