import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/app/train",
  routes: [
    {
      path: "/search",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
});
