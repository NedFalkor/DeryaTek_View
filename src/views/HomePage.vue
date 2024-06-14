<template>
  <div class="container">
    <h1>Dashboard</h1>
    <div class="category">
      <h2>Bands</h2>
      <div class="links">
        <router-link to="/bands">Bands</router-link>
        <router-link to="/band-members">Band Members</router-link>
        <router-link to="/instruments">Instruments</router-link>
      </div>
    </div>
    <div class="category">
      <h2>Genres</h2>
      <div class="links">
        <router-link to="/genres">Genres</router-link>
        <router-link to="/styles">Styles</router-link>
        <router-link to="/sub-genres">Sub-Genres</router-link>
      </div>
    </div>
    <div class="category">
      <h2>Gigs</h2>
      <div class="links">
        <router-link to="/festivals">Festivals</router-link>
        <router-link to="/gigs">Gigs</router-link>
        <router-link to="/setlists">Setlists</router-link>
        <router-link to="/venues">Venues</router-link>
      </div>
    </div>
    <div class="category">
      <h2>Records</h2>
      <div class="links">
        <router-link to="/records">Records</router-link>
        <router-link to="/tracklists">Tracklists</router-link>
        <router-link to="/labels">Labels</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category {
  margin-bottom: 20px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.router-link {
  padding: 15px 25px;
  background: #eee;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s ease;
}

.router-link:hover {
  background: #ddd;
}
</style>
