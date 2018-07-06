import './libs/weapp-adapter';
import Tween from './libs/Tween';
import * as PIXI from './libs/pixi.min';
const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
const { width, height } = { width:windowWidth * pixelRatio,height: windowHeight * pixelRatio}
console.log(windowWidth, windowHeight)
const radio = width / 750;console.log(radio, width, height)
PIXI.interaction.InteractionManager.prototype.mapPositionToPoint = (point, x, y) => {
  point.x = x * pixelRatio
  point.y = y * pixelRatio
}
let game = new PIXI.Application({
  width: 750, height: height / radio,
  backgroundColor: 0x000000,
  view: canvas
});
let stage = game.stage;
// stage.setTransform(0,0,radio,radio)

let mainContainer = new PIXI.Container({
  width: width, height: height
});

stage.addChild(mainContainer)

PIXI.loader
.add("bg","images/bg0.jpg")
.add("green","images/green.png")
  .load((loader, resources) => {
    let bg = new PIXI.Sprite(resources.bg.texture)
    // bg.width *= radio; bg.height *= radio;
    let green = new PIXI.Sprite(resources.green.texture)
    // green.width *= radio; green.height *= radio;
    green.x = 0; green.y = height / radio - green.height;
    mainContainer.addChild(bg)
    mainContainer.addChild(green)
});

let graphics = new PIXI.Graphics();
graphics.beginFill(0xfff000);
graphics.lineStyle(0, 0xffffff, 10);
graphics.drawRect(80, 80, 100, 100);
graphics.endFill();
game.stage.addChild(graphics);
let clktext = new PIXI.Text(canvas.width + "," + width + canvas.height + "," + height , { fill: "#ffffff", fontSize: 32 });
clktext.interactive = true;
let times = 0;
clktext.on("pointerdown", () => {
  clktext.text = `times${++times}`;
  clktext.x = 200 + 10 * times;
});
clktext.x = 200 + 10 * times;
clktext.y = 300;
game.stage.addChild(clktext);
console.log(Tween)