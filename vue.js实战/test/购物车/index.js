var app=new Vue({
    el:'#app',
    data:{
        list:[
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
        ],
        checkAll:false,
        smallHand:false
    },
    computed:{
        totalPrice:function(){
           this.newList=this.list.filter(function(item){
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
        }
    },
    methods:{
        handleReduce:function(index){
            if(this.list[index].count===1) return;
            this.list[index].count--;
        },
        handleAdd:function(index){
            this.list[index].count++;
        },
        handleRemove:function(index){
            this.list.splice(index,1);
            var num=0;
            var allNum=0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i];
                allNum++;
                if(item.check){
                    num++;
                }else{
                    num--;
                }
            }
            if(num==allNum){
                this.checkAll=true;
            }else{
                this.checkAll=false;
            }
        },
        isAll:function(index){
            console.log(this.list[index].check);
            var indexItem=this.list[index];
            
            indexItem.check=!indexItem.check;
            var num=0;
            var allNum=0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i];
                allNum++;
                if(item.check){
                    num++;
                }else{
                    num--;
                }
            }
            console.log(num);////（选中了最后一个）3-全部勾选-勾选全选     （之前全部勾选，取消了任意一个勾选） 1-取消全选的勾选   
        //    if(num==3||(num==1&&indexItem.check==false)){     这里不能写死的傻瓜
        if(num==allNum||(num==(allNum-2)&&indexItem.check==false)){
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
                    this.list[i]['check']=this.checkAll;
                }
            }
            this.smallHand=false;           
        }
    }
})