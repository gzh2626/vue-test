<template>
    <div>
        
    <router-link to="/home/video"><i class="el-icon-arrow-left"></i>宣传视频</router-link>
    <div class="detail-concent">
        <p><span>ID:</span><span>{{detail.id}}</span></p>
        <p><span>序号:</span><span>{{detail.sort}}</span></p>
        <p><span>视频名称:</span><span>{{detail.videoName}}</span></p>
        <p><span>状态:</span><span>{{detail.status==0?'上架':'下架'}}</span></p>
        <p><span>创建时间:</span><span>{{detail.created}}</span></p>
        <p><span>更新时间:</span><span>{{detail.updated}}</span></p>
        <div>
            <img :src="detail.videoImgUrl" alt="videoImgUrl" style="max-height:400px;">
        </div>
        <video :src="detail.videoUrl" controls="controls" height='400px'>
        </video>
    </div>
    </div>
</template>
<script>
import api from "@/api/api";
import config from "@/config/config.js";
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    this.getDatil();
  },
  methods: {
    getDatil() {
      let self = this;
      let id=this.$route.params.id;
      api.get(config.baseUrl + "/sm/adVideo/findOne/" + id).then(res => {
        if (res.data.status == 0) {
          self.detail = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

