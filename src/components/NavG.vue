<template>
  <header :class="{'scrolled-nav': scrollPosition > 0}">
    <nav>
      <div class="branding">
        <img src="@/assets/logo1.jpeg" alt="Logo">
        <h1 class="title"><span class="first-letter">A</span>frican_<span>Arts</span></h1>
      </div>
      <div class="icon">
        <i @click="toggleMobileNav" class="far fa-bars" :class="{'icon-active': mobileNav}"></i>
      </div>
    </nav>     
  </header>

  <transition name="slide">
    <aside v-if="mobileNav" class="sidebar">
      <div class="sidebar-branding">
        <!-- Removed the image element -->
        <h1 class="title"><span class="first-letter">A</span>frican_<span>Arts</span></h1>
      </div>
      <ul class="sidebar-links">
        <li><router-link class="link" :to="{ path: '/' }">Home</router-link></li>
        <li><router-link class="link" :to="{ path: '/products' }">About</router-link></li>
        <li><router-link class="link" :to="{ name: 'register' }">SignUp</router-link></li>
      </ul>
    </aside>
  </transition>
</template>

<script>
export default {
  name: "navG",
  data() {
    return {
      scrollPosition: 0,
      mobileNav: false,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
  toggleMobileNav() {
    this.mobileNav = !this.mobileNav;
    console.log('Mobile Nav toggled:', this.mobileNav);
  },
  handleScroll() {
    this.scrollPosition = window.scrollY;
    console.log('Scroll position:', this.scrollPosition);
  },
  handleResize() {
    this.windowWidth = window.innerWidth;
    console.log('Window width:', this.windowWidth);
    if (this.windowWidth > 768) {
      this.mobileNav = false; // Close sidebar on large screens
      console.log('Mobile nav closed due to resize');
    }
  }
},
mounted() {
  console.log('Component mounted');
  window.addEventListener('scroll', this.handleScroll);
  window.addEventListener('resize', this.handleResize);
  this.handleResize(); // Initialize mobileNav based on initial window size
},
beforeUnmount() {
  console.log('Component before unmount');
  window.removeEventListener('scroll', this.handleScroll);
  window.removeEventListener('resize', this.handleResize);
}

};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

header {
  background-color: rgba(22, 40, 54, 0.3);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  
  &.scrolled-nav {
    background-color: rgba(22, 40, 54, 0.8);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 1100px) {
      max-width: 1140px;
    }
  }

  .branding {
    display: flex;
    align-items: center;

    img {
      width: 70px;
      height: auto;
      margin-right: 10px;
      transition: .5s ease all;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 24px;
      color: #C8915F;
      font-weight: 400;
      display: flex;
      align-items: center;

      .first-letter {
        font-size: 70px;
        font-weight: 700;
        line-height: 1;
      }

      span {
        font-size: 24px;
        font-weight: 400;
      }
    }
  }

  .icon {
    display: flex;
    align-items: center;

    i {
      cursor: pointer;
      font-size: 24px;
      transition: .8s ease all;
    }
  }

  .icon-active {
    transform: rotate(180deg);
  }
}

.sidebar {
  background-color: #162836;
  width: 250px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  .sidebar-branding {
    margin-bottom: 40px;

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 24px;
      color: #C8915F;
      font-weight: 400;
      display: flex;
      align-items: center;

      .first-letter {
        font-size: 70px;
        font-weight: 700;
        line-height: 1;
      }

      span {
        font-size: 24px;
        font-weight: 400;
      }
    }
  }

  .sidebar-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .link {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      transition: color 0.3s;
    }

    .link:hover {
      color: #C8915F;
    }
  }
}

/* Transition for Sidebar */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
