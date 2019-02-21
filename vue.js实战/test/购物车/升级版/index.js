var app=new Vue({
    el:'#app',
    data:{
        list:[
            {
                name:'电子产品',
                content:[
                    {
                        id:1,
                        name:'iPhone 7',
                        price:6288,
                        count:1,
                        check:false
                    },{
                        id:2,
                        name:'iPad Pro',
                        price:5888,
                        count:1,
                        check:false
                    },{
                        id:3,
                        name:'MacBook Pro',
                        price:21488,
                        count:1,
                        check:false
                    }
                ]
            },{
                name:'图书',
                content:[
                    {
                        id:1,
                        name:'《小王子》',
                        price:10000000000,
                        count:1,
                        check:false
                    },{
                        id:2,
                        name:'《失控》',
                        price:100,
                        count:1,
                        check:false
                    },{
                        id:3,
                        name:"《目送》",
                        price:40,
                        count:1,
                        check:false
                    },{
                        id:4,
                        name:'《爱与孤独》',
                        price:10,
                        count:1,
                        check:false
                    }
                ]
            }
           
        ],
        checkAll:false,
        smallHand:false
    },
    computed:{
        totalPrice:function(){
            var arr=[];
            for(var i=0;i<this.list.length;i++){
                arr=arr.concat(this.list[i]['content']);
            }
           this.newList=arr.filter(function(item){
                    if(item.check){
                        return item;
                    }
            });
            var total=0;
            for(var i=0;i<this.newList.length;i++){
                var item=this.newList[i];
                total+=item.price*item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');//匹配后面已3个数字结尾的非单词边界，换成“,”
            /* replace:
                用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
                \B  :匹配非单词边界
                (red|blue|green)：查找任何指定的选项
                ?=n ：匹配任何其后紧接指定字符串n的字符串（n量词）    提供后面的n找？
                \d  :查找数字
                n{X}：匹配包含X个n的序列字符串
                \d{3}：匹配含有3个数字的字符串
                n$  :匹配任何结尾为n的字符串
                n+  :匹配任何包含至少一个n的字符串
                (\d{3})+$   ：匹配至少一个已含有3个数字字符串结尾的字符
             */    
        },
        allListNum:function(){
            var allNum=0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i]['content'];
                for(var j=0;j<item.length;j++){
                    allNum++;
                }              
            }
            return allNum;
        }
    },
    methods:{
        handleReduce:function(index,smallIndex){
            console.log(index);
            console.log(smallIndex);
            if(this.list[index]['content'][smallIndex].count===1) return;
            this.list[index]['content'][smallIndex].count--;
        },
        handleAdd:function(index,smallIndex){
            this.list[index]['content'][smallIndex].count++;
        },
        handleRemove:function(index,smallIndex){
            this.list[index]['content'].splice(smallIndex,1);
            var num=0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i]['content'];
                for(var j=0;j<item.length;j++){
                    if(item[j].check){
                        num++;
                    }else{
                        num--;
                    }
                }              
            }
            if(num==this.allListNum){
                this.checkAll=true;
            }else{
                this.checkAll=false;
            }
        },
        isAll:function(index,smallIndex){
            console.log(this.list[index]['content'][smallIndex].check);
            var indexItem=this.list[index]['content'][smallIndex];
            
            indexItem.check=!indexItem.check;
            var num=0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i]['content'];
                for(var j=0;j<item.length;j++){
                    if(item[j].check){
                        num++;
                    }else{
                        num--;
                    }
                }              
            }
            console.log(num);////（选中了最后一个）3-全部勾选-勾选全选     （之前全部勾选，取消了任意一个勾选） 1-取消全选的勾选   
           // if(num==7||(num==5&&indexItem.check==false)){    这里的值不能写死，太笨了

           if(num==this.allListNum||(num==(this.allListNum-2)&&indexItem.check==false)){ 
                this.checkAll=indexItem.check;
                this.smallHand=true;
            }
        }
    },
    watch:{
        checkAll:function(){
            if(this.smallHand){

            }else{
                for(var i=0;i<this.list.length;i++){
                    var list=this.list;
                    for(var j=0;j<list[i]['content'].length;j++){
                        this.list[i]['content'][j]['check']=this.checkAll;
                    }
                }
            }
            this.smallHand=false;           
        }
    }
})