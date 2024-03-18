<template>
  <!-- 布局的最外层结构 -->
  <!-- 应用的主容器 -->
  <div id="app">
    <div class="brain">
      <div class="container"  :style="{ width: sidebarWidth + 'px' }">
        <div class="index-module" :style="{ width: sidebarWidth + 'px' }">
          <div class="dashboardsidebar" :style="{ width: sidebarWidth + 'px' }" >
            <div class="sidebarmenu">
              <slot name="sidebar"></slot>
            </div>
          </div>
          <div class="dragBar"
               :style="{ left: sidebarWidth + 'px' }"
               @mousedown="startDrag"
               ref="dragBarRef">
          </div>
        </div>
      </div>
      <div class="main-wrapper"   :style="{ marginLeft: sidebarWidth + 'px' }">
        <div class="main-right-content">
          <div class="mainright">
            <div class="dashboardlayout">
              <div class="ant-row" style="row-gap: 0;">
                  <slot name="main"></slot>
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

const sidebarWidth = ref(216);
const dragging = ref(false);
const dragBarRef = ref(null);

function startDrag(event) {
  dragging.value = true;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  event.preventDefault();
}

function onDrag(event) {
  if (dragging.value) {
    const newWidth = event.pageX - dragBarRef.value.getBoundingClientRect().x;
    const clampedWidth = Math.max(208, Math.min(newWidth, 400));
    sidebarWidth.value = clampedWidth;
  }
}

function stopDrag() {
  dragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

onMounted(() => {
  if (dragBarRef.value) {
    dragBarRef.value.addEventListener('mousedown', startDrag);
  }
});

onUnmounted(() => {
  if (dragBarRef.value) {
    dragBarRef.value.removeEventListener('mousedown', startDrag);
  }
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>


<style scoped>
::selection {
  color: inherit;
  background: rgba(27, 162, 227, .2);
}

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

.dragBar:hover{
  cursor: col-resize;
}

.dragBar{
  position: absolute;
  z-index: 1010;
  top: 0;
  bottom: 0;
  right: -6px;
  width: 6px;
  user-select: none;
  cursor: col-resize;
}
.dragBar:after{
  content: "";
  transition: backgroundcolor .2s ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 6px;
  width: 100%;
  border-right: 1px solid #eff0f0;
}
.dragBar:before{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  transition: all .2s ease-in-out;
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
</style>