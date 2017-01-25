<template>
  <div class="">
    <div style="margin-bottom: 20px;">
      <el-button size="small" @click="handleClick">add tab</el-button>
    </div>
    <el-tabs type="card" closable>
      <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.name">
        <component v-bind:is="which_to_show" keep-alive></component>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>
<script>

  export default {
    data() {
      return {
        tabs:[],
        tabIndex: 0,
        which_to_show: ""
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  };
</script>
