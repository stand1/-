Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
    innerImage: {
      type:String,
      value: "/icons/home.png"
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {
      "name":"wenting",
      "gender":1
    },
    age:1
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){
      // console.log("someData");
      // console.log(this.someData)
      this.setData({
        age:2,
        someData:{
          name:"fengyu",
          gender:0
        },
        innerImage:"/icons/usercenter.png"
      })
      console.log(this.properties)
      console.log(this.properties.innerImage)
      console.log(this.properties.age)
    }
  }
})
