<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import TextInput from './components/Fields/TextInput.vue';
import { initLinkRules } from './types/link_rule_validation/InitLinkRules';
import { LinkRuleValidationDictManager } from './types/link_rule_validation/link_rule_dict/LinkRuleDictManager';
import { initLinkDictRules } from './types/link_rule_validation/link_rule_dict/LinkRuleDictConfig';
const route = useRoute();
const routes = [
  {
    name: "home", link: "/"
  },
  {
    name: "design", link: "/design"
  }
]

const isCurrentRoute = (targetRoute: string): boolean => {
  return route.path === targetRoute;
};

// Init linking rules
initLinkRules()
initLinkDictRules()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink v-for="route in routes" :to="route.link" :class="{ 'selected-link': isCurrentRoute(route.link) }">{{
          route.name }}</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: fit-content;
  margin-left: 1rem;
  z-index: 20;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

nav a:hover {
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
}

.selected-link {
  background-color: var(--primary-accent-color);
  color: var(--tertiary-color);
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: white;
  font-size: 1rem;
  text-decoration: none;
  color: var(--primary-color);
  cursor: pointer;
  text-transform: capitalize;
}


main {
  height: 100vh;
}
</style>
