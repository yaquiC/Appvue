<template>
  <create></create>
  <div class="col-span-12 z-30 absolute w-[81.5%] h-[calc(100% - 20%)] top-[20%] left-[18.5%] flex  justify-center">
    <div class="overflow-auto lg:overflow-visible">
      <table class="table text-gray-400 border-separate space-y-6 text-sm">
        <thead class="bg-gray-800 text-gray-500">
          <tr>
            <th class="p-3">Nombre</th>
            <th class="p-3">Rol Activo</th>
            <th class="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="roles in rol" class="bg-gray-800">
            <td class="p-3">
              <div class="flex align-items-center">
                <div class="ml-3">
                  <div class="text-sm text-white">{{ roles.rol }}</div>
                </div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex align-items-center">
                <div class="ml-3">
                  <span class="text-green-500">Sí</span>
                </div>
              </div>
            </td>
            <td class="p-3">
              <!-- Botones -->
              <div class="flex justify-center space-x-4">
                <update :rol="roles.rol" :id="roles.id">
                  </update>
                <button @click="handleDelete(roles.id)" data-swal-template="#my-template" type="button" class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Eliminar
                  </button>
              </div>
            </td>
          </tr>
          <!-- Segunda Fila -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
// import agregar from '../../components/rol/Rol.modal.vue'

import update from "../../components/rol/Rol.Update.vue"
 import Swal from 'sweetalert2';


//? pagination
import { UseRolStore } from '../../store/rol.store.ts';
const { GetAllRol } = UseRolStore()

const { rol } = storeToRefs(UseRolStore())

onMounted(async () => {
  await GetAllRol()
});

// delete rol
const { DeleteRol } = UseRolStore();

// delete rol
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
      DeleteRol(id).then(() => {
        Swal.fire({
          title: "Rol eliminado",
          text: "Rol eliminado con exito",
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

tr td:nth-child(n+3),
tr th:nth-child(n+3) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}

dialog[open] {
  animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
  backdrop-filter: blur(3px);
}


// @keyframes appear {
//   from {
//     opacity: 0;
//     transform: translateX(-3rem);
//   }

//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }
</style>