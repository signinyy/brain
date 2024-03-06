<template >
  <NuxtLayout>
    <template v-slot:sidebar>
      <!-- 侧边栏的具体内容 -->
      <div class="sidebar-icon">
        <div class="logo">
          <a href="http://localhost:3000">
            <img class="image" src="../assets/images/鸟.png" style="height: 28px">
          </a>
        </div>
      </div>
      <!--搜索框布局-->
      <div class="sidebarAction">
        <div class="inputSearch">
          <div class="searchContainer">
            <span class="ant-input">
              <span class="ant-input-prefix">
                <img class="search-icon" src="../assets/images/搜索.png">
              </span>
              <input class="ant-input-disabled" autocomplete="false" disabled="" placeholder="搜索" type="text" value="">
              <span class="ant-input-suffix">Ctrl J</span>
            </span>
          </div>
        </div>
      </div>
      <!--菜单-->
      <ul class="ant-menu sidebarmenu menuwrapper">
        <li class="menu-item" style="padding-left: 10px;" title="开始">
          <img class="brain-icon" src="../assets/images/开始.png">
          <span class="title-content">
            <a href="/dashboard">开始</a>
          </span>
        </li>
        <li class="note" style="padding-left: 10px;" title="小记">
          <img class="brain-icon" src="../assets/images/百灵图标.png">
          <span class="title-content">
            <a href="/dashboard/notes">小记</a>
          </span>
        </li>
        <li class="star" style="padding-left: 10px;" title="收藏">
          <img class="brain-icon" src="../assets/images/收藏.png">
          <span class="title-content">
            <a href="/dashboard/collections">收藏</a>
          </span>
        </li>
        <li class="garden" style="padding-left: 10px;" title="逛逛">
          <img class="brain-icon" src="../assets/images/分类花瓣.png">
          <span class="title-content">
            <a href="/dashboard/explore">逛逛</a>
          </span>
        </li>
      </ul>






      <div class="bottomuser">
        <div class="index-bottom">
          <div class="module_tip">

          </div>
        </div>
      </div>
    </template>

    <!-- 主内容 -->
    <div slot="main">
      <div class="main-content">
        <!-- 主内容的具体内容 -->
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import NuxtLayout from '../layouts/default.vue';

</script>

<style scoped>
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
.sidebarAction{
  display: flex;
  justify-content: space-between;
}
.inputSearch{
  display: flex;
  padding: 0 11px;
  margin: 16px 0;
  width: 100%;
}
.searchContainer{
  flex: 1;
  margin-right: 12px;
}
.inputSearch .ant-input{
  width: 90%;
  background: #eff0f0;
  height: 32px;
  cursor: pointer;
  border: 0;
  opacity: 1;
  border-radius: 8px;
  color: #bec0bf;
}
.ant-input{
  position: relative;
  min-width: 0;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  transition: all .3s;
  display: inline-flex;
}
.ant-input .ant-input-prefix{
  color: rgba(0,0,0,0.45);
  background-color: transparent;
}
.ant-input-prefix{
  margin-right: 4px;
  display: flex;
  flex: none;
  align-items: center;
}
.inputSearch .ant-input img{font-size: 18px;cursor: pointer}
.search-icon{
  color: #8a8f8d;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  width: 18px;
  height: 18px;
}
img:not(:root){overflow: hidden;}
.ant-input .ant-input-disabled{
  background: transparent;
}
.inputSearch .ant-input-prefix input{
  color: #bec0bf;
  opacity: 1;
  pointer-events: none;
}
.ant-input > input.ant-input-disabled{
  padding: 0;
  border: none;
  outline: none;
}
.ant-input-disabled{
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum","tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  font-size: 14px;
  line-height: 1.5715;
  border-radius: 6px;
  transition: all .3s;
  cursor: not-allowed;
}
input{overflow: visible;font-family: inherit}
.ant-input .ant-input-suffix{background-color: transparent}
.ant-input-suffix{
  margin-left: 4px;
  display: flex;
  flex: none;
  align-items: center;
}
.ant-menu::after{clear: both}
.ant-menu::after .ant-menu::before{display: table;content: ""}
::selection{color: inherit;background: rgba(27,162,227,.2);}
.sidebarmenu,.menuwrapper{
  border: 0;
  padding: 0 10px;
  width: 90% !important;
  background-color: #fafafa;
  box-shadow: none;
}
.ant-menu{
  box-shadow: none;
  background: #fff;
  flex: 0 0 auto;
  margin: 0;
  font-variant: tabular-nums;
  font-feature-settings: "tnum","tnum";
  color: #262626;
  font-size: 14px;
  line-height: 0;
  text-align: left;
  list-style: none;
  outline: none;
  border-radius: 6px;
  transition: background .3s,width .3s cubic-bezier(.2,0,0,1) 0s;
}
.menu-item:not(:last-child){margin: 2px 0;}
.menu-item:hover{background-color: #eff0f0}
.sidebarmenu .menuwrapper .menu-item{
  transition: none;
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 100%;
}
.menu-item .ant-menu{
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-overflow: ellipsis;
  position: relative;
}
.menu-item{white-space: nowrap;cursor: pointer;color: #262626}

.note:hover{background-color: #eff0f0}
.note:not(:last-child){margin: 2px 0;}
.sidebarmenu .menuwrapper .note{
  transition: none;
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 100%;
}
.note .ant-menu{
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-overflow: ellipsis;
  position: relative;
}
.note{white-space: nowrap;cursor: pointer;color: #262626}

.star:hover{background-color: #eff0f0}
.star:not(:last-child){margin: 2px 0;}
.sidebarmenu .menuwrapper .star{
  transition: none;
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 100%;
}
.star .ant-menu{
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-overflow: ellipsis;
  position: relative;
}
.star{white-space: nowrap;cursor: pointer;color: #262626}

.garden:hover{background-color: #eff0f0}
.garden:not(:last-child){margin: 2px 0;}
.sidebarmenu .menuwrapper .garden{
  transition: none;
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 100%;
}
.garden .ant-menu{
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-overflow: ellipsis;
  position: relative;
}
.garden{white-space: nowrap;cursor: pointer;color: #262626}

.title-content{
  flex: auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
a{
  transition: opacity .2s ease-in-out;cursor: pointer;
  touch-action: manipulation;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  color: #262626;
}


















.sidebarmenu .menuwrapper .brain-icon{margin-right: 10px}
.brain-icon{
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;width: 16px;height: 16px;}

.bottomuser{
  flex: 0 0 auto;
  padding: 0 11px;
  margin-top: 12px;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink:0;
}
.index-bottom{
  display: none;
  background-color: #fcf5e6;
  border: 1px solid #f6e1ac;
  height: auto;
  width: 90%;
  max-width: 250px;
  padding: 10px;
  border-radius: 8px;
}
.module_tip{
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
</style>