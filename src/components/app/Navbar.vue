<template name="component-name">
  <nav class="navbar orange lighten-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('burgerClick')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <!-- if you need date only, pass to the filter 'date' -->
      </div>

      <div class="date orange lighten-3">
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text" >
                <i class="material-icons">account_circle</i>
                {{'NavbarProfile'|localize}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{'NavbarLogout'|localize}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    data: () => ({
      date: new Date(),
      interval: null,
      dropdown: null
    }),
    methods: {
      async logout() {
        await this.$store.dispatch('logout') // need wait promise
        this.$router.push('/login?message=logout')
      }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    mounted() {
      // refer to Materialize plugin
      this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: false
      })

      this.interval = setInterval(() => {
        this.date = new Date()
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.interval)

      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy
      }
    }
  };
</script>

<style lang="sass">
  .date
    box-shadow: inset 0px 0px 8px 1px rgba(0,0,0,0.4)
    padding: 5px 15px
    height: 40px
    margin-left: 20px
    margin-right: 20px
    border-radius: 2px;

    span 
      line-height: 30px
      display: block
  
</style>
