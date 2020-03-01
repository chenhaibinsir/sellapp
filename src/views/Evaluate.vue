<template>
  <div id="evaluate">
    <ul class="content">
      <div class="grade">
      <div class="evaLeft">
        <p>3.9</p>
        <p>综合评分</p>
        <p>高于周边商家69.2%</p>
      </div>
      <div class="evarigth">
        <p>
          服务态度
          <Rate allow-half :value.sync="valueHalf"></Rate>
          <span style="color:#FE9900;font-size:14px;">4.5</span>
        </p>
        <p>
          服务态度
          <Rate allow-half :value.sync="valueHalf"></Rate>
          <span style="color:#FE9900;font-size:14px">4.5</span>
        </p>
        <p>
          送达时间
          <span>44分钟</span>
        </p>
      </div>
    </div>
    <div class="null"></div>
    <!-- 评论 -->
    <div class="eva_comm">
      <div class="eva_btn">
        <Button>全部{{data.length}}</Button>
        <Button>满意{{satisfaction()}}</Button>
        <Button>不满意{{nosatisfaction()}}</Button>
      </div>
      <div class="content">
        <Icon type="md-checkmark-circle" />只看有内容的评论
      </div>
    </div>
    <!-- 用户评论 -->
    <div class="user_box" v-for="(v,i) in data" :key="i">
      <div class="user_eva">
        <div class="user_left">
          <img :src="v.avatar" alt />
        </div>
        <div class="user_rigth">
          <div class="user_name">
            <div>
              <p>{{v.username}}</p>
              <p>
                <Rate class="xinxin" allow-half :value.sync="v.score"></Rate>
                <span v-show="v.deliveryTime">{{v.deliveryTime}}分钟送达</span>
              </p>
            </div>
            <!-- 时间 -->
            <p>
              {{
              timechange(v.rateTime)}}
            </p>
          </div>
          <div>{{v.text}}</div>
          <div class="remark_bom">
            <Icon v-show="v.rateType==0" type="md-thumbs-up" />
            <Icon v-show="v.rateType==1" type="md-thumbs-down" />
            <span class="remark" v-for="(obj,i) in v.recommend" :key="i">{{obj}}</span>
          </div>
        </div>
      </div>
    </div>
    </ul>
  </div>
</template>

<script>
import { geRatings } from "../api/api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件
export default {
  data() {
    return {
      data: [],
      valueHalf: 4.5
    };
  },
  created() {
    geRatings().then(res => {
      this.data = res.data.data;
    });
  },
  mounted(){
  //评论滚动
      new BScroll(document.getElementById("evaluate"),{
          click: true
      });
  },
  methods: {
    timechange(value) {
      //13位时间戳转换为时间
      var date = new Date(value);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      const h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      const m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 满意
    satisfaction() {
      let num=0;
      this.data.map(v => {
        if (v.rateType == 0) {
        return  num++;
        }
      });
      return num
    },
    // 不满意
    nosatisfaction() {
      let num=0;
      this.data.map(v => {
        if (v.rateType == 1) {
        return  num++;
        }
      });
      return num
    }
  }
};
</script>

<style lang="less" scoped>
// 边框色
@E6E7E9: #e6e7e9;
#evaluate {
  height: 500px;
  overflow: scroll;
  
}
.grade {
  padding: 20px 0;
  display: flex;
  background: #fff;
  .evaLeft {
    background: #fff;
    width: 140px;
    text-align: center;
    border-right: 1px solid @E6E7E9;
    p:nth-child(1) {
      font-size: 24px;
      color: #ff9800;
    }
    p:nth-child(2) {
      color: #000;
    }
    p:nth-child(3) {
      color: #ccc;
      font-size: 12px;
    }
  }
  .evarigth {
    padding-left: 20px;
    line-height: 26px;
    flex: 1;
    color: #000;

    p:nth-child(3) {
      span {
        margin-left: 10px;
        color: rgb(150, 150, 150);
      }
    }
  }
}
.null {
  width: 100%;
  height: 20px;
  background: #f4f5f7;
  border-top: 1px solid @E6E7E9;
  border-bottom: 1px solid @E6E7E9;
}
.eva_comm {
  padding: 0 18px;
  border-bottom: 1px solid @E6E7E9;
  .eva_btn {
    padding: 20px 0;
    border-bottom: 1px solid @E6E7E9;
    .ivu-btn {
      border-radius: 0px;
      margin-right: 8px;
    }
    .ivu-btn:nth-child(1) {
      background: #00a0dc;
      color: #fff;
    }
    .ivu-btn:nth-child(2) {
      background: #ccecf7;
      color: #242424;
    }
    .ivu-btn:nth-child(3) {
      background: #eaebed;
      color: #242424;
    }
  }
  .content {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    color: #b7babf;
    i {
      font-size: 30px;
      vertical-align: middle;
    }
  }
}
// 用户评论
.user_box {
  padding: 0 18px;
}
.user_eva {
  border-bottom: 1px solid @E6E7E9;
  padding: 20px 0;
  display: flex;
  .user_left {
    margin-right: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .user_rigth {
    flex: 1;
    .user_name {
      display: flex;
      justify-content: space-between;
      .xinxin {
        font-size: 14px;
      }
    }
    .remark_bom {
      margin-top: 8px;
      .ivu-icon-md-thumbs-up {
        display: inline-block;
        font-size: 18px;
        color: #00a0dc;
        margin-top: -10px;
        position: relative;
        top: -5px;
      }
      .ivu-icon-md-thumbs-down {
        display: inline-block;
        font-size: 18px;
        color: #b7babf;
      }
      .remark {
        display: inline-block;
        width: 60px;
        height: 20px;
        border: 1px solid @E6E7E9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}
</style>