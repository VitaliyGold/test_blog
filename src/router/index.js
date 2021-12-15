import { createRouter, createWebHistory } from 'vue-router';
import postList from '../views/postList.vue';
import post from '../views/post.vue';
import createPost from '../views/createPost.vue';
import changePost from '../views/changePost.vue';
import notFound from '../views/notFound.vue';

const routes = [
  {
    path: '/',
    name: 'noteList',
    component: postList,
  },
  {
    path: '/posts/:id',
    name: 'note',
    component: post,
  },
  {
    path: '/create',
    name: 'create',
    component: createPost,
  },
  {
    path: '/change/:id',
    name: 'change',
    component: changePost,
  },
  {
    path: '/404',
    component: notFound,
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
