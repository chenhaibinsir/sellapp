<template>
  <div class="goods" v-if="goodsdata">
    <!-- 左边 -->
    <div class="goods-left">
      <ul class="content">
        <div
          @click="clickLeft(obj)"
          :class="{content_list:true,active:obj==def}"
          v-for="(item,obj) in goodsdata"
          :key="obj"
        >
          <div>
            <span>
              <img v-show="item.type==1" src="../imgs/discount_1@2x.png" alt />
              <img v-show="item.type==2" src="../imgs/decrease_1@2x.png" alt />
              <img v-show="item.type==3" src="../imgs/invoice_1@2x.png" alt />
              <img v-show="item.type==4" src="../imgs/guarantee_1@2x.png" alt />
              {{ item.name }}
            </span>
          </div>
        </div>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="goods-rigth">
      <ul class="content">
        <div :id="index" v-for="(item,index) in goodsdata" :key="index">
          <!-- 标题 -->
          <p class="title">{{item.name}}</p>

          <div class="goods_content" v-for="(child,i) in item.foods" :key="i">
            <div class="bor_bom">
              <div class="icon">
                <img :src="child.icon" alt />
              </div>
              <div class="bor_content">
                <h3>{{child.name}}</h3>
                <p>{{child.description}}</p>
                <p>月售{{child.sellCount}}份 好评率{{child.rating}}%</p>
                <div class="subtract">
                  <h4>
                    <span style="color:#F9171E; font-size:16px">￥{{child.price}}</span>
                    <span
                      style="text-decoration :line-through " v-show="child.oldPrice">￥{{child.oldPrice}}</span>
                  </h4>
                  <div>
                    <button class="button" v-show="child.num=0" @click="subtract()">－</button>
                    <span v-show="child.num=0">{{1}}</span>
                    
                   <button class="button" @click="subtract()">＋</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { geGoods } from "../api/api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件
export default {
  data() {
    return {
      def: 0 //默认显示第一个
    };
  },
  created() {
    geGoods().then(res => {
      this.$store.commit('initgoodsdata',res.data.data)
    });
  },
  mounted() {
    //左侧滚动版
    new BScroll(document.querySelector(".goods-left"), {
      click: true
    });
    //右侧滚动板
    this.goodsRigth = new BScroll(document.querySelector(".goods-rigth"), {
      probeType: 3 //监听滚动事件
    });

    // 滚动距离
    this.goodsRigth.on("scroll", obj => {
      let _y = Math.abs(obj.y); //取正数
     
      // 遍历取得的值
      for (let objDiv of this.getHeight) {
        if (_y >= objDiv.min && _y <= objDiv.max) {
          this.def = objDiv.index;
          return;
        }
      }
    });
  },
  methods: {
    clickLeft(index) {
      this.def = index;
      // 左侧索引index，对应右侧DIV id
      this.goodsRigth.scrollToElement(document.getElementById(index), 600);
    },
    // 加减
    subtract(){
      console.log(111);
      
    }
  },
  // 计算属性
  computed: {
    getHeight() {
      let arr = []; //定义一个空数组用于储存
      let total = 0; //定义一个变量用于保存最大值或最小值
      for (let i = 0; i < this.goodsdata.length; i++) {
        let count = document.getElementById(i).offsetHeight; //保存高度
        arr.push({ min: total, max: total + count, index: i });
        total += count; //获取每次的高度
      }

      return arr;
    },
    goodsdata(){
      return  this.$store.state.goodsdata
    }
  }
};
</script>

<style lang="less" >
.active {
  background: #fff;
  color: #000;
  
}
.goods {
  border-top: 1px solid #dbdce0;
  display: flex;
  flex: 1;

  .goods-left {
    width: 110px;
    height: 500px;
    background: #f4f5f7;
    overflow: scroll;
    .content_list {
      padding: 0 10px;
      div {
        height: 60px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dedfe1;
        img {
          display: inline-block;
          width: 18px;
          height: 18px;
          vertical-align: middle;
        }
      }
    }
  }
  .goods-rigth {
    flex: 1;
    background: #f4f5f7;
    overflow: scroll;
    height: 500px;
    .title {
      font-size: 16px;
      color: #989ba0;
      border-left: 2px solid #d9dce1;
      padding: 4px 10px;
    }
    .goods_content {
      padding: 0 20px;

      background: #fff;
      .bor_bom {
        padding: 10px 0;
        display: flex;
        border-bottom: 1px solid #dedfe1;
        .icon {
          img {
            width: 80px;
            height: 80px;
            margin-right: 10px;
          }
        }
        .bor_content {
          width: 100%;
          line-height: 22px;
          p {
            font-size: 12px;
          }
          .subtract{
            display: flex;
            justify-content: space-between;
            align-items: center;
           div{
             display: flex;
             align-items: center;
              .button{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 0;
                outline: none;
                background: #00A0DC;
                color: #fff;
                font-size: 22px;
                text-align: center;
                line-height: 24px;
              }
              span{
                padding: 0 10px;
              }
           }
          }
        }
      }
    }
  }
}
</style>