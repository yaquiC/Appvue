<template>
    <div>
        <UserModal/>
        <UserTable/>
        <DashboardComponent/>
    </div>
</template>

<script lang="ts" setup>
    import UserTable from '../components/users/User.table.vue';
    import UserModal from '../components/users/User.modal.vue';
    import DashboardComponent from '../components/dashboard/Dashboard.component.vue';
</script>

<style lang="scss" scoped>


</style>