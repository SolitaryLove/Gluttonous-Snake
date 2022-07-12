// 定义食物类Food
class Food{
    // 食物所对应的元素
    element:HTMLElement;

    constructor(){
        this.element=document.getElementById('food')!;
    }

    // 获取食物X轴坐标
    get X(){
        return this.element.offsetLeft;
    }
    // 获取食物Y轴坐标
    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物的位置
    change(){
        // 生成一个随机的位置
        // 位置限定在 0~290
        // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整10的倍数
        // 注意：食物的位置不能与蛇的位置相重合（在游戏控制层处理）
        let top:number=Math.round(Math.random()*29)*10;
        let left:number=Math.round(Math.random()*29)*10;
        this.element.style.top=top+'px';
        this.element.style.left=left+'px';
    }
}

export default Food;