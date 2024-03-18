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
            <nuxt-link to="/">开始</nuxt-link>
          </span>
        </li>
        <li class="note" style="padding-left: 10px;" title="小记">
          <img class="brain-icon" src="../assets/images/百灵图标.png">
          <span class="title-content">
            <nuxt-link to="/notes">小记</nuxt-link>
          </span>
        </li>
        <li class="star" style="padding-left: 10px;" title="收藏">
          <img class="brain-icon" src="../assets/images/收藏.png">
          <span class="title-content">
            <nuxt-link to="/collections">收藏</nuxt-link>
          </span>
        </li>
        <li class="garden" style="padding-left: 10px;" title="逛逛">
          <img class="brain-icon" src="../assets/images/分类花瓣.png">
          <span class="title-content">
            <nuxt-link to="/explore">逛逛</nuxt-link>
          </span>
        </li>
      </ul>
      <div style="display: none;" aria-hidden="true"></div>
      <div class=" dashboard-sidebar-scrollbar">
        <div class="knowledgemenu">
          <ul class="menu bookmenu resourcemenu">
            <li class="ant-menu-submenu" >
              <div class="menu-submenu-title" style="padding-left: 2px" >
                <div class="switch-arrow-wrap" @click="toggleSubMenu">
                  <img class="arrow-icon" :class="{ 'rotated': !isSubMenuOpen }"  src="../assets/images/下箭头.png" style="margin-right: 0px;width: 20px;min-width: 20px;height: 20px">
                </div>
                <span class="menu-title-content">
                  <div class="menutitle">
                    <nuxt-link  to="/books" class="span">知识库</nuxt-link>
                    <img class="arrowright-icon" src="../assets/images/右箭头.png" style="width: 16px;height: 16px">
                  </div>
                </span>
              </div>

              <ul id="menu-books-popup" class="ant-menu ant-menu-sub ant-menu-inline"  v-show="isSubMenuOpen"    >
                <div class="sortable" data-type="books" eventkey="知识库-sortable"   >
                  <li class="ant-menu-item menuItem"  style="padding-left: 2px;"
                      v-for="(item, index) in sortedItems"
                      :key="item.id"
                      :style="{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }"
                      @mousedown.prevent="startDrag" @mouseup="endDrag" @mousemove="drag"
                  >
                    <span class="itemAction item-drag-action" >
                      <img class="brain-icon-drag" src="../assets/images/拖动.png">
                    </span>
                    <div class="itemwrapper">
                      <div class="bookItem">
                        <nuxt-link :to="item.link"   class="link">
                          <div class="iconwrapper">
                            <img class="book-icon" src="../assets/images/知识库.png" style="width: 18px;height: 18px;min-width: 18px;">
                          </div>
                          <span class="sub-item-name index-module_name" title="d">{{ item.name }} </span>
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="badgewrapper"></div>
                    <span class="itemAction books-action" @click="removeItem(index)">
                      <img class="icon-new-ellipsis" src="../assets/images/删除.png" >
                    </span>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
          <div style="display: none;" aria-hidden="true">
            <div class="sortable" data-type="books" eventkey="知识库-sortable"></div>
          </div>
        </div>
      </div>


      <button>
        <div class="bottomuser" >
          <div class="index-bottom" @click.stop="showPopup = true">
            <div class="module_tip">
            <span class="persion-avatar">
              <div class="headeruser">
                <img class="img" src="../assets/images/头像.png" style="width: 24px; min-width: 24px;height: 24px;border-radius: 12px;}">
              </div>
              <div class="flex-1 break-all ws-nowrap ml-8px" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;">
                yy
              </div>
            </span>
            </div>
          </div>
          <button class="shrink"
                  @mouseover="showHover = true"
                  @mouseout="showHover = false"
                  @click="toggleSidebarWidth">
            <img src="../assets/images/收缩.png" style="width:1em; height:1em">
            <div class="hover-tip" v-if="showHover" @click.stop>
              {{ isSidebarCollapsed ? '展开' : '收起' }}
            </div>
          </button>
        </div>
      </button>
      <Popup v-model:visible="showPopup"/>
    </template>


    <template v-slot:main>
      <div class="ant-col Dashboard superSidebarInvisible">
        <div class="Books-container" >
          <div class="Books-header">
            <div class="Books-bookTitle DashboardTitle-title">知识库</div>
          </div>
          <div class="Books-module_commonList">
            <div class="CommonUsedList-module">
              <div class="CommonUsedList-listWrapper">
                <div class="CommonUsedList-listHeadWrapper" >
                  <h6 class="CommonUsedList-listHead">常用</h6>
                  <div class="CommonUsedList-module_listHead CommonUsedList-listHeadArrow" @click="toggleList">
                    <span>{{ isListOpen ? '收起' : '展开' }}</span>
                    <img class="arrowup" :class="{ 'flipped': !isListOpen }" src="../assets/images/上箭头.png" alt="收起/展开" />
                  </div>
                </div>
                <div class="brain-sortable CommonUsedList-list" ref="list" v-show="isListOpen">
                  <div class="CommonUsedList-listItem"
                       v-for="(item, index) in sortedItems"
                       :key="item.id"
                       @mousedown.prevent="startDragDiv" @mousemove="dragDiv" @mouseup="endDragDiv"
                       >
                    <div class="CommonUsedList-module_listItem CommonUsedList-hasDesc" draggable="true">
                        <div class="CommonUsedList-btnDrag brain-tooltip">
                          <img class="brain-drag CommonUsedList-icon" src="../assets/images/拖动.png"
                          style="width: 16px;min-width: 16px;height: 16px">
                          <div class="tooltip-text">拖动调整位置</div>
                        </div>
                      <nuxt-link :to="item.link" class="CommonUsedList-title">
                        <span class="CommonUsedList-module_icon">
                          <img class="brain-icon" src="../assets/images/知识库.png"
                          style="width: 24px;height: 24px;min-width: 24px" title="d">
                          <span class="image-tooltip">文档</span>
                        </span>
                        <div class="CommonUsedList-content">
                          <div class="CommonUsedList-text">
                            <span class="CommonUsedList-module_text" title="d">{{item.name}}</span>
                          </div>
                          <span class="CommonUsedList-description" title="d">{{item.content}}</span>
                        </div>
                      </nuxt-link>
                      <div class="CommonUsedList-actionsIcon CommonUsedList brain-popover-trigger">
                        <img class="brain-icon brain-icon-new-ellipsis" src="../assets/images/省略号.png">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Books-layout">
            <div class="Books-segmented">
              <div class="rc-segmented segmented brain-segmented">
                <div class="segmented-group">
                  <label class="segmented-item segmented-item-selected">
                    <input class="segmented-item-input" type="radio" checked="">
                    <div class="segmented-item-label" title="我个人的">
                      我个人的
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <div class="index-header">
                  <div class="index-headerLeft"></div>
                  <div class="index-headerRight">
                    <button class="ant-btn ant-dropdown-trigger index-create dropdown-trigger">
                       <img class="brain-icon brain-icon-add icon-img index-createIcon index-size"
                       src="../assets/images/加号.png" width="1em" height="1em">
                       <img class="brain-icon brain-icon-arrow-down icon-img index-createIcon index-size"
                       src="../assets/images/下、箭头下.png" width="1em" height="1em">
                    </button>
                    <div class="index-headerSwitch">
                      <div class="index-switchBtn index-switchBtnSelected brain-tooltip">
                        <img class="brain-icon  brain-icon-card-style icon-img index-size" src="../assets/images/分类.png"
                        style="height: 24px;width: 24px">
                      </div>
                      <span class="index-switchLine"></span>
                      <div class="index-switchBtn brain-tooltip">
                        <img class="brain-icon brain-icon-nav-open icon-img index-size"
                        src="../assets/images/列表.png">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="book_stack" class="BookStack-stack BookStack-editable">
              <div class="BookStack-header">
                <div class="BlockName-name">
                    <span class="BlockName-title BlockName-editableSpan">我的知识库</span>
                </div>
                <div id="book_actions" class="BookStack-actions">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import NuxtLayout from '../layouts/default.vue';
import Popup from '../components/Popup.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const showPopup = ref(false);
const showHover = ref(false);
const isSidebarCollapsed = ref(false);

// 假设这是从父组件传递来的方法，用于改变侧边栏宽度
const toggleSidebarWidth = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  emit('toggleSidebar', isSidebarCollapsed.value);
};

const isSubMenuOpen = ref(true); // 初始状态，子菜单是展开的

// 切换子菜单的显示状态
const toggleSubMenu = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value;
};

const isListOpen = ref(true); // 控制列表显示和隐藏的状态
const toggleList = () => {
  isListOpen.value = !isListOpen.value;
};

const items = ref([
  // 假设的菜单项数据，每个对象有一个唯一的 id 和其他属性
  { id: 1, name: 'Item 1' ,link:'hh',content:'dd'},
  { id: 2, name: 'Item 2', },
  { id: 3, name: 'Item 3',},
  { id: 4, name: 'Item 4',},
  // ...
]);

const sortedItems = ref([...items.value]); // 用于渲染的排序后的项
const draggingItem = ref(null);
const dragStartIndex = ref(null);
const dragOffset = ref({ x: 0, y: 0 }); // 拖拽时的偏移量
const isDragging = ref(false);

// 初始化排序后的项
onMounted(() => {
  sortedItems.value = [...items.value];
});

// 清理拖拽相关事件监听
onUnmounted(() => {
  document.removeEventListener('mousemove', dragDiv);
  document.removeEventListener('mouseup', endDragDiv);
});

const startDrag = (event) => {
  const li = event.target.closest('li');
  if (li) {
    draggingItem.value = li;
    dragStartIndex.value = Array.from(li.parentNode.children).indexOf(li);
    isDragging.value = true;
    dragOffset.value = {
      x: event.clientX - li.offsetLeft,
      y: event.clientY - li.offsetRotate,
    };
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
  }
};

const drag = (event) => {
  if (!isDragging.value) return;
  const li = draggingItem.value;
  const rect = li.getBoundingClientRect();
  const dx = event.clientX - rect.left;
  const dy = event.clientY - rect.top;
  const newX = dx - dragOffset.value.x;
  const newY = dy - dragOffset.value.y;

  // 应用拖拽偏移量到元素上
  Object.assign(li.style, {
    transform: `translate3d(${newX}px, ${newY}px, 0)`,
    transition: 'none'
  });
};

const endDrag = (event) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);

  const li = draggingItem.value;
  const ul = li.parentNode;
  const children = Array.from(ul.children);
  const dragIndex = dragStartIndex.value;
  let targetIndex = dragIndex;

  // 找到鼠标释放时目标项的索引
  for (let i = 0; i < children.length; i++) {
    const childRect = children[i].getBoundingClientRect();
    if (event.clientY < childRect.bottom) {
      targetIndex = i;
      break;
    }
  }

  // 如果目标索引和起始索引不同，则交换位置
  if (targetIndex !== dragIndex) {
    const draggedItem = children[dragIndex];
    const targetItem = children[targetIndex];

    // 使用DOM操作交换位置
    ul.insertBefore(draggedItem, targetItem);

    // 更新排序后的项数组
    const newItems = [...items.value];
    const [removedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    items.value = newItems;
    sortedItems.value = [...newItems]; // 更新渲染数组
  }

  // 重置拖拽元素的样式
  Object.assign(li.style, {
    transform: '',
    transition: ''
  });

  dragOffset.value = { x: 0, y: 0 }; // 重置偏移量
  draggingItem.value = null; // 重置拖拽项
  dragStartIndex.value = null; // 重置起始索引
};


const startDragDiv = (event) => {
  const div = event.target.closest('.CommonUsedList-listItem');
  if (div) {
    draggingItem.value = div;
    dragStartIndex.value = Array.from(div.parentNode.children).indexOf(div);
    isDragging.value = true;
    dragOffset.value = {
      x: event.clientX - div.offsetLeft,
      y: event.clientY - div.offsetRotate,
    };
    document.addEventListener('mousemove', dragDiv);
    document.addEventListener('mouseup', endDragDiv);
  }
};

const dragDiv = (event) => {
  if (!isDragging.value) return;
  const div = draggingItem.value;
  const rect = div.getBoundingClientRect();
  const dx = event.clientX - rect.left;
  const dy = event.clientY - rect.top;
  const newX = dx - dragOffset.value.x;
  const newY = dy - dragOffset.value.y;

  // 应用拖拽偏移量到元素上
  Object.assign(div.style, {
    position: 'absolute',
    left: `${newX}px`,
    top: `${newY}px`,
  });
};

const endDragDiv = (event) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.removeEventListener('mousemove', dragDiv);
  document.removeEventListener('mouseup', endDragDiv);

  const div = draggingItem.value;
  const ul = div.parentNode;
  const children = Array.from(ul.children);
  const dragIndex = dragStartIndex.value;
  let targetIndex = dragIndex;

  // 找到鼠标释放时目标项的索引
  for (let i = 0; i < children.length; i++) {
    if (event.clientY < children[i].getBoundingClientRect().bottom) {
      targetIndex = i;
      break;
    }
  }

  // 如果目标索引和起始索引不同，则交换位置
  if (targetIndex !== dragIndex) {
    const draggedItem = children[dragIndex];
    const targetItem = children[targetIndex];

    // 使用DOM操作交换位置
    ul.insertBefore(draggedItem, targetItem);

    // 更新排序后的项数组
    const newItems = [...sortedItems.value];
    const [removedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    sortedItems.value = newItems;
  }

  // 重置拖拽元素的样式
  Object.assign(div.style, {
    position: '',
    left: '',
    top: '',
  });

  dragOffset.value = { x: 0, y: 0 };
  draggingItem.value = null;
  dragStartIndex.value = null;
};


// 新增菜单项的方法
const addItem = (newItem) => {
  const newItemWithId = { ...newItem, id: items.value.length + 1 };
  items.value.push(newItemWithId);
  sortedItems.value.push(newItemWithId);
};

// 删除菜单项的方法
const removeItem = (index) => {
  items.value.splice(index, 1);
  sortedItems.value.splice(index, 1);
};




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
.dashboard-sidebar-scrollbar{
  flex: 1 1 auto;
  scrobar-color: #e7e9e8;
  scrollbar-width: thin;
}
.sidebarmenu,.knowledgemenu{
  border: 0;
  padding: 0 10px;
  width: 91% !important;
  background-color:#fafafa ;
}
.sidebarmenu .knowledgemenu ,.menu{transition: none;}
.sidebarmenu .knowledgemenu ,.menu{
  border: none;
  width: 100%;
  background-color: #fafafa;
}
.menu{box-shadow:none;}
.resourcemenu{margin-top: 14px;padding-left:0;list-style-type: none}
.ant-menu-submenu{
  padding-bottom: .02px;
  transition: border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);
}
.sidebarmenu .knowledgemenu .ant-menu-submenu > .menu-submenu-title{
  background-color: #eff0f0;
  border-radius: 6px;
}
.knowledgemenu .ant-menu-submenu > .menu-submenu-title{
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 85%;
  margin: 4px 0;
}
.sidebarmenu .knowledgemenu .menu-submenu-title{transition: none}
.ant-menu-submenu .menu .menu-submenu-title{display: flex;align-items: center}
.menu{
  font-variant: tabular-nums;
  font-feature-settings: "tnum","tnum";
  color: #262626;
  font-size: 14px;
  text-align: left;
  list-style: none;
}
.resourcemenu .menu-submenu-title{padding-right: 4px;padding-left: 4px !important;}
.ant-menu-submenu .menu-submenu-title{
  padding: 0 16px;
  text-overflow: ellipsis;
}
.menu-submenu-title{
  position: relative;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
}
.sidebarmenu .knowledgemenu .switch-arrow-wrap{transition: none}
.ant-menu-submenu .menu .menu-submenu-title > *{flex: none}
.menu-submenu-title .switch-arrow-wrap{
  min-width: 14px;
  font-size: 14px;
}
.resourcemenu .switch-arrow-wrap img{margin: 0;}
.arrow-icon{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 1;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.switch-arrow-wrap {
  background-color: transparent;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin-top: 3px;
  color: #8a8f8d;
}
.arrow-icon {
  opacity: 0.5;
  transition: opacity 0.3s ease;
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 1;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.switch-arrow-wrap:hover {
  background-color: #c4c4c4;
}
.switch-arrow-wrap:hover .arrow-icon {
  opacity: 1;
}
.menu-title-content{margin-left: 6px}
.menu .menu-submenu-title > .menu-title-content{
  flex: auto;
  min-width: 0;
  text-overflow: ellipsis;
}
.sidebarmenu .knowledgemenu .sidebarmenu{transition: none;}
.resourcemenu .menu-submenu-title > .title-content{margin-left: 6px;}
.menu-submenu-title .switch-arrow-wrap{opacity: 1;}
.resourcemenu .menutitle{display: flex;align-items: center}
.resourcemenu .menutitle .span{flex: 1 1 auto;color: #262626}
.resourcemenu .menutitle img{color: #8a8f8d;margin-right: 6px}
.arrowright-icon{
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.rotated {
  transform: rotate(-90deg)  translateX(-2.5px);
  transition: background .3s cubic-bezier(.645,.045,.355,1),transform .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1),color .3s cubic-bezier(.645,.045,.355,1);
}
.sidebarmenu .knowledgemenu  {background: transparent}
.ant-menu-inline{background: transparent} .ant-menu-sub{background: transparent}
.sidebarmenu .knowledgemenu .ant-menu-sub{transition: none}
.ant-menu-sub.ant-menu-inline {
  border: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}
.ant-menu-submenu .ant-menu-sub{cursor: auto}
.ant-menu ul{margin: 0;list-style: none;}
.ant-menu-inline{width: 100%}
.sidebarmenu .knowledgemenu {transition: none}.ant-menu-item{transition: none}
.sidebarmenu .knowledgemenu .ant-menu-item{
  line-height: 32px;
  height: 32px;
  border-radius: 6px;
  width: 100%;
  margin: 4px 0;
}
.ant-menu-inline.ant-menu .ant-menu-item{display: flex;align-items: center;}
.resourcemenu .menuItem{justify-content: flex-start;position: relative;padding-right: 4px}
.ant-menu-inline .ant-menu-item{
  padding: 0 16px;
  text-overflow: ellipsis;
}
.ant-menu-item{white-space: nowrap;}
.resourcemenu .menuItem .itemAction{
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: #8a8f8d;
  position: relative;
  width: 20px;
  height: 24px;
  border-radius: 6px;
  visibility: hidden;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 16px;
}
.resourcemenu .menuItem:hover .itemAction{visibility: visible;}
.resourcemenu .menuItem .itemAction:hover{background: #d8dad9;color: #262626}
.brain-icon-drag{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.resourcemenu .menuItem .itemwrapper{
  flex: 1 1 auto !important;
  overflow: hidden;
}
.bookItem{
  display: flex;
  width: 100%;
  overflow: hidden;
}
.bookItem .link{
  width: 100%;
  display: flex;
  align-items: center;
}
.ant-menu-item a{color: #262626;cursor: move;}
.bookItem .iconwrapper{
  width: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.book-icon{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.bookItem .link .index-module_name{
  display: inline-block;
  margin-left: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #585a5a;
}
.resourcemenu .menuItem .badgewrapper{
  position: absolute;
  right: 13px;
  top: -2px;
  z-index: 3;
}
.resourcemenu .menuItem:hover .itemAction{visibility: visible}
.resourcemenu .menuItem:hover .itemAction:hover{background: #d8dad9;color: #262626}
.resourcemenu .menuItem .itemAction{
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: #8a8f8d;
  position: relative;
  width: 20px;
  height: 24px;
  border-radius: 6px;
  visibility: hidden;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 16px;
}
.icon-new-ellipsis{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.sidebarmenu .menuwrapper .brain-icon{margin-right: 10px}
.brain-icon{
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;width: 16px;height: 16px;
}
button{
  overflow: visible;
  box-sizing: border-box;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  background: transparent;
  border: none;
  outline: none;
}
.bottomuser{
  flex: 0 0 auto;
  padding: 0 11px;
  margin-top: 12px;
  cursor: pointer;
}
.index-bottom:hover{background-color: #e4e6e7}
.index-bottom{
  background-color: #fff;
  border: 1px solid #e7e9e8;
  height: 100%;
  width: 100%;
  max-width: 250px;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
}
.module_tip{
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
.persion-avatar{
  display: flex;
  border-radius: 6px;
  padding: 2px 6px;
  cursor: pointer;
  max-width: 178px;
  align-items: center;
  height: 32px;
  line-height: 25px;
}
.headeruser{
  display: flex;
  align-items: center;
}
.img{border-style: none;}
.break-all {word-break: break-all;}
.ws-nowrap {white-space: nowrap;}
.flex-1 {flex: 1;}
.ml-8px {margin-left: 10px;}
.shrink{
  color: #1f2329;
  font-size: 16px;
  background-color: transparent;
  border-radius: 4px;
  border-width: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  width: 44px;
  height: 32px;
  margin-top: 9px;
}
.shrink:hover{background-color: #e4e6e7}
.hover-tip {
  width: auto; /* 与.shrink宽度相同 */
  height: auto; /* 与.shrink高度相同 */
  background-color: #000; /* 设置您想要的颜色 */
  color: #fff;
  border-radius: 4px; /* 圆角与.shrink相同 */
  display: flex; /* 确保与.shrink并排显示 */
  vertical-align: top; /* 如果需要，确保垂直对齐 */
  margin-left: 120px; /* 根据需要调整间距 */
  justify-content: center;
  padding: 1px 4px;
  align-items: center;
  position: absolute;
  margin-top: 4px;
  font-size: 12px;
  border-width: 0;
}
.Dashboard{
  padding: 0;
  flex: auto;
  min-width: 0;
}
.ant-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
.Books-container{
  position: relative;
  max-width: 1664px;
  padding: 26px 36px;
}
.Books-header{
  display: flex;
  justify-content: space-between;
}
.Books-container .Books-bookTitle{margin-bottom: 2px;}
.DashboardTitle-title{
  font-weight: 500;
  font-size: 18px;
  color: #262626;
}
.Books-module_commonList{
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 12px;
}
.CommonUsedList-listWrapper{
  background-color: #fafafa;
  border-radius: 8px;
  padding: 16px 16px 6px 16px;
  height: auto;
}
.CommonUsedList-listHeadWrapper{
  display: flex;
  justify-content: space-between;
  color: #8a8f8d;
}
.CommonUsedList-module .CommonUsedList-listHead{
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #585a5a;
}
h6{margin-top: 0;}
.CommonUsedList-module .CommonUsedList-module_listHead{
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #585a5a;
}
.CommonUsedList-listHeadArrow img.flipped {
  transform: rotate(180deg);
}
.CommonUsedList-listHeadArrow{
  cursor: pointer;
  border-radius: 6px;
  padding: 0 7px;
}
.CommonUsedList-listHeadArrow img{
  position: relative;
  top: 2px;
  left: 2px;
}
.CommonUsedList-listHeadArrow button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
}
.arrowup{
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  width: 16px;
  height: 16px;
  text-rendering: optimizeLegibility;
}
.CommonUsedList-list{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -4px;
  margin-right: -4px;
}
.brain-sortable [draggable="true"] {
  cursor: grab;
}
.CommonUsedList-listItem{
  width: 32%;
  padding: 0 4px;
  margin-bottom: 16px;
}
.CommonUsedList-module_listItem.CommonUsedList-hasDesc{padding: 10px 28px 6px 20px;}

.brain-drag:hover{background-color: #e7e9e8}
.CommonUsedList-module_listItem{
  min-height: 64px;
  position: relative;
  background: #fff;
  border: 1px solid #f4f5f5;
  border-radius: 6px;
  transition: background .3s ease 0s;
}
.CommonUsedList-module_listItem:hover .CommonUsedList-btnDrag{visibility: visible;}
.CommonUsedList-module_listItem:hover{cursor: grab}
.CommonUsedList-module_listItem .CommonUsedList-btnDrag{
  visibility: hidden;
  position: absolute;
  top: 40%;
  left: 2px;
  margin-top: -10px;
  color: #8a8f8d;
  width: 18px;
  height: 20px;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.CommonUsedList-module_listItem .CommonUsedList-btnDrag img{
  font-size: 16px;
  position: relative;
  left: 4px;
}
.CommonUsedList-module_listItem .CommonUsedList-icon{
  margin-right: 8px;
  display: flex;
  align-items: center;
  color: #585a5a;
}
.brain-drag{
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
}
.brain-tooltip {
  position: relative; /* 设置相对定位 */
  display: inline-block; /* 设置为行内块级元素 */
}
.brain-tooltip .tooltip-text {
  display: none; /* 默认不显示提示文本 */
  position: absolute; /* 绝对定位 */
  left: 0; /* 根据需要调整位置 */
  bottom: 100%; /* 显示在图标下方 */
  padding: 5px 10px; /* 文本周围的填充 */
  margin-bottom: 10px; /* 与图标底部的距离 */
  background-color: rgba(0, 0, 0, 0.75); /* 背景颜色 */
  color: #fff; /* 文本颜色 */
  border-radius: 4px; /* 圆角 */
  white-space: nowrap; /* 防止文本换行 */
  font-size: 12px; /* 文本大小 */
  z-index: 1; /* 确保 Tooltip 在上层 */
}
.brain-tooltip:hover .tooltip-text {
  display: block; /* 悬停时显示提示文本 */
}
.CommonUsedList-module_listItem .CommonUsedList-title{
  display: flex;
  align-items: center;
  color: #585a5a;
}
.CommonUsedList-module_listItem .CommonUsedList-module_icon{
  margin-right: 8px;
  display: flex;
  align-items: center;
  color: #585a5a;
}
/* 定义悬停时的提示样式 */
.image-tooltip {
  display: none; /* 默认不显示 */
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75); /* 背景颜色 */
  color: #fff; /* 文本颜色 */
  padding: 5px 10px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  font-size: 12px; /* 字体大小 */
  white-space: nowrap; /* 防止文本换行 */
  pointer-events: none; /* 防止遮挡鼠标事件 */
  z-index: 100; /* 确保提示在上层 */
  /* 根据需要调整位置 */
  bottom: 90%; /* 显示在图标下方 */
  left: 10%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  width: max-content; /* 宽度适应内容 */
}

/* 悬停时显示提示信息 */
.CommonUsedList-module_icon:hover .image-tooltip {
  display: block; /* 显示提示信息 */
}
.CommonUsedList-content{width: 100%}
.CommonUsedList-module_listItem.CommonUsedList-hasDesc .CommonUsedList-text{height: 20px}
.CommonUsedList-text{display: flex;}
.CommonUsedList-text{
  max-width: calc(100% - 50px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.CommonUsedList-module_listItem .CommonUsedList-module_text{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 24px;
  font-weight: 500;
  font-size: 14px;
  color: #262626;
}
.CommonUsedList-module_listItem:hover .CommonUsedList {
  visibility: visible;
}
.CommonUsedList-actionsIcon:hover{background-color: #e7e9e8;}
.CommonUsedList-description{
  max-width: calc(100% - 50px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  font-size: 12px;
  color: #8a8f8d;
  line-height: 20px;
  display: inline-block;
}
.CommonUsedList-module_listItem .CommonUsedList{
  visibility: hidden;
  position: absolute;
  top: 26px;
  right: 16px;
  margin-top: -8px;
  color: #585a5a;
}
.CommonUsedList-actionsIcon{
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 6px;
  font-size: 16px;
  padding: 0 6px;
  cursor: pointer;
  margin-left: 10px;
}
.brain-icon-new-ellipsis{
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
.Books-container .Books-layout{margin-top: 20px}
.Books-segmented{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.segmented{border-radius: 8px;overflow: hidden;}
.rc-segmented{display: inline-block;padding: 2px;background-color: rgba(0,0,0,.04);}
.segmented-group{
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  border-radius: 2px;
}
.segmented .segmented-item-selected{
  color: #003d23;
  font-weight: 500;
  box-shadow: 0 1px 2px -2px rgba(0,0,0,.08),0 2px 6px 0 rgba(0,0,0,.04),0 4px 8px 1px rgba(0,0,0,.02);
}
.segmented .segmented-item{
  border-radius: 6px;
  line-height: 1;
  display: flex;
  align-items: center;
}
.Books-segmented .segmented-item{padding-left: 16px;padding-right: 16px}
.segmented-item-selected{background-color: #fff}
.segmented-item{
  position: relative;
  min-height: 28px;
  padding: 4px 10px;
  text-align: center;
  cursor: pointer;
}
a,label{touch-action: manipulation}
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
.segmented-item-input{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
input{
  overflow: visible;
  margin: 0;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.segmented .segmented-item-label{
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.segmented-item-label{z-index: 2;line-height: 24px}
.segmented .segmented-item-label::after{
  font-weight: 500;
  content: attr(title);
  height: 0;
  visibility: hidden;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}
.index-header{
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.index-headerLeft{display: flex;}
.index-headerRight{display: flex;}
.index-headerRight .ant-btn{margin-left: 12px !important;}
.index-headerRight .index-create{
  height: 32px;
  width: 64px;
  border-radius: 6px;
  display: flex;
  padding: 0 12px;
  justify-content: space-between;
  line-height: 32px;
}
button,html[type="button"]{-webkit-appearance: button;}
.dropdown-trigger{cursor: pointer}
.ant-btn{
  color: #003d23;
  background: #fff;
  border-color: #e7e9e8;
  box-shadow: none;
  text-shadow: none;
  font-weight: 500;
  outline: 0;
  position: relative;
  white-space: nowrap;
  text-align: center;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  user-select: none;
  touch-action: manipulation;
  font-size: 14px;
}
button{
  text-transform: none;
  overflow: visible;
  margin: 0;
  font-family: inherit;
}
.index-headerRight .index-createIcon{
  width: 16px;
  height: 16px;
  margin-top: 7px;
}
.ant-btn > .brain-icon{display: inline-block}
.index-header .index-headerSwitch{
  display: flex;
  margin-left: 12px;
  margin-top: 3px;
}
.index-header .index-headerSwitch .index-switchBtnSelected{
  color: #262626;
  background-color: #eff0f0
}
.index-header .index-headerSwitch .index-switchBtn{
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 6px;
}
.index-header .index-headerSwitch .index-switchBtn img{
  position: relative;
  top: 3px;
  left: 5px;
}
.index-size{width: 24px;height: 24px}
.index-header .index-switchLine{
  border-right: 1px solid #e7e9e8;
  height: 16px;
  position: relative;
  top: 6px;
  margin: 0 5px;
}
.index-header .index-headerSwitch .index-switchBtn{
  color: #8a8f8d;
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 6px;
}
.BookStack-stack{position: relative;margin-bottom: 4px;}
.BookStack-header{
  display: flex;
  align-items: center;
  height: 40px;
  position: relative;
  margin-bottom: 8px;
  padding-top: 8px;
}
.BlockName-name{
  font-weight: 500;
  font-size: 14px;
  min-width: 10px;
  color: #262626;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.BlockName-name span{border-bottom: 1px solid transparent;}
.BlockName-title{
  max-width: 600px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.BookStack-actions{display: none}
</style>