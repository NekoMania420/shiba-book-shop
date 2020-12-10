<template>
  <Layout>
    <template #navbar>navbar</template>
    <div>main</div>
    <template #aside>aside content</template>
  </Layout>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>
