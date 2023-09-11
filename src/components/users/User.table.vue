<template>
  <div class="col-span-12 z-30 absolute w-[81.5%] h-[calc(100% - 20%)] top-[20%] left-[18.5%] flex justify-center ">
      <div class="overflow-auto lg:overflow-visible">
          <table class="table text-gray-400 border-separate space-y-6 text-sm">
              <thead class="bg-gray-800 text-gray-500">
                  <tr>
                      <th class="p-3">Nombre</th>
                      <th class="p-3">Apellido</th>
                      <th class="p-3">Edad</th>
                      <th class="p-3">Género</th>
                      <th class="p-3">Correo</th>
                      <th class="p-3">Rol</th>
                      <th class="p-3">Activo</th>
                      <th class="p-3 text-left">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="users in user" class="bg-gray-800">
                      <td class="p-3">{{ users.name }}</td>
                      <td class="p-3">{{ users.lastName }}</td>
                      <td class="p-3">{{ users.age }}</td>
                      <td class="p-3">{{ users.gender }}</td>
                      <td class="p-3">{{ users.email }}</td>
                      <td class="p-3">{{ users.rol.rol }}</td>
                      <td class="p-3 text-green-500">Sí</td>
                      <td class="p-3">
                          <!-- modal -->
                          <div class="flex justify-center space-x-4">
                              <update :user="users"></update>
                              <button @click="handleDelete(users.id)" data-swal-template="#my-template" type="button" class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Eliminar
                              </button>
                          </div>
                      </td>
                  </tr>
                  <!--gregar mas filas-->
              </tbody>
          </table>
      </div>
      <paginate :total="paginates.total"
                  :totalPages="paginates.totalPages"
                  :pages="pages"
                  :next="paginates.nextPag"
                  :prev="paginates.prevPag"
                  :currentPage="paginates.currentPage"
                  :totalPag="paginates.totalPages"
                  @method="ChangePage"></paginate>
  </div>
</template>

<script lang="ts" setup>
import update from '../users/User.Update.vue'
import paginate from "../global/Paginate.vue"
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
// pagination
import { UseUserStore } from '../../store/user.store';

const { GetAllUser } = UseUserStore();
const { user } = storeToRefs(UseUserStore());

const { paginates, pages } = storeToRefs(UseUserStore());
const pagination = UseUserStore();


const ChangePage = (page: string | number) => {
  pagination.GetUsers(Number(page), 5);
}

onMounted(async () => {
  pagination.GetUsers(1, 5);
  await GetAllUser()
});

// delete
const { DeleteUser } = UseUserStore();

// delete
const handleDelete = (id: number) =>{
Swal.fire({
  title: "Estas seguro?",
  text: "Esta accion no se puede deshacer",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Eliminar",
  cancelButtonText: "Cancelar"
}).then((result) => {
  if (result.isConfirmed){
      DeleteUser(id).then(() => {
      Swal.fire({
        title: "Usuario eliminado",
        text: "Usuario eliminado con exito",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });
    });
  }
});
}

</script>

<style lang="scss" scoped>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+8),
tr th:nth-child(n+8) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}
</style>