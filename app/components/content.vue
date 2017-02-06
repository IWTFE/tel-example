<template lang="html">
    <el-col :span="16">
      <el-tabs type="card" closable>
        <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.name">
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </el-col>
</template>

<script>
export default {
  data () {
    return {
      tabs:[],
      tabIndex: 1
    }
  },
  computed: {},
  mounted () {
    var tabs = this.tabs;
    this.$root.$on('addTab', function (obj) {
      var r = tabs.some(hasAddTab)
      function hasAddTab(element, index, array){
        return element.title == obj.title;
      }
      if(!r){
         tabs.push(obj);
      }
    })
  },
  methods: {},
  components: {}
}

</script>

<style lang="css">
</style>
