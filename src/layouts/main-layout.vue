<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered style="background: #fff; color: #333">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> {{ title }} </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <div>
          <q-btn no-caps outline color="primary" rounded>
            <div class="al-c">
              <q-avatar size="22px">
                <img src="/img/metamask.png" />
              </q-avatar>
              <span class="q-ml-sm">Connect Wallet</span>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="q-pa-md">Moss Drive</div>

        <q-item
          v-for="it in links"
          :key="it.title"
          clickable
          tag="a"
          :target="it.link ? '_blank' : null"
          :href="it.link"
          :to="it.to"
          :active="$route.path.indexOf(it.to) == 0"
        >
          <q-item-section v-if="it.icon" avatar>
            <q-icon :name="it.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ it.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  computed: {
    meta() {
      return this.$route.meta
    },
    title() {
      return this.meta?.title
    }
  },
  data() {
    return {
      links: [
        {
          title: 'My Drive',
          icon: 'folder',
          to: '/drive'
        },
        {
          title: 'My Stones',
          icon: 'code',
          to: '/stone'
        },
        {
          title: 'My Collections',
          icon: 'star',
          link: 'https://chat.quasar.dev'
        }
      ],
      leftDrawerOpen: false
    }
  }
}
</script>
