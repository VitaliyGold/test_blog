<template>
  <header>
    <div class="header__container">
      <div class="functional-btn__container">
        <button
            v-if="isAdmin"
            class="btn light-btn"
            @click="createNewPost">
            Создать новый пост
        </button>
      </div>
      <div class="auth-btn__container">
        <button class="btn light-btn"
            @click="changeAdminState"
        >
            {{ adminBtnText }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'v-header',
  methods: {
    createNewPost() {
      this.$router.push({ name: 'create' });
    },
      ...mapMutations(['changeAdminState'])
  },
    computed: {
      adminBtnText() {
          if (this.$store.getters.isAdmin) {
              return 'Выйти как админ'
          } else {
              return 'Войти как админ'
          }
      },
        ...mapGetters(['isAdmin'])
    }
};
</script>

<style>

</style>
