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
        <h1 class="title"><span class="first-letter">A</span>frican_<span>Arts</span></h1>
      </div>
      <ul class="sidebar-links">
        <li><router-link class="link" :to="{ path: '/' }" @click="closeMobileNav">Home</router-link></li>
        <li><router-link class="link" :to="{ path: '/products' }" @click="closeMobileNav">About</router-link></li>
        <li><router-link class="link" :to="{ name: 'RegisterPage' }" @click="closeMobileNav">SignUp</router-link></li>
      </ul>
      
      <!-- Icons are only displayed if the current route is not login, signup, or admin -->
      <div v-if="showIcons" class="sidebar-icons">
        <router-link to="/profile" class="icon-link"><i class="far fa-user"></i></router-link>
        <router-link to="/cart" class="icon-link"><i class="fas fa-shopping-cart"></i></router-link>
        <router-link to="/wishlist" class="icon-link"><i class="fas fa-heart"></i></router-link>
      </div>

      <button v-if="showIcons" @click="logout" class="logout-button">Logout</button>
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
  computed: {
    showIcons() {
      const hiddenPages = ['loginpage', 'registerpage', 'admin'];
      return !hiddenPages.includes(this.$route.name);
    }
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      this.mobileNav = false; // Close the sidebar
    },
    handleScroll() {
      this.scrollPosition = window.scrollY;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.mobileNav = false; // Close sidebar on large screens
      }
    },
    logout() {
      // Clear user data from localStorage
      localStorage.removeItem('currentUser');
      
      // Redirect to login page
      this.$router.push({ name: 'loginpage' });
      
      // Optionally, close the mobile nav if it's open
      this.closeMobileNav();
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Initialize mobileNav based on initial window size
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

header {
  background-color: rgba(22, 40, 54, 0.3);
  z-index: 1000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
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
  z-index: 1500;

  display: flex;
  flex-direction: column;
  justify-content: space-between; 

  .logout-button {
    margin: 20px 0;
    padding: 10px 20px;
    background-color: #C8915F;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken(#C8915F, 10%);
    }
  }

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

  .sidebar-icons {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 20px;  /* Added margin-bottom to move the icons away from the bottom */

    .icon-link {
      color: white;
      font-size: 1.5rem;
      transition: color 0.3s;
    }

    .icon-link:hover {
      color: #C8915F;
    }

    i {
      font-size: 24px;
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
