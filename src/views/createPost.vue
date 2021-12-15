<template>
    <div class="form_create_post_container">
        <form @submit.prevent="validate">
            <div>
                <h2>Создать новый пост</h2>
            </div>
            <div class="form_create_post_body">
                <div class="form_create_post_body__elem">
                    <label>Заголовок поста<span class="req_input">*</span></label>
                    <div class="input-wrapper">
                        <input v-model="newPostData.title.text"
                               placeholder='Заголовок поста'
                               :class="newPostData.title.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ newPostData.title.error }}</span>
                    </div>

                </div>
                <div class="form_create_post_body__elem">
                    <label>Краткое описание<span class="req_input">*</span></label>
                    <div class="input-wrapper">
                        <input v-model="newPostData.descr.text"
                               placeholder='Краткое описание поста'
                               :class="newPostData.descr.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ newPostData.descr.error }}</span>
                    </div>
                </div>
                <div class="form_create_post_body__elem">
                    <label>Текст новости<span class="req_input">*</span></label>
                    <div class="textarea_wrapper">
                        <textarea v-model="newPostData.fullText.text"
                                  placeholder='Текст поста'
                                  :class="newPostData.fullText.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ newPostData.fullText.error }}</span>
                    </div>
                </div>
            </div>
            <div class="submit-btn-container">
                <button class="btn blue-btn" type="submit">Создать</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'createPost',
    data() {
        return {
            newPostData: {
                title: {
                    text: '',
                    error: '',
                },
                descr: {
                    text: '',
                    error: '',
                },
                fullText: {
                    text: '',
                    error: '',
                },
            },
        };
    },
    methods: {
        validate() {
            let failSubmit = false;
            Object.keys(this.newPostData).forEach(commentId => {
                if (!this.newPostData[commentId].text.length) {
                    this.newPostData[commentId].error = 'Поле не может быть пустым';
                    failSubmit = true;
                } else {
                    this.newPostData[commentId].error = '';
                }
            })
            if (!failSubmit) {
                this.createNewPost();
            }
        },
        createNewPost() {
            const newId = String(new Date().getTime());
            const newPost = {
                title: this.newPostData.title.text,
                descr: this.newPostData.descr.text,
                fullText: this.newPostData.fullText.text,
                amountComments: 0,
                id: newId,
                comments: {},
            };
            this.$store.commit('changePostList', {
                id: newId,
                newPost,
            });
            this.$store.dispatch('savePostList');
            this.$router.push({ name: 'noteList' });
        },
    },
    };
</script>
