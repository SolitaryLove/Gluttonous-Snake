import Food from './Food';
import Snake from './Snake';
import ScorePanel from './ScorePanel';

// 定义游戏控制GameControl类
class GameControl{
    food:Food;
    snake:Snake;
    scorePanel:ScorePanel;

    // 存储蛇的移动方向(按键方向)
    direction:string='';
    // 记录游戏是否结束
    isLive:boolean=true;

    constructor(){
        this.food=new Food();
        this.snake=new Snake();
        this.scorePanel=new ScorePanel(5,2);
        this.init();
    }

    // 初始化
    init(){
        // 使用bind处理事件绑定回调函数的this指向问题
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run();
    }

    // 键盘绑定的回调函数
    /* 
        ArrowUp Up
        ArrowDown Down
        ArrowRight Right
        ArrowLeft Left
    */
    keydownHandler(event:KeyboardEvent){
        this.direction=event.key;
    }

    // 蛇移动
    run(){
       // 获取蛇当前的坐标
       let X=this.snake.X;
       let Y=this.snake.Y;
        // 根据按键方向修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10; 
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }
        // 检查蛇是否吃到了食物
        this.checkEat(X,Y);
        // 修改蛇的X和Y值
        try{
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(error){
            // 类型守卫缩小变量的类型
            if(error instanceof Error){
                // 说明出现了异常，游戏结束
                alert(error.message+'GAME OVER!');
            }
            // 改变游戏标识
            this.isLive=false;
        }
        // 开启一个定时调用
        clearTimeout();
        this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
        // console.log(300-(this.scorePanel.level-1)*30);
    }

    // 判定蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X===this.food.X&&Y===this.food.Y){
            console.log('吃到食物啦~');
            // 重置食物的位置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节身体
            this.snake.addBody();
        }
    }
}

export default GameControl;