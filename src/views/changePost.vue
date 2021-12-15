<template>
    <div class="form_create_post_container">
        <form @submit.prevent="confirmChange">
            <div>
                <h2>Изменить пост</h2>
            </div>
            <div class="form_create_post_body">
                <div class="form_create_post_body__elem">
                    <label>Заголовок поста<span class="req_input">*</span></label>
                    <div class="input-wrapper">
                        <input v-model="changedPostInfo.title.text"
                               placeholder='Заголовок поста'
                               :class="changedPostInfo.title.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ changedPostInfo.title.error }}</span>
                    </div>
                </div>
                <div class="form_create_post_body__elem">
                    <label>Краткое описание<span class="req_input">*</span></label>
                    <div class="input-wrapper">
                        <input v-model="changedPostInfo.descr.text"
                               placeholder='Заголовок поста'
                               :class="changedPostInfo.descr.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ changedPostInfo.descr.error }}</span>
                    </div>
                </div>
                <div class="form_create_post_body__elem">
                    <label>Текст новости<span class="req_input">*</span></label>
                    <div class="textarea_wrapper">
                        <textarea v-model="changedPostInfo.fullText.text"
                                  placeholder='Текст поста'
                                  :class="changedPostInfo.fullText.error ? 'error' : ''"
                        />
                        <span class="error_text">{{ changedPostInfo.fullText.error }}</span>
                    </div>
                </div>
            </div>
            <div class="submit-btn-container">
                <button class="btn blue-btn" type="submit">Изменить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'changePost',
    data() {
        return {
            changedPostInfo: {
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
        getData() {
            const postId = this.$router.currentRoute.value.params.id;
            if (typeof this.$store.getters.getCurrentPost(postId) === 'undefined') {
                this.$router.push({ name: '404' });
                return {
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
                };
            }
            return this.$store.getters.getCurrentPost(postId);
        },
        validate() {
            let failSubmit = false;
            const listFieldToValidate = ['title', 'descr', 'fullText']
            listFieldToValidate.forEach(field => {
                if (!this.changedPostInfo[field].text.length) {
                    this.changedPostInfo[field].error = 'Поле не может быть пустым';
                    failSubmit = true;
                } else {
                    this.changedPostInfo[field].error = '';
                }
            })
            if (!failSubmit) {
                this.confirmChange();
            }
        },

        confirmChange() {
            this.$store.commit('changePostList', {
                id: this.changedPostInfo.id,
                newPost: {
                    amountComments: this.changedPostInfo.amountComments,
                    comments: this.changedPostInfo.comments,
                    descr: this.changedPostInfo.descr.text,
                    fullText: this.changedPostInfo.fullText.text,
                    id: this.changedPostInfo.id,
                    title: this.changedPostInfo.title.text
                },
            });
            this.$store.dispatch('savePostList');
            this.$router.push({ name: 'noteList' });
        },
    },
    mounted() {
        const currentPostInfo = { ...this.getData() };
        this.changedPostInfo = {
            ...currentPostInfo,
            title: {
                text: currentPostInfo.title,
                error: '',
            },
            descr: {
                text: currentPostInfo.descr,
                error: '',
            },
            fullText: {
                text: currentPostInfo.fullText,
                error: '',
            }
        }
    }

};
</script>

<style scoped>

</style>
