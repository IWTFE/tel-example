<template lang="html">
  <el-submenu :index="id">
    <template slot="title">{{nodeName}}</template>
    <its v-for="item in menuGroup" :item="item"></its>
  </el-submenu>
</template>

<script>
import items from './items.vue'

export default {
  data () {
    return {}
  },
  props:[
    'menuGroup',
    'id',
    'nodeName'
  ],
  computed: {},
  mounted () {},
  methods: {},
  components: {
    'its': items
  }
}
</script>

<style lang="css">
</style>
