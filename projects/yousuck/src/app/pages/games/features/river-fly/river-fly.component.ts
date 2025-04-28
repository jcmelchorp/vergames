import { Component, HostListener } from '@angular/core';
import {GameScreenComponent} from './game-screen/game-screen.component'
declare var $: any;

@Component({
  selector: 'app-river-fly',
  imports:[GameScreenComponent],
templateUrl: 'river-fly.component.html',
  styleUrls: ['./river-fly.component.scss'],
})
export class RiverFlyComponent {
  gameScore = 0;
  storageCurrentRun = localStorage.getItem('RUN');
  storageTotalBridge = localStorage.getItem('BRIDGE');
  storageLastPilot = localStorage.getItem('PILOT');
  storageBoss = localStorage.getItem('BOSS');
  storageWon = localStorage.getItem('WON');

  $body = $('river-body');
  interval: string | number | NodeJS.Timeout | null | undefined;
  screenWidth = this.$body.attr('data-width');
  screenHeight = this.$body.attr('data-height');
  pixelSize = this.$body.attr('data-pxsize');
  playWidth = Number(this.$body.attr('data-playwidth'));
  riverMeander = Number(this.$body.attr('data-meander'));
  whenToChangePlayWidth = 11;
  gameScreen = $('game-screen');
  gameSpeed = Number(this.$body.attr('data-spid'));

  constructor() {
    this.init();
  }

  init() {
    //SET DEFAULT VALUES FOR PERSISTENCY
    localStorage.getItem('RUN') != null ? '' : localStorage.setItem('RUN', '1');
    localStorage.getItem('BRIDGE') != null
      ? ''
      : localStorage.setItem('BRIDGE', '0');
    localStorage.getItem('PILOT') != null
      ? ''
      : localStorage.setItem('PILOT', 'Bob');
    localStorage.getItem('BOSS') != null
      ? ''
      : localStorage.setItem('BOSS', 'false');
    localStorage.getItem('WON') != null
      ? ''
      : localStorage.setItem('WON', 'no');

    //SET GLOBAL VARS

    //OVERRIDE SPECIFIC PILOT CONFIG
    if (this.storageLastPilot == 'Speedking') {
      this.gameSpeed = Math.floor(this.gameSpeed / 2);
      const fuelLeakSpeed = 1;
    } else if (this.storageLastPilot == 'Betty') {
      this.gameSpeed = Math.floor(this.gameSpeed / 1.23);
      const fuelLeakSpeed = 1.25;
    } else if (this.storageLastPilot == 'Jack') {
      var jackLeftOrRight = this.getRandomIntIncInc(0, 1);
      jackLeftOrRight == 0
        ? this.$body.addClass('left')
        : this.$body.addClass('right');
    }

    //SETUP GAME
    if (Number(this.storageTotalBridge) < 10) {
      this.$body.addClass('pilot-' + this.storageLastPilot!.toLowerCase());
      this.setupBottomStatsScreen();
      localStorage.setItem('BOSS', 'false');
      switch (this.storageCurrentRun) {
        case '1':
          this.showSelectScreen(this.gameScreen, 'start');
          break;
        default:
          this.setupGamingScreen(
            this.screenWidth,
            this.screenHeight,
            this.gameScreen,
          );
          this.philScreen(
            this.screenWidth,
            this.screenHeight,
            this.pixelSize,
            this.playWidth,
            this.gameScreen,
            0,
            this.riverMeander,
          );
          this.setupPlayer();
          this.$body.attr('data-gamestarted', 'yes');
          this.initTimingStuff(this.gameSpeed, 'yes');
          break;
      }
    } else {
      localStorage.setItem('BOSS', 'true');
      this.$body.addClass('pilot-' + this.storageLastPilot!.toLowerCase());
      this.$body.addClass('win-screen');
      this.setupBottomStatsScreen();
      this.setupGamingScreen(
        this.screenWidth,
        this.screenHeight,
        this.gameScreen,
      );
      this.bossScreen(
        this.screenWidth,
        this.screenHeight,
        this.pixelSize,
        this.playWidth,
        this.gameScreen,
        0,
        this.riverMeander,
      );
      this.setupPlayer();
      this.setupBoss();
      this.$body.attr('data-gamestarted', 'yes');
      this.initTimingStuff(this.gameSpeed, 'yes');
    }
  }

  @HostListener('pilot-chooser #first-start:click', ['$event'])
  handlePilotFirst(event: KeyboardEvent): void {
    $('river-body').attr('data-screenchoose', 'no');
    $('pilot-choose').remove();
    this.setupGamingScreen(
      this.screenWidth,
      this.screenHeight,
      this.gameScreen,
    );
    this.philScreen(
      this.screenWidth,
      this.screenHeight,
      this.pixelSize,
      this.playWidth,
      this.gameScreen,
      0,
      this.riverMeander,
    );
    this.setupPlayer();
    this.initTimingStuff(this.gameSpeed);
    this.$body.attr('data-gamestarted', 'yes');
  }

  @HostListener('pilot-chooser .pick-a-pilot:click', ['$event'])
  handlePickPilot(event: KeyboardEvent): void {
    event.preventDefault();
    var isStarted = this.$body.attr('data-gamestarted'),
      isEnded = this.$body.attr('data-gameended');

    if (isStarted == 'yes' && isEnded == 'yes') {
      var thisPilot = $(self).attr('data-pilotname');
      localStorage.setItem('PILOT', thisPilot);
      //location.reload();
      history.go(0);
    }
  }

  @HostListener('pilot-chooser #restart-game:click', ['$event'])
  handleMouseClick(event: KeyboardEvent): void {
    console.log('123');
    event.preventDefault();
    localStorage.setItem('RUN', '1');
    localStorage.setItem('BRIDGE', '0');
    localStorage.setItem('PILOT', 'Bob');
    localStorage.setItem('WON', 'no');
    //location.reload();
    history.go(0);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    $('touch-controls').addClass('hidden');
    this.controlPlayerPixel(event.target);
  }

 
  @HostListener('river-body:touchstart', ['$event'])
  handleTouchStart(event: KeyboardEvent) {
    $('touch-controls').removeClass('hidden');
  }

  @HostListener('touch-controls:touchend', ['$event'])
  handleTouchEnd(event: KeyboardEvent) {
    this.controlPlayerPixel(Number($(self).attr('id')));
  }

  @HostListener('a:touchend', ['$event'])
  handleATouchEnd(event: KeyboardEvent) {
    this.controlPlayerPixel(Number($(self).attr('id')));
  }

  //GENERATE SCREEN
  setupGamingScreen(screenWidth: any, screenHeight: any, gameScreen: any) {
    gameScreen.css('width', screenWidth).css('height', screenHeight);
  }

  setupBottomStatsScreen() {
    let storageCurrentRun = localStorage.getItem('RUN'),
      storageTotalBridge = localStorage.getItem('BRIDGE'),
      storageLastPilot = localStorage.getItem('PILOT');

    $('game-stats').append(
      '<game-label><span>Bridge</span><label id="bridge-label">&nbsp;</label></game-label><game-label><span>Score</span><label id="score-label">0</label></game-label><game-label><span>Fuel</span><label><progress id="fuel-bar" value="' +
      $('game-stats').fuelAmount +
        '" max="125"></progress></label></game-label><game-label><span>Pilot</span><label id="score-pilot">&nbsp;</label></game-label><game-label><span>Run</span><label id="score-run">&nbsp;</label></game-label>',
    );

    $('#bridge-label').html(storageTotalBridge);
    $('#score-pilot').html(storageLastPilot);
    $('#score-run').html(storageCurrentRun);
  }

  //ROW OF PIXELS PHILES IT
  generatePixel(thisRow: any, pixelIndex: any, pixelSize: any, pixelType: any) {
    var whichPixel = '';
    var enemyDirection = this.getRandomIntIncInc(0, 1),
      whichGraph = this.getRandomIntIncInc(1, 3);

    switch (pixelType) {
      case 'grass':
        whichPixel =
          '<grass-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></grass-pixel>';
        break;
      case 'island':
        whichPixel =
          '<island-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></island-pixel>';
        break;
      case 'island-forest':
        whichPixel =
          '<island-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/forest-' +
          whichGraph +
          '.svg" /></island-pixel>';
        break;
      case 'forest':
        whichPixel =
          '<forest-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/forest-' +
          whichGraph +
          '.svg" /></forest-pixel>';
        break;
      case 'mountain':
        whichPixel =
          '<mountain-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/mountain-' +
          whichGraph +
          '.svg" /></mountain-pixel>';
        break;
      case 'river':
        whichPixel =
          '<river-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></river-pixel>';
        break;
      case 'sea':
        whichPixel =
          '<river-pixel class="sea" id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></river-pixel>';
        break;
      case 'deepsea':
        whichPixel =
          '<river-pixel class="deepsea" id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></river-pixel>';
        break;
      case 'fuel':
        whichPixel =
          '<fuel-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/fuel.svg" /></fuel-pixel>';
        break;
      case 'coastleft':
        whichPixel =
          '<coast-pixel class="left" id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></coast-pixel>';
        break;
      case 'coastright':
        whichPixel =
          '<coast-pixel class="right" id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"></coast-pixel>';
        break;
      case 'enemy-boat':
        whichPixel =
          '<river-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><enemy-pixel class="boat"><img src="https://notbigmuzzy.github.io/riveraid/graphics/boat.svg" /></enemy-pixel></river-pixel>';
        break;
      case 'enemy-chopper':
        whichPixel =
          '<river-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><enemy-pixel data-direction="' +
          enemyDirection +
          '-direction" class="chopper"><img src="https://notbigmuzzy.github.io/riveraid/graphics/chopper.svg" /></enemy-pixel></river-pixel>';
        break;
      case 'enemy-baloon':
        whichPixel =
          '<river-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><enemy-pixel data-direction="' +
          enemyDirection +
          '-direction" data-move="no" class="baloon"><img src="https://notbigmuzzy.github.io/riveraid/graphics/ballon.svg" /></enemy-pixel></river-pixel>';
        break;
      case 'bridge-pixel':
        whichPixel =
          '<bridge-pixel id="pixel' +
          pixelIndex +
          '" style="width:' +
          pixelSize +
          'px;height:' +
          pixelSize +
          'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/bridge-' +
          3 +
          '.svg" /></bridge-pixel>';
        break;
    }

    thisRow.append(whichPixel);
  }

  philStartRow(
    numberOfPixelsW: any,
    rowID: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
  ) {
    gameScreen.append(
      '<screen-row data-rowidth="rowidth-' +
        playWidth +
        '" class="start-row" style="transition: height 0.' +
        (this.gameSpeed / 10 + 4) +
        's ease-out; height:' +
        pixelSize +
        'px" id="row' +
        rowID +
        '"></screen-row',
    );
    var thisRow = $('#row' + rowID),
      getDiff = this.setplayWidth(pixelSize, playWidth);
    var howMuchGrass = this.getRandomIntIncInc(
        numberOfPixelsW - 5,
        numberOfPixelsW - 5,
      ),
      leftGrass = Math.floor(howMuchGrass / 2),
      leftGrassStart = 0,
      riverWidth = numberOfPixelsW - howMuchGrass,
      riverStart = leftGrassStart + leftGrass,
      rightGrass = howMuchGrass - leftGrass,
      rightGrassStart = riverStart + riverWidth;
    for (let pixelIndex = 0; pixelIndex < numberOfPixelsW; pixelIndex++) {
      switch (true) {
        case (pixelIndex >= leftGrassStart && pixelIndex < riverStart) ||
          (pixelIndex >= rightGrassStart && pixelIndex < numberOfPixelsW):
          this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
          break;
        case pixelIndex >= riverStart && pixelIndex < rightGrassStart:
          if (pixelIndex == riverStart) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastleft');
            break;
          } else if (pixelIndex == rightGrassStart - 1) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastright');
            break;
          } else {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
            break;
          }
      }
    }
  }

  philBridgeRow(
    numberOfPixelsW: any,
    rowID: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
  ) {
    gameScreen.append(
      '<screen-row data-rowidth="rowidth-' +
        playWidth +
        '" class="bridge-row" style="transition: height 0.' +
        (this.gameSpeed / 10 + 4) +
        's ease-out; height:' +
        pixelSize +
        'px" id="row' +
        rowID +
        '"></screen-row',
    );
    var thisRow = $('#row' + rowID),
      getDiff = this.setplayWidth(pixelSize, playWidth);
    var howMuchGrass = this.getRandomIntIncInc(
        numberOfPixelsW - 3,
        numberOfPixelsW - 3,
      ),
      leftGrass = Math.floor(howMuchGrass / 2),
      leftGrassStart = 0,
      riverStart = 5;
    var riverWidth = numberOfPixelsW - riverStart,
      rightGrass = howMuchGrass - leftGrass,
      rightGrassStart = riverStart + riverWidth;
    for (let pixelIndex = 0; pixelIndex < numberOfPixelsW; pixelIndex++) {
      switch (true) {
        case (pixelIndex >= leftGrassStart && pixelIndex < riverStart) ||
          (pixelIndex >= rightGrassStart && pixelIndex < numberOfPixelsW):
          this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
          break;
        case pixelIndex >= riverStart && pixelIndex < rightGrassStart:
          if (pixelIndex == riverStart) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastleft');
            break;
          } else if (pixelIndex == rightGrassStart - 1) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastright');
            break;
          } else {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'bridge-pixel');
            break;
          }
      }
    }
  }

  philSeaRow(
    numberOfPixelsW: any,
    rowID: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
  ) {
    gameScreen.append(
      '<screen-row data-rowidth="rowidth-' +
        playWidth +
        '" class="sea-row" style="transition: height 0.' +
        (this.gameSpeed / 10 + 4) +
        's ease-out; height:' +
        pixelSize +
        'px" id="row' +
        rowID +
        '"></screen-row',
    );
    var thisRow = $('#row' + rowID),
      getDiff = this.setplayWidth(pixelSize, playWidth);
    var howMuchGrass = this.getRandomIntIncInc(
        numberOfPixelsW - 15,
        numberOfPixelsW - 25,
      ),
      leftGrass = Math.floor(howMuchGrass / 2),
      leftGrassStart = 0,
      riverWidth = numberOfPixelsW - howMuchGrass,
      riverStart = leftGrassStart + leftGrass,
      rightGrass = howMuchGrass - leftGrass,
      rightGrassStart = riverStart + riverWidth;
    for (let pixelIndex = 0; pixelIndex < numberOfPixelsW; pixelIndex++) {
      switch (true) {
        case (pixelIndex >= leftGrassStart && pixelIndex < riverStart) ||
          (pixelIndex >= rightGrassStart && pixelIndex < numberOfPixelsW):
          this.generatePixel(thisRow, pixelIndex, pixelSize, 'sea');
          break;
        case pixelIndex >= riverStart && pixelIndex < rightGrassStart:
          if (
            pixelIndex == riverWidth / this.getRandomIntIncInc(1, 5) &&
            !$('game-screen').find('fuel-pixel').length
          ) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'fuel');
          } else {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'deepsea');
          }
          break;
      }
    }
  }

  philRegularRow(
    numberOfPixelsW: any,
    rowID: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
    willRiverHaveIsland: any,
    riverMeander: any,
  ) {
    gameScreen.append(
      '<screen-row class="regular-row" data-rowmeander="' +
        riverMeander +
        '" data-rowidth="rowidth-' +
        playWidth +
        '" style="transition: height 0.' +
        (this.gameSpeed / 10 + 4) +
        's ease-out; height:' +
        pixelSize +
        'px" id="row' +
        rowID +
        '"></screen-row',
    );
    var thisRow = $('#row' + rowID),
      thisRowMeander = Number(thisRow.attr('data-rowmeander')),
      getDiff = this.setplayWidth(pixelSize, playWidth);
    var howMuchGrass = this.getRandomIntIncInc(getDiff.from, getDiff.to),
      thisRowRiverMeander = riverMeander / 100,
      leftGrass = Math.floor(howMuchGrass / thisRowRiverMeander),
      leftGrassStart = 0,
      riverWidth = numberOfPixelsW - howMuchGrass,
      riverStart = leftGrassStart + leftGrass,
      middleOfRiverWide = numberOfPixelsW / 2 - 1,
      rightGrass = howMuchGrass - leftGrass,
      rightGrassStart = riverStart + riverWidth,
      willRowContainForest = this.getRandomIntIncInc(0, 1),
      willRowContainForestControl = this.getRandomIntIncInc(0, 1),
      willContaintMountain = this.getRandomIntIncInc(0, 5),
      willContaintMountainControl = this.getRandomIntIncInc(0, 5),
      willRowContainEnemy = this.getRandomIntIncExc(0, Math.abs(playWidth - 4)),
      willRowContainEnemyControl = this.getRandomIntIncExc(
        0,
        Math.abs(playWidth - 4),
      ),
      fuelLeftOrRight = this.getRandomIntIncInc(0, 1);

    //RIVER MEANDERING
    if (playWidth == 2) {
      //WIDE RIVER RESET MEANDER
      $('river-body').attr('data-meander', '200');
    } else {
      var meanderModifier = 10,
        willGoLeftOrRight = this.getRandomIntIncInc(0, 1);

        if (willGoLeftOrRight) {
            //MEANDER LEFT
            var modifyMeander = thisRowMeander - meanderModifier;
          } else {
            //MEANDER RIGHT
            var modifyMeander = thisRowMeander + meanderModifier;
          }
    
      if (modifyMeander < 110) {
        willGoLeftOrRight = 1;
      } else if (modifyMeander >= 500) {
        willGoLeftOrRight = 0;
      }

     
      $('river-body').attr('data-meander', modifyMeander);
    }

    //WILL RIVER ROW HAVE ISLANDS LOGIC
    if (
      thisRow.attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().attr('data-rowidth') != 'rowidth-2'
    ) {
      willRiverHaveIsland = false;
    } else if (
      thisRow.attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().prev().attr('data-rowidth') != 'rowidth-2'
    ) {
      willRiverHaveIsland = false;
    } else if (
      thisRow.attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().prev().attr('data-rowidth') == 'rowidth-2' &&
      thisRow.prev().prev().prev().attr('data-rowidth') != 'rowidth-2'
    ) {
      willRiverHaveIsland = false;
    }

    if (
      (thisRow.attr('data-rowidth') == 'rowidth-0' &&
        thisRow.prev().attr('data-rowidth') == 'rowidth-2') ||
      (thisRow.attr('data-rowidth') == 'rowidth-1' &&
        thisRow.prev().attr('data-rowidth') == 'rowidth-2')
    ) {
      var prevPixelToBeReplaced = thisRow.prev().find('island-pixel'),
        prevPrevPixelToBeReplaced = thisRow.prev().prev().find('island-pixel');
      prevPixelToBeReplaced.each(function () {
        replaceIslandWithRiver($(self));
      });
      prevPrevPixelToBeReplaced.each(function () {
        replaceIslandWithRiver($(self));
      });
      function replaceIslandWithRiver(pixel: any) {
        var pixelID = pixel.attr('id');
        pixel.replaceWith(
          '<river-pixel id="' +
            pixelID +
            '" style="width:32px;height:32px"></river-pixel>',
        );
      }
    }

    for (let pixelIndex = 0; pixelIndex < numberOfPixelsW; pixelIndex++) {
      switch (true) {
        case pixelIndex >= leftGrassStart && pixelIndex < riverStart:
          if (
            willRowContainForest == willRowContainForestControl &&
            pixelIndex ==
              leftGrassStart +
                this.getRandomIntIncInc(0, leftGrassStart + riverStart - 1)
          ) {
            if (
              thisRow
                .prev()
                .find('#pixel' + pixelIndex)
                .is('grass-pixel')
            ) {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'forest');
            } else {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
            }
          } else if (
            willContaintMountain == willContaintMountainControl &&
            pixelIndex ==
              leftGrassStart +
                this.getRandomIntIncInc(0, leftGrassStart + riverStart - 1)
          ) {
            if (
              thisRow
                .prev()
                .find('#pixel' + pixelIndex)
                .is('grass-pixel')
            ) {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'mountain');
            } else {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
            }
          } else {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
          }
          break;
        case pixelIndex >= riverStart && pixelIndex < rightGrassStart:
          if (pixelIndex == riverStart) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastleft');
            break;
          } else if (pixelIndex == rightGrassStart - 1) {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'coastright');
            break;
          } else {
            if (playWidth == 2) {
              //WIDE RIVER
              var islandRowStart =
                  middleOfRiverWide - this.getRandomIntIncInc(1, 3),
                islandRowEnd =
                  middleOfRiverWide + this.getRandomIntIncInc(2, 4);

              if (willRiverHaveIsland == true) {
                if (rowID > 5 && !$('game-screen').find('fuel-pixel').length) {
                  if (fuelLeftOrRight) {
                    if (pixelIndex == islandRowStart - 3) {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'fuel',
                      );
                    } else {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'river',
                      );
                    }
                  } else {
                    if (pixelIndex == islandRowEnd + 3) {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'fuel',
                      );
                    } else {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'river',
                      );
                    }
                  }
                } else if (
                  rowID > 10 &&
                  willRowContainEnemy == willRowContainEnemyControl &&
                  pixelIndex ==
                    riverStart + this.getRandomIntIncInc(0, islandRowStart - 2)
                ) {
                  var whatTypeOfEnemy = this.getRandomIntIncInc(0, 20);
                  switch (true) {
                    case whatTypeOfEnemy < 10:
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-boat',
                      );
                      break;
                    case whatTypeOfEnemy >= 10 && whatTypeOfEnemy <= 15:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-chopper',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                    case whatTypeOfEnemy > 5:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-baloon',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                  }
                } else if (
                  rowID > 10 &&
                  willRowContainEnemy == willRowContainEnemyControl &&
                  pixelIndex ==
                    islandRowEnd + this.getRandomIntIncInc(0, rightGrassStart)
                ) {
                  var whatTypeOfEnemy = this.getRandomIntIncInc(0, 20);
                  switch (true) {
                    case whatTypeOfEnemy < 10:
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-boat',
                      );
                      break;
                    case whatTypeOfEnemy >= 10 && whatTypeOfEnemy <= 15:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-chopper',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                    case whatTypeOfEnemy > 5:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-baloon',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                  }
                } else if (
                  pixelIndex > islandRowStart &&
                  pixelIndex < islandRowEnd
                ) {
                  if (this.getRandomIntIncInc(0, 1)) {
                    this.generatePixel(
                      thisRow,
                      pixelIndex,
                      pixelSize,
                      'island',
                    );
                  } else {
                    this.generatePixel(
                      thisRow,
                      pixelIndex,
                      pixelSize,
                      'island-forest',
                    );
                  }
                } else {
                  this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
                }
              } else {
                if (rowID > 5 && !$('game-screen').find('fuel-pixel').length) {
                  if (
                    pixelIndex ==
                    riverStart + Math.ceil(islandRowStart / 2)
                  ) {
                    this.generatePixel(thisRow, pixelIndex, pixelSize, 'fuel');
                  } else {
                    this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
                  }
                } else if (
                  rowID > 10 &&
                  willRowContainEnemy == willRowContainEnemyControl &&
                  pixelIndex ==
                    riverStart + this.getRandomIntIncInc(0, riverWidth)
                ) {
                  var whatTypeOfEnemy = this.getRandomIntIncInc(0, 20);
                  switch (true) {
                    case whatTypeOfEnemy < 10:
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-boat',
                      );
                      break;
                    case whatTypeOfEnemy >= 10 && whatTypeOfEnemy <= 15:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-chopper',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                    case whatTypeOfEnemy > 5:
                      if (
                        thisRow.find('.chopper').length == 0 &&
                        thisRow.find('.baloon').length == 0
                      ) {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-baloon',
                        );
                      } else {
                        this.generatePixel(
                          thisRow,
                          pixelIndex,
                          pixelSize,
                          'enemy-boat',
                        );
                      }
                      break;
                  }
                } else {
                  this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
                }
              }
            } else {
              //NARROW RIVER OR DEFAULT RIVER
              if (rowID > 5 && !$('game-screen').find('fuel-pixel').length) {
                if (
                  pixelIndex ==
                  riverStart +
                    Math.ceil(
                      riverWidth / (this.getRandomIntIncInc(1, 3) + 0.5),
                    )
                ) {
                  this.generatePixel(thisRow, pixelIndex, pixelSize, 'fuel');
                } else {
                  this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
                }
              } else if (
                rowID > 10 &&
                willRowContainEnemy == willRowContainEnemyControl &&
                pixelIndex ==
                  riverStart + this.getRandomIntIncInc(0, riverWidth)
              ) {
                var whatTypeOfEnemy = this.getRandomIntIncInc(0, 20);
                switch (true) {
                  case whatTypeOfEnemy < 10:
                    this.generatePixel(
                      thisRow,
                      pixelIndex,
                      pixelSize,
                      'enemy-boat',
                    );
                    break;
                  case whatTypeOfEnemy >= 10 && whatTypeOfEnemy <= 15:
                    if (
                      thisRow.find('.chopper').length == 0 &&
                      thisRow.find('.baloon').length == 0
                    ) {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-chopper',
                      );
                    } else {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-boat',
                      );
                    }
                    break;
                  case whatTypeOfEnemy > 15:
                    if (
                      thisRow.find('.chopper').length == 0 &&
                      thisRow.find('.baloon').length == 0
                    ) {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-baloon',
                      );
                    } else {
                      this.generatePixel(
                        thisRow,
                        pixelIndex,
                        pixelSize,
                        'enemy-boat',
                      );
                    }
                    break;
                }
              } else {
                this.generatePixel(thisRow, pixelIndex, pixelSize, 'river');
              }
            }
            break;
          }
        case pixelIndex >= rightGrassStart && pixelIndex < numberOfPixelsW:
          if (
            willRowContainForest == this.getRandomIntIncInc(0, 2) &&
            pixelIndex ==
              rightGrassStart +
                this.getRandomIntIncInc(0, numberOfPixelsW - rightGrassStart)
          ) {
            if (
              thisRow
                .prev()
                .find('#pixel' + pixelIndex)
                .is('grass-pixel')
            ) {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'forest');
            } else {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
            }
          } else if (
            willContaintMountain == this.getRandomIntIncInc(0, 8) &&
            pixelIndex ==
              rightGrassStart +
                this.getRandomIntIncInc(0, numberOfPixelsW - rightGrassStart)
          ) {
            if (
              thisRow
                .prev()
                .find('#pixel' + pixelIndex)
                .is('grass-pixel')
            ) {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'mountain');
            } else {
              this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
            }
          } else {
            this.generatePixel(thisRow, pixelIndex, pixelSize, 'grass');
          }
          break;
      }
    }
  }

  pickARow(
    typeOfRow: any,
    numberOfPixelsW: any,
    rowID: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
    willRiverHaveIsland?: any,
    riverMeander?: any,
  ) {
    switch (typeOfRow) {
      case 'start':
        this.philStartRow(numberOfPixelsW, rowID, pixelSize, 0, gameScreen);
        break;
      case 'bridge':
        this.philBridgeRow(numberOfPixelsW, rowID, pixelSize, 0, gameScreen);
        break;
      case 'sea':
        this.philSeaRow(numberOfPixelsW, rowID, pixelSize, 0, gameScreen);
        break;
      case 'regular':
        this.philRegularRow(
          numberOfPixelsW,
          rowID,
          pixelSize,
          playWidth,
          gameScreen,
          willRiverHaveIsland,
          riverMeander,
        );
        break;
    }
  }

  bossScreen(
    screenWidth: any,
    screenHeight: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
    willRiverHaveIsland: number,
    riverMeander: any,
  ) {
    var numberOfPixelsW = screenWidth / pixelSize,
      numberOfPixelsH = screenHeight / pixelSize,
      typeOfRow = '',
      willRiverHaveIsland = 0;

    for (let rowID = 0; rowID < numberOfPixelsH + 1; rowID++) {
      typeOfRow = 'sea';
      this.pickARow(
        typeOfRow,
        numberOfPixelsW,
        rowID,
        pixelSize,
        playWidth,
        gameScreen,
        willRiverHaveIsland,
        riverMeander,
      );
    }
  }

  philScreen(
    screenWidth: any,
    screenHeight: any,
    pixelSize: any,
    playWidth: any,
    gameScreen: any,
    willRiverHaveIsland: number,
    riverMeander: any,
  ) {
    var numberOfPixelsW = screenWidth / pixelSize,
      numberOfPixelsH = screenHeight / pixelSize,
      typeOfRow = '',
      willRiverHaveIsland = 0;

    for (let rowID = 0; rowID < numberOfPixelsH + 1; rowID++) {
      switch (rowID) {
        case 0:
          typeOfRow = 'start';
          this.pickARow(
            typeOfRow,
            numberOfPixelsW,
            rowID,
            pixelSize,
            0,
            gameScreen,
          );
          break;
        case 1:
          typeOfRow = 'start';
          this.pickARow(
            typeOfRow,
            numberOfPixelsW,
            rowID,
            pixelSize,
            0,
            gameScreen,
          );
          break;
        default:
          typeOfRow = 'regular';
          this.pickARow(
            typeOfRow,
            numberOfPixelsW,
            rowID,
            pixelSize,
            playWidth,
            gameScreen,
            willRiverHaveIsland,
            riverMeander,
          );
          break;
      }
    }
  }

  //SCROLL SCREEN
  scrollScreen(
    startMoment: any,
    gameSpeed: any,
    intervalNewTime: any,
    riverMeander: any,
    bridgeDestroyed: any,
  ) {
    var timeDiff = Math.floor((Date.now() - startMoment) / gameSpeed),
      numberOfPixelsW = this.screenWidth / this.pixelSize,
      numberOfPixelsH = this.screenHeight / this.pixelSize,
      rowID = intervalNewTime,
      typeOfRow = 'regular';

    if (bridgeDestroyed < 10) {
      var willRiverHaveIsland = this.getRandomIntIncInc(1, 4) < 4 ? '1' : '0';
      if (rowID % this.whenToChangePlayWidth == 0) {
        this.playWidth = this.getRandomIntIncInc(0, 2);
      }

      if (this.gameScore > 1 && this.gameScore % 2000 == 0) {
        typeOfRow = 'bridge';
        this.pickARow(
          typeOfRow,
          numberOfPixelsW,
          rowID,
          this.pixelSize,
          this.playWidth,
          this.gameScreen,
        );
        this.updategameScore();
      } else {
        typeOfRow = 'regular';
        this.pickARow(
          typeOfRow,
          numberOfPixelsW,
          rowID,
          this.pixelSize,
          this.playWidth,
          this.gameScreen,
          willRiverHaveIsland,
          riverMeander,
        );
      }
    } else {
      typeOfRow = 'sea';
      $('river-body').addClass('win-screen');
      this.setupBoss();
      this.pickARow(
        typeOfRow,
        numberOfPixelsW,
        rowID,
        this.pixelSize,
        this.playWidth,
        this.gameScreen,
      );
    }
  }

  sanitizeRowsAfterScroll() {
    $('screen-row').first().css('height', '0');

    setTimeout(function () {
      $('screen-row').first().remove();
    }, this.gameSpeed - 40);
  }

  scrollPlayer() {
    var playerPixel = $('player-pixel'),
      playerCurrentPixelID = playerPixel.parent().attr('id'),
      playerCurrentRow = playerPixel.parents('screen-row'),
      playerNextRow = playerCurrentRow.next(),
      playerNextPixel = playerNextRow.find('#' + playerCurrentPixelID);

    playerPixel.parent('river-pixel').addClass('plane-was-here');
    playerPixel.detach().appendTo(playerNextPixel);
  }

  //SETUP PLAYER
  setupPlayer() {
    var initialRow = $('#row1'),
      middlePixel = 15,
      initialPixel = initialRow.find('#pixel' + middlePixel);

    initialPixel.append(
      '<player-pixel style="width:' +
        this.pixelSize +
        'px;height:' +
        this.pixelSize +
        'px"><img src="https://notbigmuzzy.github.io/riveraid/graphics/airplane.svg"/></player-pixel>',
    );
  }

  showSelectScreen(gameScreen: any, screenState: any) {
    $('river-body').attr('data-screenchoose', 'yes');
    $('pilot-choose').remove();
    gameScreen.append(
      '<pilot-choose><session-title></session-title><pilot-chooser></pilot-chooser></pilot-choose>',
    );

    switch (screenState) {
      case 'win':
        $('session-title').append('<h1>CONGRATULATIONS! <br> YOU WIN!</h2>');
        $('pilot-choose').addClass('win-screen');
        $('pilot-chooser').append(
          "<div class='pilot-list'></div><br/><br/><a href='#' id='restart-game'>Play again?</a>",
        );
        $('pilot-chooser a').focus().addClass('focused');
        break;
      case 'start':
        $('session-title').append('<h1>River Rogue <br> Legacy Raid</h2>');
        $('pilot-choose').addClass('start-screen');
        $('pilot-chooser').append(
          "<div><a href='#' class='pick-a-pilot' data-pilotname='Bob' id='first-start'><img src='https://notbigmuzzy.github.io/riveraid/graphics/characters/Bob.svg'/><b>Bob</b><i>(New guy)</i></a></div>",
        );
        $('pilot-chooser a').focus().addClass('focused');
        break;
      case 'end':
        $('session-title').append('<h1>Choose your new pilot</h2>');
        $('pilot-choose').addClass('end-screen');
        var useMePilotNames = [];
        while (useMePilotNames.length < 3) {
          var r = Math.floor(Math.random() * $('river-body').listOfPilots.length);
          if (useMePilotNames.indexOf(r) === -1) useMePilotNames.push(r);
        }
        $('pilot-chooser').append(
          "<div class='pilot-list'></div><br/><span>OR</span><br/><a href='#' id='restart-game'>Restart Game</a>",
        );
        $(useMePilotNames).each(function (i: any, name: any) {
          var thisPilot = $('river-body').listOfPilots[name],
            thisPilotDescription = $('pilot-list').attr('data-' + thisPilot);
          $('.pilot-list').append(
            "<a href='#' class='pick-a-pilot' data-pilotname='" +
              thisPilot +
              "'><img src='https://notbigmuzzy.github.io/riveraid/graphics/characters/" +
              thisPilot +
              ".svg'/><b>" +
              thisPilot +
              '</b><i>(' +
              thisPilotDescription +
              ')</i>',
          );
        });
        $('pilot-chooser a').first().next().focus().addClass('focused');
        break;
    }
  }

  updateAndCheckFuelAmount() {
    var currentFuel = Number($('#fuel-bar').attr('value'));

    if (currentFuel < 1) {
      this.playSound('crash');
      this.gameEnded(this.interval);
    } else {
      currentFuel = currentFuel - $('#fuel-bar').fuelLeakSpeed;
      $('#fuel-bar').attr('value', currentFuel);
    }
  }

  //CONTROL PLAYER
  fire(bridgeDestroyed: any) {
    var numberOfFirePixelsPerShot = 2;

    if (bridgeDestroyed < 10) {
      if (this.storageLastPilot == 'Vinston') {
        numberOfFirePixelsPerShot = 3;
      } else if (this.storageLastPilot == 'Betty') {
        numberOfFirePixelsPerShot = 1;
      }
    }

    if ($('fire-pixel').length < numberOfFirePixelsPerShot) {
      var firePixel = $(
          '<fire-pixel id="' +
            Date.now() +
            '"><img src="https://notbigmuzzy.github.io/riveraid/graphics/fire.svg"/></fire-pixel>',
        ),
        playerPixel = $('player-pixel'),
        playerCurrentPixelID = playerPixel.parent().attr('id'),
        playerCurrentRow = playerPixel.parents('screen-row'),
        playerNextRow = playerCurrentRow.next(),
        playerNextPixel = playerNextRow.find('#' + playerCurrentPixelID);

      playerNextPixel.append(firePixel);
      this.playSound('shot');
    }
  }

  fireSpread() {
    var numberOfFirePixelsPerShot = 1;

    if ($('fire-pixel').length < numberOfFirePixelsPerShot) {
      var firePixel = $(
          '<fire-pixel id="' +
            Date.now() +
            '"><img src="https://notbigmuzzy.github.io/riveraid/graphics/fire.svg"/></fire-pixel>',
        ),
        playerPixel = $('player-pixel'),
        playerCurrentPixelID = playerPixel.parent().attr('id'),
        playerCurrentRow = playerPixel.parents('screen-row'),
        playerNextRow = playerCurrentRow.next(),
        playerNextPixel = playerNextRow.find('#' + playerCurrentPixelID);

      playerNextPixel.append(firePixel);
      firePixel.clone().appendTo(playerNextPixel.prev());
      firePixel.clone().appendTo(playerNextPixel.next());
      this.playSound('shot');
    }
  }

  scrollFire(bridgeDestroyed: any) {
    var firePixel = $('fire-pixel');

    firePixel.each(function () {
      var eachFirePixel = $(self),
        fireCurrentPixelID = eachFirePixel.parent().attr('id'),
        fireCurrentRow = eachFirePixel.parents('screen-row'),
        fireNextRow = fireCurrentRow.next(),
        fireNextPixel = fireNextRow.find('#' + fireCurrentPixelID),
        containingPixel = eachFirePixel.parent('river-pixel'),
        hitEnemy = eachFirePixel.parent('river-pixel').find('enemy-pixel');
      var hitFuel = eachFirePixel.parent('fuel-pixel');
      var hitBridge = eachFirePixel.parent('bridge-pixel');
      var shotLength = eachFirePixel.attr('data-shotlength');
      shotLength == undefined ? (shotLength = 0) : '';
      eachFirePixel
        .attr('data-shotlength', shotLength + 1)
        .detach()
        .appendTo(fireNextPixel);

      if (bridgeDestroyed < 10 && firePixel.storageLastPilot == 'Vinston') {
        if (shotLength > '111111') {
          eachFirePixel.remove();
        }
      }

      if (bridgeDestroyed < 10 && firePixel.storageLastPilot == 'Betty') {
        if (shotLength > '111111') {
          var thisFirePixel = $(self),
            fireThisPixelID = thisFirePixel.parent().attr('id'),
            fireThisRow = thisFirePixel.parents('screen-row'),
            fireThisNextRow = fireThisRow.next(),
            fireThisNextPixel = fireThisNextRow.find('#' + fireThisPixelID),
            fireThisPrevRow = fireThisRow.prev(),
            fireThisPrevPixel = fireThisPrevRow.find('#' + fireThisPixelID);

          thisFirePixel
            .parents('river-pixel')
            .addClass('explosion')
            .find('enemy-pixel')
            .addClass('zeds-dead');
          fireThisNextPixel
            .addClass('explosion')
            .find('enemy-pixel')
            .addClass('zeds-dead');
          fireThisNextPixel
            .prev()
            .addClass('explosion')
            .find('enemy-pixel')
            .addClass('zeds-dead');
          fireThisNextPixel
            .next()
            .addClass('explosion')
            .find('enemy-pixel')
            .addClass('zeds-dead');
          eachFirePixel.remove();
        }
      }

      if (hitEnemy.length || hitFuel.length || hitBridge.length) {
        if (
          !hitEnemy.hasClass('zeds-dead') &&
          !hitFuel.hasClass('zeds-dead') &&
          !hitBridge.hasClass('zeds-dead')
        ) {
          if (firePixel.storageLastPilot == 'Betty') {
            var thisFirePixel = $(self),
              fireThisPixelID = thisFirePixel.parent().attr('id'),
              fireThisRow = thisFirePixel.parents('screen-row'),
              fireThisNextRow = fireThisRow.next(),
              fireThisNextPixel = fireThisNextRow.find('#' + fireThisPixelID),
              fireThisPrevRow = fireThisRow.prev(),
              fireThisPrevPixel = fireThisPrevRow.find('#' + fireThisPixelID);
            thisFirePixel
              .parents('river-pixel')
              .addClass('explosion')
              .find('enemy-pixel')
              .addClass('zeds-dead');
            fireThisNextPixel
              .addClass('explosion')
              .find('enemy-pixel')
              .addClass('zeds-dead');
            fireThisNextPixel
              .prev()
              .addClass('explosion')
              .find('enemy-pixel')
              .addClass('zeds-dead');
            fireThisNextPixel
              .next()
              .addClass('explosion')
              .find('enemy-pixel')
              .addClass('zeds-dead');
            eachFirePixel.remove();
          }
          eachFirePixel.remove();
        }

        if (hitBridge.length && !hitBridge.hasClass('zeds-dead')) {
          hitBridge.addClass('zeds-dead');
          hitBridge
            .parent('screen-row')
            .find('bridge-pixel')
            .addClass('zeds-dead');
          $(document).updateBridgeScore();
          $(document).playSound('destroy');
        }

        if (hitFuel.length && !hitFuel.hasClass('zeds-dead')) {
          hitFuel.addClass('zeds-dead');
         $(document).updategameScore();
         $(document).playSound('destroy');
        }

        if (hitEnemy.length && !hitEnemy.hasClass('zeds-dead')) {
          hitEnemy.addClass('zeds-dead');
        $(document).updategameScore();
        $(document).playSound('destroy');
        }
      } else if (!fireNextRow.length || !containingPixel.length) {
        eachFirePixel.remove();
      }
    });
  }

  stearLeft(controlledPixel: any) {
    var controlledCurrentPixelID = controlledPixel.parent().attr('id'),
      controlledCurrentIDNum = controlledCurrentPixelID.substring(5),
      controlledCurrentRow = controlledPixel.parents('screen-row'),
      controlledNextPixel = controlledCurrentRow.find(
        '#pixel' + (Number(controlledCurrentIDNum) - 1),
      );

    if (controlledNextPixel.length) {
      controlledPixel.detach().appendTo(controlledNextPixel);
    }

    this.playerCrashCheck(this.interval);
  }

  stearRight(controlledPixel: any) {
    var controlledCurrentPixelID = controlledPixel.parent().attr('id'),
      controlledCurrentIDNum = controlledCurrentPixelID.substring(5),
      controlledCurrentRow = controlledPixel.parents('screen-row'),
      controlledNextPixel = controlledCurrentRow.find(
        '#pixel' + (Number(controlledCurrentIDNum) + 1),
      );

    if (controlledNextPixel.length) {
      controlledPixel.detach().appendTo(controlledNextPixel);
    }

    this.playerCrashCheck(this.interval);
  }

  controlPlayerPixel(eventCode: any) {
    var isStarted = this.$body.attr('data-gamestarted'),
      isEnded = this.$body.attr('data-gameended');

    switch (eventCode) {
      case 32: //SPACEBAR
        this.playSound('theme');
        var bridgeDestroyed = localStorage.getItem('BRIDGE');
        if (
          Number(bridgeDestroyed) < 10 &&
          this.storageLastPilot == 'Vinston'
        ) {
          this.fireSpread();
          break;
        } else {
          this.fire(bridgeDestroyed);
          break;
        }
      case 37: // LEFT ARROW
        if (isStarted == 'yes' && isEnded == 'no') {
          var playerPixel = $('player-pixel');
          if (this.storageLastPilot == 'Alexei') {
            this.stearRight(playerPixel);
          } else {
            this.stearLeft(playerPixel);
          }
        }
        if (
          isStarted == 'yes' &&
          isEnded == 'yes' &&
          $('river-body').attr('data-screenchoose') == 'yes'
        ) {
          if ($('.pick-a-pilot.focused').prev().length) {
            $('.pick-a-pilot.focused')
              .removeClass('focused')
              .prev()
              .addClass('focused')
              .focus();
          }
        }
        break;
      case 39: // RIGHT ARROW
        if (isStarted == 'yes' && isEnded == 'no') {
          var playerPixel = $('player-pixel');
          if (this.storageLastPilot == 'Alexei') {
            this.stearLeft(playerPixel);
          } else {
            this.stearRight(playerPixel);
          }
        }
        if (
          isStarted == 'yes' &&
          isEnded == 'yes' &&
          $('river-body').attr('data-screenchoose') == 'yes'
        ) {
          if ($('.pick-a-pilot.focused').next().length) {
            $('.pick-a-pilot.focused')
              .removeClass('focused')
              .next()
              .addClass('focused')
              .focus();
          }
        }
        break;
    }
  }

  //ENEMY AI
  moveChoppers() {
    var choppers = $('.chopper').not('.zeds-dead');

    choppers.each(function () {
      var thisChopper = $(document),
        thisChopperDirection = thisChopper.data('direction'),
        thisCurrentPixelID = thisChopper.parent().attr('id'),
        thisCurrentIDNum = thisCurrentPixelID.substring(5);
      var thisCurrentRow = thisChopper.parents('screen-row');
      var thisLeftPixel = thisCurrentRow.find(
        '#pixel' + (Number(thisCurrentIDNum) - 1),
      );
      var thisRightPixel = thisCurrentRow.find(
        '#pixel' + (Number(thisCurrentIDNum) + 1),
      );
      var clearToGoLeft =
        thisLeftPixel.is('river-pixel') &&
        thisLeftPixel.find('enemy-pixel').not('.zeds-dead').length == 0;
      var clearToGoRight =
        thisRightPixel.is('river-pixel') &&
        thisRightPixel.find('enemy-pixel').not('.zeds-dead').length == 0;

      switch (thisChopperDirection) {
        case '0-direction':
          if (clearToGoLeft) {
            thisChopper.css('transform', 'scaleX(-1)');
            $(document).stearLeft(thisChopper);
            break;
          } else {
            thisChopper.css('transform', 'scaleX(1)');
            $(document).stearRight(thisChopper);
            thisChopper.data('direction', '1-direction');
            break;
          }
        case '1-direction':
          if (clearToGoRight) {
            thisChopper.css('transform', 'scaleX(1)');
            $(document).stearRight(thisChopper);
            break;
          } else {
            thisChopper.css('transform', 'scaleX(-1)');
            $(document).stearLeft(thisChopper);
            thisChopper.data('direction', '0-direction');
            break;
          }
      }
    });
  }

  moveBaloon() {
    var baloons = $('.baloon').not('.zeds-dead');

    baloons.each(function () {
      var thisBaloon = $('.baloon'),
        thisBaloonDirection = thisBaloon.data('direction'),
        thisBaloonShouldMove = thisBaloon.data('move'),
        thisCurrentPixelID = thisBaloon.parent().attr('id'),
        thisCurrentIDNum = thisCurrentPixelID.substring(5);
      var thisCurrentRow = thisBaloon.parents('screen-row'),
         thisLeftPixel = thisCurrentRow.find(
          '#pixel' + (Number(thisCurrentIDNum) - 1),
        );
        var thisRightPixel = thisCurrentRow.find(
          '#pixel' + (Number(thisCurrentIDNum) + 1),
        );
        var clearToGoLeft =
          thisLeftPixel.is('river-pixel') &&
          thisLeftPixel.find('enemy-pixel').not('.zeds-dead').length == 0;
        var clearToGoRight =
          thisRightPixel.is('river-pixel') &&
          thisRightPixel.find('enemy-pixel').not('.zeds-dead').length == 0;

      switch ( $('.baloon').thisBaloonDirection) {
        case '0-direction':
          if (thisBaloonShouldMove == 'no') {
            thisBaloon.data('move', 'yes');
          } else {
            if (clearToGoLeft) {
                $(document).stearLeft(thisBaloon);
              thisBaloon.data('move', 'no');
              break;
            } else {
                $(document).stearRight(thisBaloon);
              thisBaloon.data('direction', '1-direction');
              thisBaloon.data('move', 'no');
              break;
            }
          }
        case '1-direction':
          if (thisBaloonShouldMove == 'no') {
            thisBaloon.data('move', 'yes');
          } else {
            if (clearToGoRight) {
              $(document).stearRight(thisBaloon);
              thisBaloon.data('move', 'no');
              break;
            } else {
              $(document).stearLeft(thisBaloon);
              thisBaloon.data('direction', '0-direction');
              thisBaloon.data('move', 'no');
              break;
            }
          }
      }
    });
  }

  //COLLISION DETECTION
  playerCrashCheck(interval: any) {
    var playerPixel = $('player-pixel'),
      containingPixel = playerPixel.parent();
    var containingPixelHasEnemy = containingPixel
      .find('enemy-pixel')
      .not('.zeds-dead');

    if (
      containingPixel.is('fuel-pixel') &&
      !containingPixel.hasClass('zeds-dead')
    ) {
      var thisFuel = Number($('#fuel-bar').attr('value'));
      $('player-pixel').playSound('fuel');
      thisFuel = 125;
      $('#fuel-bar').attr('value', thisFuel);
    } else if (
      containingPixel.hasClass('zeds-dead') ||
      containingPixel.length == 0
    ) {
      return;
    } else if (
      !containingPixel.is('river-pixel') ||
      containingPixelHasEnemy.length
    ) {
        $('player-pixel').playSound('crash');
        $('player-pixel').gameEnded(interval);
    }
  }

  //BOSS LOGIC
  setupBoss() {
    if (!$('enemy-pixel.boss').length && !$('grass-pixel').length) {
      var initialRow = $('game-screen').find('screen-row').eq(-3),
        middlePosition = 15,
        middlePixel = initialRow.find('#pixel' + middlePosition),
        leftPixel = initialRow.find('#pixel' + Math.floor(middlePosition / 2)),
        rightPixel = initialRow.find(
          '#pixel' + Math.floor(middlePosition * 1.5),
        );

      middlePixel.append(
        '<enemy-pixel class="boss middle turret"><img src="https://notbigmuzzy.github.io/riveraid/graphics/turret.svg" /><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev></enemy-pixel>',
      );
      leftPixel.append(
        '<enemy-pixel class="boss left turret"><img src="https://notbigmuzzy.github.io/riveraid/graphics/turret.svg" /><i></i><i></i><i></i><i></i><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev></enemy-pixel>',
      );
      rightPixel.append(
        '<enemy-pixel class="boss right turret"><img src="https://notbigmuzzy.github.io/riveraid/graphics/turret.svg" /><i></i><i></i><i></i><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev><i-prev></i-prev></enemy-pixel>',
      );
    }
  }

  scrollBoss() {
    var bossPixel = $('enemy-pixel.boss'),
      moveLeftOrRight = this.getRandomIntIncInc(-1, 1),
      leftBossID = Number(
        $('enemy-pixel.boss').first().parent().attr('id').slice(5),
      ),
      rightBossID = Number(
        $('enemy-pixel.boss').last().parent().attr('id').slice(5),
      );

    if (leftBossID - moveLeftOrRight < 1) {
      moveLeftOrRight = 3;
    }

    if (rightBossID + moveLeftOrRight > 31) {
      moveLeftOrRight = -3;
    }

    bossPixel.each(function () {
      var thisBossPixel = $('enemy-pixel.boss'),
        bossCurrentRow = thisBossPixel.parents('screen-row'),
        bossNextRow = bossCurrentRow.next(),
        bossCurrentPixelID = thisBossPixel.parent().attr('id'),
        nextPixelIDNnumber =
          Number(bossCurrentPixelID.slice(5)) + moveLeftOrRight,
        bossNextPixel = bossNextRow.find('#pixel' + nextPixelIDNnumber);

      thisBossPixel.detach().appendTo(bossNextPixel);
    });
  }

  bossFire() {
    var bossPixels = $('enemy-pixel.boss:not(".zeds-dead")');

    bossPixels.each(function () {
      if (bossPixels.getRandomIntIncInc(1, 3) == 2) {
        var firePixel = $(
            '<enemy-pixel class="mine" id="' +
              Date.now() +
              '"><img src="https://notbigmuzzy.github.io/riveraid/graphics/mine.svg"/></enemy-pixel>',
          ),
          thisBossPixels = $(self),
          bossCurrentPixelID = thisBossPixels.parent().attr('id'),
          bossCurrentRow = thisBossPixels.parents('screen-row'),
          bossNextRow = bossCurrentRow.prev(),
          bossNextPixel = bossNextRow.find('#' + bossCurrentPixelID);

        bossNextPixel.append(firePixel);
      }
    });
  }

  //GAME SCORE
  updategameScore() {
    var scoreForThisPilot = 100;

    if (
      this.storageLastPilot == 'Betty' ||
      this.storageLastPilot == 'Speedking'
    ) {
      scoreForThisPilot = 200;
    }

    this.gameScore = this.gameScore + scoreForThisPilot;
    $('#score-label').html(this.gameScore);
    return this.gameScore;
  }

  updateBridgeScore() {
    var bridgeScore = Number(localStorage.getItem('BRIDGE')) +1;
    localStorage.setItem('BRIDGE', bridgeScore.toString());
    $('#bridge-label').html(bridgeScore);
  }

  //GAMEND
  gameEnded(interval: any) {
    localStorage.setItem('RUN', (Number(this.storageCurrentRun) + 1).toString());
    clearInterval(interval);
    interval = null;
    this.$body.attr('data-gameended', 'yes');
    this.showSelectScreen(this.gameScreen, 'end');
  }

  //GAMEWIN
  winGame() {
    clearInterval(Number(this.interval));
    this.interval = null;
    this.$body.attr('data-gameended', 'yes');
    localStorage.setItem('WON', 'yes');
    this.showSelectScreen(this.gameScreen, 'win');
  }

  //HELPER FUNCT
  getRandomIntIncInc(min: any, max: any) {
    //MIN and MAX inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomIntIncExc(min: any, max: any) {
    //MIN inclusive and MAX exclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  setplayWidth(pixelSize: any, playWidth: any) {
    var from = 0,
      to = 0;

    switch (playWidth) {
      case 0:
        from = Math.floor(pixelSize / 1.3);
        to = from + 1;
        break;
      case 1:
        from = Math.ceil(pixelSize / 1.8);
        to = from + 2;
        break;
      case 2:
        from = Math.ceil(pixelSize / 5);
        to = from + 4;
        break;
      default:
        from = Math.ceil(pixelSize / 1.8);
        to = from + 2;
        break;
    }

    return { from, to };
  }

  initTimingStuff(gameSpeed: any, started?: any) {
    var startMoment = Date.now();

    var interval = setInterval(function () {
      let intervalNewTime = Date.now(),
        riverMeander = $(document).$body.attr('data-meander'),
        bridgeDestroyed = localStorage.getItem('BRIDGE');

      //SCROLL SCREEN
      $(document).scrollScreen(
        startMoment,
        gameSpeed,
        intervalNewTime,
        riverMeander,
        bridgeDestroyed,
      );
      $(document).sanitizeRowsAfterScroll();
      $(document).updateAndCheckFuelAmount();
      //ENEMY AI
      $(document).moveChoppers();
      $(document).moveBaloon();
      if ($(document).storageLastPilot == 'Betty') {
        $(document).moveBaloon();
      } else if ($(document).storageLastPilot == 'Vinston') {
        $(document).moveChoppers();
        $(document).moveBaloon();
      }
      // //SCROLL PLAYER
      $(document).scrollPlayer();
      $(document).playerCrashCheck(interval);
      //SCROLL FIRE
      if ($(document).storageLastPilot == 'Betty') {
        $(document).scrollFire(bridgeDestroyed);
        $(document).scrollFire(bridgeDestroyed);
      } else {
        $(document).scrollFire(bridgeDestroyed);
        $(document).scrollFire(bridgeDestroyed);
        $(document).scrollFire(bridgeDestroyed);
      }
      //SCROLL-CHECK BOSS
      if ($(document).bridgeDestroyed > 9 && $('enemy-pixel.boss').length) {
       $(document).bossFire();
        $('enemy-pixel.boss').not('.zeds-dead').length
          ? $(document).scrollBoss()
          : $(document).winGame();
      }
    }, gameSpeed);
  }

  //SOUNDS
  playSound(sound: any) {
    var whichSound = 'snd-' + sound;
    var playerID = document.getElementById(whichSound);
    $(document).play();
  }
}
