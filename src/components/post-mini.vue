<template>
    <div class="post-mini">
        <div class="post-header mini">
            <h2>{{ postInfo.title }}</h2>
        </div>
        <div class="post-body mini">
            <div>
                <p>{{ postInfo.descr }}</p>
            </div>

        </div>
        <div class="post-footer mini">
            <div>
                <p>
                    <span>{{ postInfo.amountComments }}</span> комментариев
                </p>
            </div>
            <div class="add_full_btn">
                <a href='javascript:;' @click="openPost(postInfo.id)">Читать полностью</a>
            </div>
        </div>
        <div class="post__btn-container" v-if="isAdmin">
            <button class="btn blue-btn"
                    @click="delPost(postInfo.id)"
            >
                Удалить
            </button>
            <button class="btn blue-btn"
                    @click="changePost(postInfo.id)"
            >
                Изменить
            </button>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'post-mini',
    props: {
        postInfo: Object,
        delPost: Function,
        openPost: Function,
        changePost: Function,
    },
    computed: {
        ...mapGetters(['isAdmin'])
    }
};
</script>
