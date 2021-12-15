<template>
    <div class="post-list">
        <PostMini v-for="[id, postInfo] in getPostListMainPage"
                  :key="id"
                  :postInfo="postInfo"
                  :delPost="delPost"
                  :openPost="openPost"
                  :changePost="changePost"
        />
    </div>
</template>

<script>
import PostMini from '../components/post-mini.vue';

export default {
    name: 'postList',
    components: { PostMini },
    data() {
        return {
            postsList: {},
            numbersWatchPost: 10,
        };
    },
    computed: {
        getPostListMainPage() {
            return this.$store.getters.getPostListMainPage(this.numbersWatchPost);
        },
    },
    methods: {
        openPost(id) {
            this.$router.push(`/posts/${id}`);
        },
        delPost(id) {
            delete this.$store.getters.getPostList[id];
            this.$store.dispatch('savePostList');
        },
        changePost(id) {
            this.$router.push(`/change/${id}`);
        },
        getMoreData() {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;

            if (bottomOfWindow) {
                this.numbersWatchPost += 5
            }

        }
    },
    mounted() {
        document.addEventListener('scroll', this.getMoreData)
    },
    beforeUnmount() {
        document.removeEventListener('scroll', this.getMoreData)
    },
};
</script>
