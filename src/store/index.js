import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//3.使用
//数据仓库用于存储数据
export default  new Vuex.Store({
    // 存放所有交互数据
    state: {
        goodsdata:[],  //所有的商品数组
    }, 
    // 改变-它是改变数据的唯一方式
    mutations: {
        //只有mutations里面的函数才能直接改变state
        initgoodsdata(state,nwe){
            state.goodsdata=nwe 
        }
        
    }
  })
  
  //mutations函数必须手动触发

 
  