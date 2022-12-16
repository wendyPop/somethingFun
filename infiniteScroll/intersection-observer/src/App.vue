<template>
  <div id="app">
    <div class="photos">
      <div v-for="photo in photos" :key="photo.id" class="photo">
        <div class="photo__title">{{ photo.title }}</div>
        <div :style="`background-image: url(${photo.url});`"
             ref="imageListObserver"
             :class="{ loaded: photo.imageLoaded }"
             class="photo__image">
        </div>
      </div>
    </div>
    <div id="scroll-observer" v-if="showScrollObserver" ref="scrollObserver">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
// For IE
import 'intersection-observer'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      photos: [],
      length: 4,
      showScrollObserver: true
    }
  },
  created () {
    this.fetchPhotos(1, this.length)
        .then(() => {
          this.initIntersectionObserver()
        })
    // For next photo
    this.increasePhotoLength()
  },
  methods: {
    /**
     * @summary 사진을 가져옵니다.
     * @param {number} start - 가져올 사진의 시작 포인트
     * @param {number} limit - 가져올 사진의 개수
     * @return {Promise} - 비동기 실행을 위한 Promise 객체
     */
    fetchPhotos(start = 1, limit = 1) {
      return new Promise(resolve => {
        const photosToFetch = []
        for (let i = start; i < start + limit; i += 1) {
          photosToFetch.push(
              axios(`https://jsonplaceholder.typicode.com/photos/${i}`)
          )
        }

        Promise.all(photosToFetch)
            .then(photos => {
              return photos.map(photo => {
                return {
                  ...photo.data,
                  imageLoaded: false
                }
              })
            })
            .then(photos => {
              this.photos.push(...photos)
              this.photos.forEach(photo => {
                // 사진 로드를 대기
                const image = new Image()
                image.src = photo.url
                image.onload = () => {
                  photo.imageLoaded = true
                }
              })
              resolve(true)
            })
      })
    },
    /**
     * @summary Intersection Observer 를 초기화합니다.
     */
    initIntersectionObserver() {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.fetchPhotos(this.length)
            // For next photo
            this.increasePhotoLength()
          }
        })
      }, {
        // rootMargin: '0px 0px 400px 0px'
      })
      io.observe(this.$refs.scrollObserver)
    },
    /**
     * @summary 가져올 사진의 시작 포인트를 증가시킵니다.
     */
    increasePhotoLength() {
      this.length += 1
      console.log(this)
      console.log(this.length)
    }
  }
}
</script>

<style lang="scss">
  .photos {
    padding: 30px;
    .photo {
      margin-bottom: 40px;
      &__title {
       font-size: 18px;
       font-weight: 700;
       margin-bottom: 10px;
       color: #444;
       line-height: 1.4;
     }
      &__image {
         width: 100%;
         height: 250px;
         border-radius: 10px;
         overflow: hidden;
         background-position: center;
         background-repeat: no-repeat;
         background-size: cover;
         &.loaded {
           animation: jello 1s;
         }
      }
    }
  }

  #scroll-observer {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // For Vue
   [v-cloak] {
     display: none;
   }

  // Loader
   .lds-ring {
     display: inline-block;
     position: relative;
     width: 64px;
     height: 64px;
   }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #F86C06 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
