//Module:专门操作一类数据的方法和属性的集合
var game={
    data:null,//保存游戏的数据：二维数组
	RN:4,//总行数
    CN:4,//总列数
	score:0,//保存游戏得分
	state:1,//保存游戏状态
	RUNNING:1,//运行中
	GAMEOVER:0,//结束
	start:function(){//启动游戏
		this.state=this.RUNNING;
		this.score=0;
		//创建一个空数组为data
       this.data=[];
	   //从r=0开始遍历到<RN
     for(var r=0;r<this.RN;r++){
		 //向data中压入一个空数组
	     this.data.push([]);
		 //从c=0开始遍历到<CN
		 for(var c=0;c<this.CN;c++){
			 //将data的r行c列赋值为0
		    this.data[r][c]=0;
		 }
	 }
	   //调用下面的randomNum();
	  this.randomNum(); this.randomNum();
	  //console.log(this.data.join("\n"));
	  this.updateView();
	  //debugger;
	  //为页面绑定键盘按下事件
	  document.onkeydown=function(e){//event事件对象：当事件发生时自动保存所有事件相关的信息的对象
	     //当键盘按下时，自动执行之后的function
         //alert(e:keyCode); 判断e:keyCode 键盘键的号码
		 if(this.state==this.RUNNING){
		 switch(e.keyCode){
		    case 37:
				this.moveLeft();
			break;
			case 38:
				this.moveTop();
			break;
			case 39:
				this.moveRight();
			break;
			case 40:
				this.moveBottom();
			break;
		 }
		 }
	  }.bind(this);
    },
	moveBottom:function(){
	     var before=String(this.data);
		 for(var c=0;c<this.CN;c++){
		  this.moveBottomInRow(c);
	     }
		 var after=String(this.data);
		 if(before!==after){//如果发生了移动
		    this.randomNum();//随机生成数
            //如果游戏结束
			this.isGAMEOVER()&&(this.state=this.GAMEOVER);
			//修改游戏状态为GAMEOVER
			this.updateView(); //更行页面
		 }
	},
	moveBottomInRow:function(c){
	      for(var r=this.CN-1;r>0;r--){
		    var next2=this.getNext2InRow(r,c); 
			if(next2===-1){
			   break;
			}else{
			   if(this.data[r][c]===0){
			       this.data[r][c]=this.data[next2][c];
				   this.data[next2][c]=0;
				   r++;
			   }else if(this.data[r][c]===this.data[next2][c]){
			        this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[next2][c]=0;
			   }
			}
		  }
	},
	getNext2InRow:function(r,c){
	     r--;
		 for(;r>=0;r--){
			 if(this.data[r][c]!==0){return r;}
			 }
		 return -1;
	},
	moveTop:function(){
	     var before=String(this.data);
		 for(var c=0;c<this.CN;c++){
		     this.moveTopInRow(c);
		 }
		 var after=String(this.data);
		 if(before!==after){
		    this.randomNum();
			this.updateView();
		 }
	},
	moveTopInRow:function(c){
	     for(var r=0;r<this.CN;r++){
		     var next1=this.getNext1InRow(r,c);
			 if(next1===-1){
			     break;
			 }else{
			     if(this.data[r][c]===0){
				     this.data[r][c]=this.data[next1][c];
					 this.data[next1][c]=0;
					 r--;
				 }else if(this.data[r][c]===this.data[next1][c]){
				     this.data[r][c]*=2;
					 this.score+=this.data[r][c];
					 this.data[next1][c]=0;
				 }
			 }
		 }
	},
	getNext1InRow:function(r,c){
	     r++;
		 for(;r<this.CN;r++){
		     if(this.data[r][c]!==0){return r}
		 }
		 return -1;
	},
	moveRight:function(){//右移所有行
		//为data拍照，保存在before中
	     var before=String(this.data);
		 //遍历data中每一行
		 for(var r=0;r<this.RN;r++){
			 //右移第r行
		    this.moveRightInRow(r);
		 }//(遍历结束)
		//为data拍照，保存在after中
		 var after=String(this.data);
		 //如果发生了移动
		 if(before!==after){
			 //随机生成数
		    this.randomNum();
			//更新页面
			this.updateView();
		 }
	},
    moveRightInRow:function(r){//右移第r行
		//c从CN-1开始，到>0结束，反向遍历r行中每个格
	    for(var c=this.CN-1;c>0;c--){
		//找r行c列左侧前一个不为0的位置prevc
		  var prevc=this.getPrevInRow(r,c);
		  //如果prevc为-1,就退出循环
		  if(prevc===-1){
		     break;
			 //否则
		  }else {
			  //如果c列的值是0
		     if(this.data[r][c]===0){
				 //将prevc列的值赋值给c列
			   this.data[r][c]=this.data[r][prevc];
			   //将prevc列的值置为0
			   this.data[r][prevc]=0;
			   //c留在原地
			    c++;
				//否则 如果c列的值等于prevc列的值
			 }else if(this.data[r][c]===this.data[r][prevc]){
				 //将c列的值*2
			      this.data[r][c]*=2;
				  this.score+=this.data[r][c];
				  //将prevc列置为0
				  this.data[r][prevc]=0;
			 }
		  }
		}
	},
	//找r行c列左侧前一个不为0的位置
	getPrevInRow:function(r,c){
         //c-1
	     c--;
		 //从c开始，到>=0结束，反向遍历
		 for(;c>=0;c--){
			//如果r行c位置不是0，就返回c
		   if(this.data[r][c]!==0){return c;}
		 }//(遍历结束)
		 return -1;//返回-1
	},
    moveLeft:function(){//左移所有行
	   var before=String(this.data);
	   //遍历data中的每一行 r
	   for(var r=0;r<this.RN;r++){
	       this.moveLeftInRow(r);//左移第n行
		   }//遍历结束
		var after=String(this.data);
        //如果before不等于after
        if(before!==after){
        this.randomNum();//随机生成一个新数
        this.updateView();//更新页面
	   }
	},
    moveLeftInRow:function(r){//左移第r行
     //c从0开始，到<CN-1结束，遍历r行中每个格
      for(var c=0;c<this.CN-1;c++){
      //找r行c列右侧下一个不为0的位置nextc
        var nextc=this.getNextInRow(r,c);
      //如果nextc为-1,就退出循环
        if(nextc==-1){break;}
         else{//否则  
        //如果c列的值是0
           if(this.data[r][c]==0){
          //将nextc列的值赋值给c列
             this.data[r][c]=this.data[r][nextc];
          //将nextc列的值置为0
             this.data[r][nextc]=0;
             c--;//c留在原地
           }else if(this.data[r][c]==this.data[r][nextc]){
        //否则 如果c列的值等于nextc列的值
             this.data[r][c]*=2;//将c列的值*2
			 this.score+=this.data[r][c];
             this.data[r][nextc]=0;//将nextc列置为0 
           }
         }
         }
     },
     //找r行c列右侧下一个不为0的位置
     getNextInRow:function(r,c){
     c++;//c+1
     //从c开始，到<CN结束
     for(;c<this.CN;c++){
      //如果r行c位置不是0，就返回c
      if(this.data[r][c]!=0){return c;}
     }//(遍历结束)
     return -1;//返回-1
     },
	//将data中的元素更新到页面对应div中
	updateView:function(){
	   for(var r=0;r<this.RN;r++){
	      for(var c=0;c<this.CN;c++){
			  var div=document.getElementById("c"+r+c);
			  if(this.data[r][c]!==0){
		         div.innerHTML=this.data[r][c];
			     div.className="cell n"+this.data[r][c];
			  }else{
			     div.innerHTML="";
				 div.innerName="cell";
			  }
		  }
	   }
	   //找到id为score的span，设置其内容为score属性
	   document.getElementById("score").innerHTML=this.score;
	   //找到id为gameOver的div，设置其style的display属性为：如果游戏状态为"GAMEOER?""block""none"
	   document.getElementById("gameOver").style.display=
		   this.state==this.GAMEOVER?"block":"none";
       //如果游戏结束，将score写入final
        this.state==this.GAMEOVER&&(
        document.getElementById("final").innerHTML=this.score
           );
	},
    //在data中的一个随机位置生成一个随机数
	 randomNum:function(){
		//反复
	   while(true){
		   //在0~RN之间生产一个随机数r
	      var r=parseInt(Math.random()*this.RN);
		  //在0~CN之间生产一个随机数c
		  var c=parseInt(Math.random()*this.CN);
		  //如果data中r行c列
		  if(this.data[r][c]===0){
			  //将data中的r行c列的值设置为：随机生成一个0~1之间的小数，如果<0.5，就取2，否则就取4
		     this.data[r][c]=Math.random()<0.5?2:4;
			 break;
		  }
	   }
	},
	isGAMEOVER:function(){
		 //遍历r行
	     for(var r=0;r<this.RN-1;r++){
			 //遍历c列
		      for(var c=0;c<this.CN-1;c++){
				  //如果当前元素等于0就返回false
			      if(this.data[r][c]===0){return false;}
				  //如果c位置小于当前列CN-1且当前行元素等于当前行右侧的元素就返回false
				  if(c<this.CN-1&&(this.data[r][c]===this.data[r][c+1])){
					  return false;
					  }
					  //如果r位置小于当前列RN-1且当前列元素等于当前列下面的元素就返回false
				  if(r<this.RN-1&&(this.data[r][c]===this.data[r+1][c])){
					  return false;
					  }
			  }
		 }
		 return true;//返回true  GAMEOVER
	}
}
game.start();