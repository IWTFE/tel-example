<template lang="html">
  <input type="button" @click="test()" name="name" value="发请求">
</template>

<script>
import { rest } from '../scripts/security/rest_model.js'

export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
    test:function(){
      var userName = "zwj3333";
      var password = "33232323";
      var shortSinglePhone = "133345455555";
      rest.post("http://localhost:9000/test", {"body":{"userName": userName, "password":password,"shortSinglePhone":shortSinglePhone},"businessId": "CC_CRM_LOGIN"}).then(function(res){
        console.log(res);
      });
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
