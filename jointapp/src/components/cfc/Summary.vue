<template>
    <div id="nav">
        <nav class="navbar navbar-expand-md bg-light navbar-light">
        <div class="container">
            <router-link class="navbar-brand float-left" to="/">COMMUNITY FAMILY CENTERS</router-link>
            <div class="navbar-nav mr-auto">
                <router-link class="nav-item nav-link" to="/intakeClient">ADD CLIENT</router-link>
                <router-link class="nav-item nav-link" to="/showClients">CLIENTS</router-link>
                <router-link class="nav-item nav-link" to="/programSummary">SUMMARY</router-link>
            </div>  
        </div>
        </nav>

        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </div>
</template>