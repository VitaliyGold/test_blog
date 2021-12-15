<template>
    <div class="comment_form">
        <div>
            <h3>Прокомментировать</h3>
        </div>
        <form @submit.prevent="validate">
            <div class="comment_form__name">
                <label>Ваше имя<span class="req_input">*</span></label>
                <div class="input-wrapper">
                    <input v-model="newComment.nameUser.text"
                           placeholder='Ваше имя'
                           :class="newComment.nameUser.error ? 'error' : ''"
                    />
                    <span class="error_text">{{ newComment.nameUser.error }}</span>
                </div>
            </div>
            <div class="comment_form__text">
                <label>Текст комментария<span class="req_input">*</span></label>
                <div class="textarea_wrapper">
                    <textarea v-model="newComment.textComment.text"
                              placeholder='Текст комментария'
                              :class="newComment.textComment.error ? 'error' : ''"
                    />
                    <span class="error_text">{{ newComment.textComment.error }}</span>
                </div>
            </div>
            <div class="comment_form__submit">
                <button class="btn blue-btn"
                        @click.prevent="openCommentMenu(null)"
                        v-if="openCommentMenuId !== null"
                >
                    Отменить
                </button>
                <button class="btn blue-btn"
                         type="submit"
                >
                    Отправить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'addCommentArea',
    props: {
        openCommentMenuId: String || null,
        postId: String,
        commentInfo: Object,
        openCommentMenu: Function,
    },
    data() {
        return {
            newComment: {
                textComment: {
                    text: '',
                    error: '',
                },
                nameUser: {
                    text: '',
                    error: '',
                },
            },
        };
    },
    methods: {

        validate() {

            let failSubmit = false

            Object.keys(this.newComment).forEach(commentId => {
                if (!this.newComment[commentId].text.length) {
                    this.newComment[commentId].error = 'Поле не может быть пустым'
                    failSubmit = true
                } else {
                    this.newComment[commentId].error = ''
                }
            })
            if (!failSubmit) {
                this.saveNewComment()
            }
        },
        saveNewComment() {
            const newId = String(new Date().getTime());
            this.commentInfo.comments[newId] = {
                id: newId,
                comments: {},
                textComment: this.newComment.textComment.text,
                nameUser: this.newComment.nameUser.text,
            };
            this.$store.commit('changeAmountComments', this.postId);
            this.openCommentMenu(null);
            this.newComment.textComment.text = '';
            this.newComment.nameUser.text = '';
            this.$store.dispatch('savePostList');
        },
    },
};
</script>

<style scoped>

</style>
