<!-- SideBar.vue -->
<template>
    <div class="sidebar">
      <h1>Sidebar Content</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: "SideBar", // Updated component name
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #162836;
    position: fixed;
    top: 0;
    left: 0;
  }
  h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  border-bottom: 5px solid #162836;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
  background-color: #113252;
}
  </style>
  