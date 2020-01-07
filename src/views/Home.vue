<template>
  <div class="music">
    <header>
      <div class="title">
        {{ musical[musicalKey].name }}
        <p class="name">Text</p>
      </div>
    </header>
    <div class="photo">
      <img :src="musical[musicalKey].cover" />
    </div>
    <div class="play">Now Playing</div>
    <div class="cover">
      <div class="cover-left">
        <img :src="musical[musicalKey].small" />
      </div>
      <div class="cover-right">
        {{ musical[musicalKey].name }}
        <p class="cover-name">{{ musical[musicalKey].author }}</p>
        <p class="time">2013 - 60 Track (9:36:47)</p>
      </div>
    </div>
    <div class="music-volume">
      <span class="iconfont icon-volume"></span>
      <span class="music-title">{{ musical[musicalKey].name }}</span>
    </div>
    <footer>
      <div class="play-btn">
        <span class="iconfont icon-cycle"></span>
        <span
          :class="['iconfont icon-previous', musicalKey === 0 && 'readonly']"
          @click="getPrevious(-1)"></span>
        <span
          :class="['iconfont', playType ? 'icon-stop' : 'icon-player']"
          @click="getClick()"></span>
        <span
          :class="['iconfont icon-next', musicalKey === musical.length - 1 && 'readonly']" 
          @click="getPrevious(1)"></span>
        <span class="iconfont icon-random"></span>
      </div>
      <div class="schedule">
        <div class="schedule-left">
          {{ player.currentTime | filtersTextChange }}
        </div>
        <van-progress :percentage="player.duration ? parseInt(player.currentTime / player.duration * 100) : 0" />
        <div class="schedule-right">
          {{ player.duration | filtersTextChange }}
        </div>
      </div>
      <audio id="myAudio"></audio>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { getTimeStr } from "@/units/times";

export default {
  data() {
    return {
      playType: false, // 播放状态
      player: {
        duration: 0,
        currentTime: 0
      },
      musical: [
        {
          src: require('../assets/music/dancing.mp3'),
          name: 'dancing',
          author: 'mellow fellow',
          cover: require('../assets/images/cover.png'),
          small: require('../assets/images/come.png')
        },
        {
          src: require('../assets/music/imagine.mp3'),
          name: '想象之中',
          author: '许嵩',
          cover: require('../assets/images/tim.png'),
          small: require('../assets/images/time.png')
        },
        {
          src: require('../assets/music/why.mp3'),
          name: '有何不可',
          author: '许嵩',
          cover: require('../assets/images/timg.png'),
          small: require('../assets/images/timge.png')
        }
      ],
      musicalKey: 0,
      sound: null,
    }
  },
  filters: {
    filtersTextChange(dataStr) {
      let time = dataStr;
      if(dataStr) {
        time = dataStr >= 60 ? `${parseInt(dataStr / 60, 10)}:${getTimeStr(dataStr % 60)}` : `0:${getTimeStr(dataStr)}`; 
      } else {
        time = "0:00"
      }
      return time;
    }
  },
  mounted() {
    this.sound = document.getElementById("myAudio"); 
  },
  methods: {
    getClick() {
      this.playType = !this.playType;
      const { sound, soundTime, musical, musicalKey } = this;
      sound.src = musical[musicalKey].src;
      if(this.playType) {
        sound.play();
      } else {
        sound.pause();
      } 
      sound.addEventListener("loadeddata", () => {
        setInterval(() => {
          this.player.currentTime = parseInt(sound.currentTime);
        }, 1000);
        this.player.duration = parseInt(sound.duration);
      }, false);
    },
    getPrevious(num) {
      const { musicalKey, musical } = this;
      if((musicalKey + num >= 0) && (musicalKey + num <= musical.length - 1)) {
        this.playType = false;
        this.musicalKey = num + musicalKey;
        this.getClick();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .music {
    text-align: center;
    min-height: 100%;
    background-color: #ecedee;
    header {
      background-color: rgba(61,185,241,0.8);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      height: 70px;
      .title {
        font-size: 16px;
        color: #ffffff;
        padding-top: 19px;
        letter-spacing: 2px;
        .name {
          font-size: 14px;
          letter-spacing: 1px;
          padding-bottom: 12px;
        }
      }
    }
    .photo {
      img {
        width: 100%;
        display: block;
      }
    }
    .play {
      background-color: #99abb1;
      font-size: 13px;
      letter-spacing: 1px;
      color: #ffffff;
      padding-top: 7px;
      padding-bottom: 4px;
      text-align: left;
      padding-left: 16px;
    }
    .cover {
      overflow: hidden;
      background-color: #edf0f1;
      padding-top: 10px;
      padding-left: 11px;
      padding-bottom: 6px;
      .cover-left {
        float: left;
        margin-right: 12px;
        width: 62px;
        height: 60px;
        img {
          width: 100%;
        }
      }
      .cover-right {
        float: left;
        text-align: left;
        padding-top: 3px;
        font-size: 13px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #323232;
        .cover-name {
          color: #979797;
          padding-top: 2px;
        }
        .time {
          color: #979797;
          padding-top: 2px;
        }
      }
    }
    .music-volume {
      background-color: #ffffff;
      padding-top: 20px;
      padding-left: 15px;
      padding-bottom: 19px;
      text-align: left;
      .icon-volume {
        color: #62daef;
        margin-right: 10px;
        font-size: 18px;
      }
      .music-title {
        font-size: 13px;
        letter-spacing: 1px;
        color: #323232;
        font-weight: bold;
      }
    }
    footer {
      padding-top: 14px;
      .play-btn {
        padding-bottom: 24px;
        .iconfont {
          font-size: 30px;
          width: 20%;
          display: inline-block;
          color: #333333;
        }
        .icon-player, .icon-stop {
          font-size: 40px;
        }
        .readonly {
          color: #999999;
        }
      }
      .schedule {
        padding-left: 58px;
        padding-right: 58px;
        position: relative;
        height: 18px;
        overflow: hidden;
        .van-progress {
          margin-top: 5px;
        }
        .schedule-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 58px;
          font-size: 13px;
          color: #323232;
        }
        .schedule-right {
          position: absolute;
          right: 0;
          top: 0;
          width: 58px;
          font-size: 13px;
          color: #323232;
        }
      }
    }
  }
</style>
