import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

declare var $: any;

@Component({
  selector: 'app-con-hector',
  imports: [ButtonModule],
  template: `
    <div id="my-body">
      <!-- <div id="my-toolbar">
        <p-button (click)="themeClickEvent($event)" id="my-theme"
          >Light Off</p-button
        ><p-button
          class="toggleCreateLevel"
          (click)="toggleCreateLevelEvent($event)"
        >
          Create Level</p-button
        >
        <span class="link"
          >Inspired by
          <a href="http://loopgame.co/" target="_blank">loopgame.co</a></span
        >
      </div> -->

      <div
        class="level1"
        data-code="1231243"
        data-set="e1.b.c2.c3.c1.s2.c4.e2"
        data-text="Rotation Game <br><span>Click a block to complete the pipe.</span>"
      ></div>
      <div
        class="level2"
        data-code="2323114311231414"
        data-set="c1.c2.c4.c1.s2.c3.c1.e1.s1.e2.c1.c3.c4.c1.c2.c3"
      ></div>
      <div
        class="level3"
        data-code="42232324114122322243"
        data-set="e2.s1.s2.c2.c2.c1.c1.c1.s2.c2.c2.b.c2.s2.s2.c1.c1.s1.s1.c1.e2.b.b.b"
      ></div>
      <div
        class="level4"
        data-code="2222423124111111414"
        data-set="b.c1.s1.e1.c1.c1.c1.c2.s2.c2.c2.s2.s2.s1.e2.s1.c2.c1.c2.c2"
      ></div>
      <div
        class="level5"
        data-code="222314311113443"
        data-set="c2.s1.s2.c1.s2.e1.c1.s1.s1.b.s2.s2.e1.e1.c1.e1"
        data-text="Multiple pipes."
      ></div>
      <div
        class="level6"
        data-code="112413123111111414"
        data-set="b.e1.e2.b.c2.c1.c1.c1.s1.c1.c1.s2.s1.s2.s2.s1.c2.c1.c1.c2"
      ></div>
      <div
        class="level7"
        data-code="2323141423231414"
        data-set="c4.c1.c3.c1.c2.c3.c4.c1.c2.c1.c3.c2.c1.c1.c2.c1"
        data-text="Circles."
      ></div>
      <div
        class="level8"
        data-code="222312242211314311143"
        data-set="c4.s1.s1.c1.c2.s2.s2.c1.b.c2.e3.e4.b.c2.c1.s2.e3.c2.s2.s1.b.c1.c2.e1"
      ></div>
      <div
        class="level9"
        data-code="222244312241123132414"
        data-set="b.c1.s1.e2.c2.c2.e1.c2.s1.c2.s2.c1.s1.c1.s1.c2.c1.c2.c2.c2.b.c2.c1.b"
      ></div>
      <div
        class="level10"
        data-code="122311241413422423311231223"
        data-set="e1.c2.s1.c4.s1.s2.c1.c3.c1.c3.c2.c4.e2.e4.c3.c2.c4.c2.e4.b.s1.c3.s2.c4.c1.s1.e2.e3"
      ></div>
      <div
        class="level11"
        data-code="432224131431121122331222"
        data-set="e1.c2.c1.e1.c1.c1.c1.c1.s1.e1.c2.s1.c1.e2.s2.s2.c1.e1.e1.e1.c2.s1.s2.e1"
      ></div>
      <div
        class="level12"
        data-code="42232224122311113441222"
        data-set="e2.s1.s2.c1.c2.s2.s1.c2.s2.c1.s2.c2.s1.s2.b.s2.s2.e2.e2.c1.c1.s2.s2.e1"
      ></div>
      <div
        class="level13"
        data-code="2221223144422231241424"
        data-set="c1.s1.e1.b.s2.c1.s2.c1.c1.c1.e2.c2.c1.e2.c1.c2.c2.s2.c2.s2.b.e1.s2.c1"
      ></div>
      <div
        class="level14"
        data-code="1231141442314314442333"
        data-set="e1.c2.c1.e2.c1.c2.c2.c2.e1.s2.c2.e1.e1.c1.c2.c1.e1.c2.c2.c2.b.b.e1.e2"
      ></div>
      <div
        class="level15"
        data-code="1223113112434323111111411224"
        data-set="e1.c2.s1.c2.s2.c1.c1.s2.c2.s2.c1.e1.e1.c1.c2.c1.e1.s1.s2.s2.s1.c1.c1.s2.c1.s2.s2.c1"
      ></div>
      <div
        class="level16"
        data-code="422122243123241112414224"
        data-set="e2.s1.e2.e1.c1.s1.s1.c2.e2.e2.c2.c1.c1.c2.s1.s2.c1.s1.c1.s2.e1.s1.s2.c1"
      ></div>

      <!-- <div id="win">
        <div class="text">Level <span>1</span> Complete</div>
      </div>
      <div id="finished"><div class="text">Game Completed!</div></div> -->

      <div id="createLevel">
        <div class="newLevel"></div>
        <div class="stats"></div>
        <div class="tools">
          <img
            (click)="imgClickEvent($event)"
            src="https://db.tt/k4C8HDzW"
            alt=""
            class="curve"
          />
          <img
            (click)="imgClickEvent($event)"
            src="https://db.tt/q7awJWNW"
            alt=""
            class="straight"
          />
          <img
            (click)="imgClickEvent($event)"
            src="https://db.tt/gBByua2j"
            alt=""
            class="end"
          />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt=""
            class="bnone"
          />
        </div>
      </div>
    </div>
  `,
  styleUrl: 'con-hector.component.scss',
})
export class ConHectorComponent implements OnInit {
  stage: number = 1;
  active: number = 1;
  levelCount: number = $('div[class^=level]').length;
  createLevelState: number = 0;

  ngOnInit() {
    this.setTheme();
    this.createLevels();
    this.showLevels();
    $('#my-body').on('click', '.block', () => {
      var x = $('#my-body').attr('class').replace(/\D+/g, '');
      if (this.active && x) {
        $('#my-body').removeClass('r' + x);
        x++;
        if ($('#my-body').hasClass('straight')) {
          if (x == 3) x = 1;
        } else if (x == 5) {
          x = 1;
        }
        $('#my-body').addClass('r' + x);
        if (!this.createLevelState) {
          this.combination();
        } else {
          this.levelStats();
        }
      }
    });
  }

  toggleCreateLevelEvent(event: Event): void {
    $('#createLevel .newLevel').empty();
    $('#createLevel').fadeToggle();
    if (!this.createLevelState) {
      this.createLevelState = 1;
    } else {
      this.createLevelState = 0;
    }
  }

  themeClickEvent(event: Event): void {
    $('#my-body').toggleClass('light');
    if ($('#my-body').attr('class') == 'light') {
      $('#my-theme').text('Lights Off');
    } else {
      $('#my-theme').text('Lights On');
    }
    localStorage.setItem('my-theme', $('#my-body').attr('class'));
  }

  bodyClickEvent(event: Event): void {
    var x = $('#my-body').attr('class').replace(/\D+/g, '');
    if (this.active && x) {
      $('#my-body').removeClass('r' + x);
      x++;
      if ($('#my-body').hasClass('straight')) {
        if (x == 3) x = 1;
      } else if (x == 5) {
        x = 1;
      }
      $('#my-body').addClass('r' + x);
      if (!this.createLevelState) {
        this.combination();
      } else {
        this.levelStats();
      }
    }
  }

  imgClickEvent(event: Event): void {
    var x = $('#my-body').attr('class');
    $('.newLevel').append('<div class="block ' + x + ' r1"></div>');
  }

  combination() {
    var x = $('.level' + this.stage).find('.block'),
      h = '';
    $.each(x, (i: any, el: any) => {
      h += $(el).attr('class').replace(/\D+/g, '');
    });
    console.info(h);
    if ($('.level' + this.stage).data('code') == h) {
      this.stage++;
      this.active = 0;
      setTimeout(() => {
        this.showLevels();
      }, 500);
    }
  }

  showLevels() {
    var remove = this.stage - 1;
    $('#win .text span').text(remove);
    if (this.stage > this.levelCount) {
      $('#finished').fadeIn();
    } else if (this.stage > 1) {
      $('#win').fadeIn();
      setTimeout(() => {
        $('.level' + remove).remove();
        $('div.level' + this.stage).show();
        $('#win').fadeOut();
        this.active = 1;
      }, 2000);
    } else {
      $('div.level' + this.stage).fadeIn();
    }
  }

  createLevels() {
    $.each($('div[data-set]'), (i: any, el: any) => {
      var levelHtml = '';
      var set = $(el).data('set').split('.');
      $.each(set, (i: any, el: any) => {
        var style = 'curve';
        if (set[i][0] == 's') style = 'straight';
        if (set[i][0] == 'e') style = 'end';
        if (set[i][0] == 'b') style = '';
        var rotate = '';
        if (set[i][1]) var rotate = 'r' + set[i][1];
        var double = '';
        if (set[i][2]) var double = 'double';
        levelHtml +=
          '<div class="block ' +
          style +
          ' ' +
          double +
          ' ' +
          rotate +
          '"></div>';
      });
      var text = $(el).data('text');
      if (text) levelHtml += '<div class="text">' + text + '</span></div>';
      $(el).append(levelHtml);
    });
  }

  setTheme() {
    if (localStorage['my-theme'] == 'light') {
      $('#my-body').addClass('light');
      $('#my-theme').text('Lights Off');
    }
  }

  levelStats() {
    var code = '',
      set = '';
    $.each($('.newLevel .block'), (i: any, el: any) => {
      var s = $(el).attr('class').split(' ')[1][0];
      if (s != 'b') code += $(el).attr('class').replace(/\D+/g, '');
      var r = (Math.floor(Math.random() * 2) + 1).toString();
      if (s != 's') Math.floor(Math.random() * 4) + 1;
      if (s == 'b') r = '';
      set += s + r + '.';
    });
    set = set.slice(0, -1);
    $('.stats').html('code: ' + code + ' - Set: ' + set);
  }
}
