<template>
    <div class="post-full" v-if="renderKey">
        <div class="post-full__info">
            <div class="post-full__header">
                <h1>{{ getCurrentPost?.title }}</h1>
            </div>
            <div class="post-full__body">
                <p>{{ getCurrentPost?.fullText }}</p>
            </div>
        </div>
        <div class="post-full__comments_block" v-if="getCurrentPost">
            <ul class="comment_list">
                <Comment  v-for="[keys, comment] in Object.entries(getCurrentPost?.comments)"
                          :key="keys"
                          :commentInfo="comment"
                          :openCommentMenu="openCommentMenu"
                          :openCommentMenuId="openCommentMenuId"
                          :parentInfo="getCurrentPost"
                          :postId="getCurrentPost.id"
                />
            </ul>
        </div>
        <div class="post__comment-input">
            <AddCommentArea :openCommentMenuId="openCommentMenuId"
                            :openCommentMenu="openCommentMenu"
                            v-if="openCommentMenuId === null"
                            :commentInfo="getCurrentPost"
                            :postId="getCurrentPost.id"
            />
        </div>
    </div>

</template>

<script>
import Comment from '../components/comment.vue';
import AddCommentArea from '../components/addCommentArea.vue';

export default {
    name: 'post',
    components: { AddCommentArea, Comment },
    data() {
        return {
            openCommentMenuId: null,
            renderKey: false,
            newComment: {
                textComment: '',
                nameUser: '',
            },
        };
    },
    computed: {
        getCurrentPost() {
            const pathId = this.$router.currentRoute.value.params.id;
            return this.$store.getters.getCurrentPost(pathId);
        },
    },
    methods: {
        openCommentMenu(id) { // для открытия менюшки комментирования комментария
            this.openCommentMenuId = id;
        },
    },
    mounted() {
        if (typeof this.getCurrentPost === 'undefined') {
            this.$router.push({ name: '404' })
            return
        }
        this.renderKey = true
    }
};
</script>
