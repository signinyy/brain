<template>
  <!-- 布局的最外层结构 -->
  <html>
  <head>
    <meta charset="UTF-8">
    <title>个人知识库</title>
  </head>
  <body>
  <!-- 应用的主容器 -->
  <div id="app">
    <div class="brain">
      <div class="container"  :style="{ width: sidebarWidth + 'px' }">
        <div class="index-module">
          <div class="dashboardsidebar"  :style="{ width: sidebarWidth + 'px' }">
            <div class="sidebarmenu">
             <div>
               <div class="sidebar-icon">
                 <div class="logo">
                   <img class="image" src="../assets/鸟.png" style="height: 28px">
                 </div>
               </div>
             </div>
            </div>
          </div>
          <div class="dragBar"  :style="{ width: sidebarWidth + 'px' }">
          </div>
          <div class="resize" @mouseover="showResizeIcon = true" @mouseout="showResizeIcon = false"  @click="toggleSidebarWidth">
            <div class="dargBar-resizeBar"  v-if="showResizeIcon">
              <img  class="review-arrow-right" src="../assets/images/收缩.png" @click.stop="toggleSidebarWidth">
            </div>
          </div>
        </div>
      </div>
      <div class="main-wrapper" style="width: calc(-254px + 100vw); margin-left: 254px; margin-right: 0px;">
        <div class="main-right-content">
          <div class="mainright">
            <div class="dashboardlayout">
              <div class="ant-row" style="row-gap: 0px">
                <div class="sidebarin">
                  <div class="brainlogo">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
  </html>
</template>

<script>
export default {
  data() {
    return {
      sidebarWidth: 254, // 初始宽度
      showResizeIcon: false, // 控制图标显示与隐藏
    };
  },
  methods: {
    toggleSidebarWidth() {
      if (this.sidebarWidth === 60) {
        this.sidebarWidth = 254;
      } else {
        this.sidebarWidth = 60;
      }
    },
  },
};
</script>

<style scoped>
*{box-sizing: border-box;}
html body{
  background-color: #fff;
  color: #262626;
  font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  counter-reset: katexEqnNo mmlEqnNo;
  width: 100vw;
  scroll-behavior: smooth;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: "tnum","tnum";
  height: 100%;
}
.brain{
  position: relative;
  background: #fff;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container{
  height: 100vh;
  position: fixed;
  z-index: 101;
}
.index-module{height: 100%;}
.dashboardsidebar{
  border-right: 1px solid rgba(0,0,0,0.04);
  background-color:#fafafa;
  height: 100%;
  padding: 10px 0 0 0;
}
.resize:hover .dargBar-resizeBar {
  display: block;
}
.sidebarmenu{
  height: 100%;
  display: flex;
  flex-direction: column;
}
dragBar::after{
  content: "";
  transition: backgroundcolor .2s ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 6px;
  width: 100%;
  border-right: 1px solid #eff0f0;
}
.dragBar::before{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  transition: all .2s ease-in-out;
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
.resize{
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
  cursor: pointer;
}
.dargBar-resizeBar{
  height: 44px;
  width: 14px;
  background-color: #fff;
  border: 1px solid #e7e9e8;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.06);
  border-radius: 8px;
  line-height: 28px;
  text-align: center;
  z-index: 999;
  margin-left: 10px;
  display: none;
}
.review-arrow-right{
  line-height: 1;
  position: relative;
  top: 7px;
  left: -1px;
  width: 10px;
  height: 10px;
  color: #8a8f8d;
  overflow: hidden;
  display: inline-block;
  font-style: normal;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
}
.main-wrapper{
  background: #fff;
  flex: 1 0;
}
.main-right-content{
  width: 100%;
  overflow-y: auto;
  padding-top: 0;
}
.mainright{
  min-height: calc(100vh - 108px);
}
.dashboardlayout{
  background-color: #fff;
  min-height: calc(100vh - 52px);
}
.ant-row{
  display: flex;
  flex-flow: row wrap;
}
.sidebarin{
  padding: 0;
  flex: auto;
  min-width: 0;
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
.sidebar-icon{
  display: flex;
  justify-content: space-between;
  line-height: 32px;
  height: 32px;
  padding: 0 12px;
}
.logo{
  min-width: 105px;
  display: flex;
}
.brainlogo{
  min-width: 105px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>