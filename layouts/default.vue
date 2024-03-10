<template>
  <!-- 布局的最外层结构 -->
  <!-- 应用的主容器 -->
  <div id="app">
    <div class="brain">
      <div class="container" style="width: 216px">
        <div class="index-module">
          <div class="dashboardsidebar">
            <div class="sidebarmenu">
              <slot name="sidebar"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="main-wrapper"  style="width: calc(-216px + 100vw); margin-left: 216px; margin-right: 0px;">
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

</script>


<style scoped>
::selection {
  color: inherit;
  background: rgba(27,162,227,.2);
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
.dragBar:hover .resize {
  display: block; /* 悬停时显示 */
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

.main {
  padding: 0;
  flex: auto;
  min-width: 0;
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
</style>