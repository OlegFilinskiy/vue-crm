<template name="component-name">
  <ul class="sidenav app-sidenav" :class="{ open: open }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ["open"], // isOpen from MainLayout
  data: () => ({
    links: [
      { title: localizeFilter('SidebarBill'), url: "/", exact: true },
      { title: localizeFilter('SidebarHistory'), url: "/history" },
      { title: localizeFilter('SidebarPlanning'), url: "/planning" },
      { title: localizeFilter('SidebarRecord'), url: "/record" },
      { title: localizeFilter('SidebarCategory'), url: "/categories" }
    ]
  })
};
</script>
