<template lang="html">
  <input type="button" @click="test()" name="name" value="发请求">
</template>

<script>
import axios from '../../node_modules/axios/dist/axios.js'
import { rest } from '../scripts/security/rest_model.js'

export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
    test:function(){
      // axios.get('http://localhost:9000/test', {
      //   params: {
      //     ID: 12345
      //   }
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (response) {
      //   console.log(response);
      // });
      console.log(rest.createAxios({a:1}));
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
