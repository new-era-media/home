<template>
  <div id="app" class="catalog">
    <ul class="catalog__list">
      <li v-for="(home,i) in allPosts" :key="home.id" @click="like(i)">
        <div class="like" :class="{likeActive: home.like}">&#10084;</div>

        <img
          src="https://i.pinimg.com/originals/7e/88/14/7e8814a051cfdef3f0b14d0236530367.jpg"
          width="300px"
          height="200px"
          alt
        />

        <h2>{{home.attributes.title}}</h2>
        <p>Адрес - ул.{{home.attributes.address.street}} дом-{{home.attributes.address.house}} кв-{{home.attributes.address.room}}</p>
        <p>Площадь - {{home.attributes.area}} {{home.attributes.unit}}</p>

        <p>Риелтор {{home.relationships.attributes.first_name}} {{home.relationships.attributes.last_name}} {{home.relationships.attributes.middle_name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchHome"]),
    ...mapMutations(["addLike"]),
    like(i) {
      if (this.allPosts[i].like) {
        this.addLike({
          id: i,
          value: false,
        });
      } else {
        this.addLike({
          id: i,
          value: true,
        });
      }
    },
  },
  async mounted() {
    this.fetchHome();
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

@import "./style/_variables.scss";

* {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}
.catalog {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: "Playfair Display", serif;
  background-color: #121212;
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    list-style: none;
    li {
      position: relative;
      margin: $margin-10;
      background-color: #1e1e1e;
      color: white;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      img {
        pointer-events: none;
      }
      .like {
        pointer-events: none;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        display: none;
        font-size: 10rem;
      }
      .likeActive {
        color: rgb(240, 61, 91);
        opacity: 0.9;
        display: block !important;
      }
      h2,
      p {
        text-align: center;
        margin: $margin-10;
      }
      h2 {
        font-size: 18px;
      }
      p {
        font-size: 12px;
      }
    }
  }
}
</style>