<template>
  <div class="navigation">
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item
          ><v-btn-toggle>
            <v-btn v-model="miniVariant">expand / shrink</v-btn>
          </v-btn-toggle></v-list-item
        >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content
            ><v-list-item-title v-text="item.title"
          /></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [],
      miniVariant: false,
    }
  },
  created() {
    const data = require('../.nuxt/routes.json')
    this.addPages('', data)
    console.log(
      'component/navigation.vue/created:\nsetup navigation',
      this.$data.items
    )
  },
  methods: {
    addPages(path, page) {
      for (const index in page) {
        const subPage = page[index]
        const paths = subPage.path.split('/')
        subPage.path = paths.map((p) => (p[0] === ':' ? 1 : p)).join('/')

        this.items.push({
          title: subPage.name,
          to: path + subPage.path,
        })
        if ('children' in subPage)
          this.addPages(path + subPage.path + '/', subPage.children)
      }
    },
  },
}
</script>

<style scoped></style>
