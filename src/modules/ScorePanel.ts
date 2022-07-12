// 定义记分牌ScorePanel类
class ScorePanel{
    score:number=0;// 分数
    level:number=1;// 等级
    maxLevel:number;// 最高等级
    upScore:number;// 升级所需分数

    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    constructor(maxLevel:number=10,upScore:number=10){
        this.scoreEle=document.getElementById('score')!;
        this.levelEle=document.getElementById('level')!;
        this.maxLevel=maxLevel;
        this.upScore=upScore;
    }

    // 加分
    addScore(){
        this.scoreEle.innerHTML=++this.score+'';
        // 分数满足条件时触发升级
        if(this.score%this.upScore===0) this.levelUp();
    }

    // 升级
    levelUp(){
        if(this.level<this.maxLevel) this.levelEle.innerHTML=++this.level+'';
    }
}

export default ScorePanel;