<template lang="html">
  <el-row>
    <left-nav></left-nav>
    <rightContent></rightContent>
  </el-row>
</template>

<script>
import left from './leftNav.vue'
import content from './content.vue'

export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {
    'leftNav': left,
    'rightContent': content
  }
}
</script>

<style lang="css">
</style>
