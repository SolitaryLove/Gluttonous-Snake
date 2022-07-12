// 定义蛇类Snake
class Snake{
    // 蛇头
    head:HTMLElement;
    // 蛇身(包括蛇头)
    bodies:HTMLCollection;// HTMLCollection接口表示一个包含了元素的通用集合(类数组)
    // 蛇的容器
    element:HTMLElement;

    constructor(){
        this.head=document.querySelector('#snake>div')!;
        this.bodies=document.getElementById('snake')?.getElementsByTagName('div')!;
        this.element=document.getElementById('snake')!;
    }

    // 获取蛇的坐标(蛇头)
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    // 设置蛇的坐标(蛇头)
    set X(value:number){
        // 如果没有改变直接返回
        if(value===this.X) return;
        // X值限定在0~290
        if(value<0||value>290) throw new Error('蛇撞墙啦~');
        // 修改X即修改水平坐标，蛇在左右移动
        // 蛇在向左移动时，不能向右掉着，反之亦然
        // 只有蛇头时不受该限制
        if(this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetLeft===value){
            if(value>this.X){// 向右掉头
                value=this.X-10
            }
            else{// 向左掉头
                value=this.X+10
            }
        }
        // 蛇移动身体
        this.moveBody();
        this.head.style.left=value+'px';
        // 检查蛇头与身体是否相撞
        this.checkHeadBody();
    }
    set Y(value:number){
        if(value===this.Y) return;
        if(value<0||value>290) throw new Error('蛇撞墙啦~');
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop===value){
            if(value>this.Y){
                value=this.Y-10;
            }else{
                value=this.Y+10;
            }
        }
        this.moveBody();
        this.head.style.top=value+'px';
        this.checkHeadBody();
    }

    // 蛇移动身体
    moveBody(){
        /* 从后往前改，防止覆盖位置数据
           将后面的身体设置为前面身体的位置 */
       for(let i=this.bodies.length-1;i>0;i--){
        let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
        let Y=(this.bodies[i-1] as HTMLElement).offsetTop;
        (this.bodies[i] as HTMLElement).style.left=X+'px';
        (this.bodies[i] as HTMLElement).style.top=Y+'px';
       }
    }

    // 检查蛇头与身体是否相撞
    checkHeadBody(){
        for(let i=1;i<this.bodies.length;i++){
            let sectionOfBody=this.bodies[i] as HTMLElement;
            if(this.X===sectionOfBody.offsetLeft&&this.Y===sectionOfBody.offsetTop){
                throw new Error('撞到自己啦~');
            }
        }
    }

    // 蛇增加一节身体
    addBody(){
        /* insertAdjacentElement：将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置
           'beforeend':只在该元素当中, 在该元素最后一个子孩子后面 */
        const aSectionOfBody=document.createElement('div');
        this.element.insertAdjacentElement('beforeend',aSectionOfBody);
    }
}

export default Snake;