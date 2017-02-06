<template lang="html">
  <div class="">
    <template v-if="item.children && item.children.length > 0">
      <gro :id="item.nodeId" :nodeName="item.nodeName" :menuGroup="item.children"></gro>
    </template>
    <template v-else>
      <el-menu-item :index="item.nodeId">{{item.nodeName}}</el-menu-item>
    </template>
  </div>
</template>

<script>
import group from './group.vue'

export default {
  data () {
    return {}
  },
  beforeCreate: function () {
    this.$options.components.gro = require('./group.vue')
  },
  props: [
    'item',
    'menuGroup'
  ],
  computed: {},
  mounted () {},
  methods: {},
  components: {
    'gro': group
  }
}
</script>

<style lang="css">
</style>
