<template>
    
    <body class="font-poppins antialiased z-0 relative bg-orange-100 h-full w-full">
        <div id="view" class="  flex flex-row ">
            <div id="sidebar"
                class="bg-blue-100 h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
                x-show="sidenav">
                <div class="space-y-6 md:space-y-10 mt-10">
                    <div id="profile" class="space-y-3">
                    
                        <div>
                            <h2 class="font-medium text-xs md:text-sm text-center text-teal-500">
                                Dashboard
                            </h2> 
                        </div>
                    </div>
                    <div id="menu" class="flex flex-col space-y-2">
                        
                        <RouterLink to="/rol"
                            class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                            <svg class="w-6 h-6 fill-current inline-block" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z">
                                </path>
                            </svg>
                            <span class="">Rol</span>
                        </RouterLink>
                        <RouterLink to="/user"
                            class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                           <oh-vue-icon name="fa-user" scale="1.5"></oh-vue-icon>
                            
                            <span class="">Usuario</span>
                        </RouterLink>
                        <button @click="MakeLogout"
                            class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-600 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                           <oh-vue-icon name="bi-box-arrow-left" scale="1.6"></oh-vue-icon>
                            <span class="">Cerrar Sesion</span>
                         </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </body>

</template>

<script lang="ts" setup>
import { UseAuthStore } from '../../store/auth.store';
import { OhVueIcon } from 'oh-vue-icons';

const {MakeLogout} = UseAuthStore();

</script>

<style lang="scss" scoped></style>