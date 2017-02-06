<template lang="html">
    <el-col :span="8">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
        <template v-for="item in menu">
          <template v-if="item.children && item.children.length > 0">
            <gro :id="item.nodeId" :nodeName="item.nodeName" :menuGroup="item.children"></gro>
          </template>
          <template v-else>
            <its :item="item"></its>
          </template>
        </template>
      </el-menu>
    </el-col>
</template>

<script>
import group from './parts/group.vue'
import items from './parts/items.vue'

export default {
   data () {
     return {
       menu: [
         {nodeId: "1", nodeName: "菜单一",
          children: [
            {nodeId: "2", nodeName: "菜单一下菜单一"},
            {nodeId: "3", nodeName: "菜单一下菜单二",
              children: [
                {nodeId: "4", nodeName: "菜单一下菜单二下菜单一"}
              ]
            }
          ]
        },
        {nodeId: "5", nodeName: "菜单二"},
        {nodeId: "6", nodeName: "菜单三"}
       ]
     }
   },
   methods: {
     handleOpen(key, keyPath) {
     },
     handleClose(key, keyPath) {
     }
   },
   components: {
     'gro': group,
     'its': items
   }
 }
</script>
<style lang="css">
</style>
