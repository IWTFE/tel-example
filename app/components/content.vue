<template lang="html">
    <el-col :span="16">
      <el-tabs ref="delPane" :activeName="aname" type="card" closable>
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
      tabIndex: 1,
      aname: ""
    }
  },
  computed: {},
  mounted () {
    var tabs = this.tabs;
    var that = this;
    //添加新tab
    this.$root.$on('addTab', function (obj) {
      var r = tabs.some(hasAddTab)
      function hasAddTab(element, index, array){
        return element.title == obj.title;
      }
      if(!r){
         tabs.push(obj);
      }
      that.aname = obj.name;
    })

    //删除tab
    this.$refs.delPane.$on('tab-remove',function(pane){
      tabs.splice(pane.index, 1);
    })
  },
  methods: {},
  components: {}
}

</script>

<style lang="css">
</style>
