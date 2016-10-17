class HanoiView{
  constructor(game, $el){
    this.game = game;
    this.$el = $el;

    this.setupTowers();
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // let $fromTower, $toTower;
    let clicked = false;
    let $fromTower, $toTower;

    this.$el.on('click', 'ul', (event) => {
      if (!clicked){
        $fromTower = $(event.currentTarget);
        clicked = true;
      }else{
        clicked = false
        $toTower = $(event.currentTarget);
        this.makeMove($fromTower.data('pos'), $toTower.data('pos'))
      }

    });
  }


  makeMove(fromTower, toTower){
    this.game.move(fromTower,toTower);
    if (this.game.isWon()){
      this.$el.addClass('game-over');
      alert("You did it!")
    }
    this.render();
  }

  setupTowers(){
    this.$el.empty();
    this.$el.addClass("group");

    let $tower, $disk;

    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      $tower = $("<ul>");
      $tower.data("pos", towerIdx);
      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
        $disk = $("<li>");
        $tower.append($disk);
      }
      this.$el.append($tower);
    }

  }

  render(){
    const $towers = this.$el.find('ul');
    $towers.removeClass();

    if (this.fromTowerIdx !== null) {
      $towers.eq(this.fromTowerIdx).addClass("selected");
    }

    this.game.towers.forEach((disks, towerIdx) =>{
      const $disks = $towers.eq(towerIdx).children();
      $disks.removeClass();

      disks.forEach( (diskWidth, diskIdx) => {
        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`)
      });
    })
  }
}

module.exports = HanoiView;
