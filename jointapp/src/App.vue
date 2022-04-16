<template>
    <nav  class="navbar navbar-expand-md navbar-light bg-info">
        <div class="container-fluid">
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/intakeEvent">Bread of Life</router-link>
            </li>
          </ul>

          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
              <a class="navbar-brand" href="/">Home</a>
            </li>
          </ul>

          <ul class="nav navbar-nav ">
            <li class="nav-item">
              <router-link class="nav-link" to="/familyCenter">Community Family Center</router-link>
            </li>
          </ul>
        </div>
    </nav>

<!-- Router view -->
<div class="container mt-3">
  <router-view>
  </router-view>
</div>
</template>
