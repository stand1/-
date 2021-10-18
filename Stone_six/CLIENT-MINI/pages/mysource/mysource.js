Page({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'page/weui/example/tabs/tabs'
    }
  },
  data: {
    rightItems: [{
        'id': 0,
        'carType': "全部车型"
      },
      {
        'id': 1,
        'carType': "2.0E精英版"
      },
      {
        'id': 2,
        'carType': "2.0E精英版"
      }
    ],
    navSrc: [{
      'id': 0,
      'name': '为客户照相',
      'detail': "3款车型",
      'rightItems': [{
          'id': 0,
          'carType': "全部车型"
        },
        {
          'id': 1,
          'carType': "2.0E精英版"
        },
        {
          'id': 2,
          'carType': "2.0E精英版"
        }
      ]
    }, {
      'id': 1,
      'name': '沟通能努力',
      'detail': "3款车型",
      'rightItems': [{
          'id': 3,
          'carType': "2.0E精英版"
        },
        {
          'id': 4,
          'carType': "2.0E精英版"
        },
        {
          'id': 5,
          'carType': "2.0E精英版"
        }
      ]
    }, {
      'id': 2,
      'name': '室内设计',
      'detail': "3款车型",
      'rightItems': [{
          'id': 6,
          'carType': "gjingying"
        },
        {
          'id': 7,
          'carType': "hjingying"
        },
        {
          'id': 8,
          'carType': "ijingying"
        }
      ]
    }, {
      'id': 3,
      'name': '利',
      'detail': "3款车型",
      'rightItems': [{
          'id': 9,
          'carType': "ajingying"
        },
        {
          'id': 10,
          'carType': "bjingying"
        },
        {
          'id': 11,
          'carType': "cjingying"
        }
      ]
    }, {
      'id': 4,
      'name': '碧园',
      'detail': "3款车型",
      'rightItems': [{
          'id': 12,
          'carType': "ajingying"
        },
        {
          'id': 13,
          'carType': "bjingying"
        },
        {
          'id': 14,
          'carType': "cjingying"
        }
      ]
    }, {
      'id': 5,
      'name': '白马公馆',
      'detail': "3款车型",
      'rightItems': [{
          'id': 15,
          'carType': "ajingying"
        },
        {
          'id': 16,
          'carType': "bjingying"
        },
        {
          'id': 17,
          'carType': "cjingying"
        }
      ]
    }, {
      'id': 6,
      'name': '牡丹花苑',
      'detail': "3款车型",
      'rightItems': [{
          'id': 18,
          'carType': "ajingying"
        },
        {
          'id': 19,
          'carType': "bjingying"
        },
        {
          'id': 20,
          'carType': "cjingying"
        }
      ]
    }, {
      'id': 7,
      'name': '尼德兰花园',
      'detail': "3款车型",
      'rightItems': [{
          'id': 21,
          'carType': "ajingying"
        },
        {
          'id': 22,
          'carType': "bjingying"
        },
        {
          'id': 23,
          'carType': "cjingying"
        }
      ]
    }],

    selectNavId: 0,
    selectedRightIds: [],
    show: false,
    zindex: 90,
    duration: 2,
    option1: [],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',

    mainActiveIndex: 0,
    activeId: [1],
    max: 6,
    items: [{
        // 导航名称
        text: '省B',
        // 该导航下所有的可选项
        children: [{
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '福州',
            id: 3,
          },
        ],
      },

      {
        // 导航名称
        text: '省A',
        // 该导航下所有的可选项
        children: [{
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 4,
          },
          {
            text: '杭州',
            id: 5,
          },
          {
            text: '福州',
            id: 6,
          },
        ],
      },
    ],

  },
  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现
  onLoad() {

  },
  /*            所有车系显示或隐藏            */
  onClickShow() {
    console.log(this.data.show)
    this.setData({
      show: !(this.data.show)
    });
  },
  onClickHide() {
    console.log(this.data.show)
    this.setData({
      show: false
    });
  },
  onClickLeftItem(event) {
    // event.preventDefault()
    // console.log(event.currentTarget.dataset.methodtype)
    var index = event.currentTarget.dataset.methodtype
    this.setData({
      selectNavId: index,
      rightItems:this.data.navSrc[index].rightItems
    })

  },
  onClickRightItem(event) {
    // event.preventDefault()
    console.log(event.currentTarget.dataset.methodtype)
    var index = event.currentTarget.dataset.methodtype
    const {
      selectedRightIds
    } = this.data;

    const indexOf = selectedRightIds.indexOf(index);
    
    if (indexOf > -1) {
      // 包含就删除
      // selectedRightIds.remove(index)
      selectedRightIds.splice(indexOf, 1);
    } else {
      // 添加
      selectedRightIds.push(index)
    }
    
    this.setData({
      selectedRightIds
    });
    console.log(this.data.selectedRightIds)
  },

})