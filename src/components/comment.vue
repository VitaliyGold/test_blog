<template>
    <div class="comment">
        <div class="comment_inner">
            <div class="comment_btn-container" v-if="isAdmin">
                <button @click="deleteComment"
                        class="btn blue-btn"
                >
                    Удалить
                </button>
            </div>
            <div class="comment-body">
                <div class="comment_personal">
                    <div class="comment_avatar">
                        <img src="@/assets/avatar.png">
                    </div>
                    <div class="comment_name">
                        <p>{{ commentInfo.nameUser }}</p>
                    </div>
                </div>
                <div class="comment_text">
                    <p>{{ commentInfo.textComment }}</p>
                </div>
            </div>
            <div class="comment-footer">
                <button @click="openCommentMenu(commentInfo.id)"
                        class="btn blue-btn"
                >
                    Комментировать
                </button>
            </div>
            <AddCommentArea :commentInfo="commentInfo"
                            :openCommentMenuId="openCommentMenuId"
                            :openCommentMenu="openCommentMenu"
                            :postId="postId"
                            v-if="openCommentMenuId === commentInfo.id"
            />
        </div>
        <div class="comment_child" v-if="Object.keys(commentInfo.comments).length">
            <Comment  v-for="[key, comment] in Object.entries(commentInfo.comments)"
                      :key="key"
                      :commentInfo="comment"
                      :parentInfo="commentInfo"
                      :openCommentMenuId="openCommentMenuId"
                      :openCommentMenu="openCommentMenu"
                      :postId="postId"
            />
        </div>
    </div>
</template>

<script>
import AddCommentArea from './addCommentArea.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'comment',
    components: { AddCommentArea },
    props: {
        commentInfo: Object,
        openCommentMenuId: String || null,
        openCommentMenu: Function,
        parentInfo: Object,
        postId: String,
    },
    methods: {
        deleteComment() {
            delete this.parentInfo.comments[this.commentInfo.id];
            this.$store.commit('changeAmountComments', this.postId)
            this.$store.dispatch('savePostList');
        },
    },
    computed: {
        ...mapGetters(['isAdmin'])
    }
};
</script>

<style scoped>

</style>
