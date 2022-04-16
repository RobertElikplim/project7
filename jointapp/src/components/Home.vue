<template>
    <center>
        <div style="width: 100%;">
            <hr class="mt-10 border-solid border-1" style="border-color: black" />
            <h3>Welcome</h3><br>
            <h3>Community Family Center</h3>
            <a href="/familyCenter">
                <img alt="CFC Logo" src="../assets/cfc.png"  width=100 height=100><br/><br/>
            </a>
            <h3>&</h3>
            <h3>Bread of Life</h3>
            <a href="/intakeEvent">
            <img alt="BOL Logo" src="../assets/bol.png" width=100 height=100><br/><br/>
            </a>
            <div class="container mt-3 mb-3 d-flex justify-content-center">
                <router-link :to="{ name: 'intakeClient' }" class="btn btn-success my-2">REGISTER NEW CLIENT</router-link>
            </div>
        </div>
    </center>
</template>

<style>
    .btn {
        margin: 1px;
        float: none;
    }
</style>