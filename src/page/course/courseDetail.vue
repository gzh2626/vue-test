<template>
    <div>
        
    <router-link to="/home/course"><i class="el-icon-arrow-left"></i>课程</router-link>
    <div class="detail-concent">
        <p><span>ID:</span><span>{{detail.id}}</span></p>
        <p><span>视频名称:</span><span>{{detail.courseName}}</span></p>
        <p><span>观看人数:</span><span>{{detail.watchNums}}</span></p>
        <p><span>状态:</span><span>{{detail.status==0?'上架':'下架'}}</span></p>
        <p><span>描述:</span><span>{{detail.courseDesc}}</span></p>
        <p><span>创建时间:</span><span>{{detail.created}}</span></p>
        <p><span>更新时间:</span><span>{{detail.updated}}</span></p>
        <div v-html="detail.courseDetail"></div>
        <div style="margin-top:40px;">
            <img :src="detail.showImg" alt="展示图片" style="max-height:400px;">
        </div>
        <video :src="detail.courseVideo" controls="controls" height='400px'>
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
      api.get(config.baseUrl + "/sm/course/findOne/" + id).then(res => {
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

