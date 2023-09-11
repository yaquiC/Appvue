<template>
  <div class="w-[81.5%] h-[18%] left-[18.5%] z-20 absolute">
    <section class="flex p-10 justify-center items-start">
      <button
        onclick="document.getElementById('myModal').showModal()"
        id="btn"
        class="py-3 px-10 bg-gray-800 text-white rounded text shadow-xl"
        @mouseover="isAddHovered=true"
        @mouseleave="isAddHovered=false"
      >
        Crear usuario
      </button>
    </section>

    <dialog id="myModal" class="bg-red-300 rounded-md w-[60%] h-[80%]">
      <div class="flex flex-col w-full h-auto">
        <!-- Header -->
        <div class="flex w-full h-auto justify-center items-center">
          <div
            class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold"
          >
            Crear usuario
          </div>
          <div
            onclick="document.getElementById('myModal').close();"
            class="flex w-1/12 h-auto justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div
          class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500"
        >
          <!-- formulario -->
          <form class="flex flex-col space-y-4" @submit="onSubmit">
            <div class="flex flex-col w-full mt-1">
              <label class="block text-gray-700 text-sm font-medium mb-1">Rol</label>
              <Field name="rolId" as="select" class="w-full h-10 border rounded-xl mb-4">
              <option disabled value="">Seleccione un Rol</option>
              <option v-for="roles in rol" :value="roles.id" :key="roles.id"> 
                {{ roles.rol }}
              </option>
              </Field>
            </div>
            <div class="mb-4">
              <Field
                type="text"
                id="user"
                name="name"
                placeholder="Nombre"
                class="mt-1 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            
              <Field
                type="text"
                id="user"
                name="lastName"
                placeholder="Apellido"
                class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Field
                type="text"
                id="user"
                name="age"
                placeholder="Edad"
                class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Field
                type="text"
                id="user"
                name="gender"
                placeholder="Genero"
                class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Field
                type="text"
                id="user"
                name="email"
                placeholder="Correo"
                class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
             
              <Field
                type="password"
                id="user"
                name="password"
                placeholder="Contraseña"
                class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              

            </div>
            <!-- Botones -->
            <div class="flex justify-center space-x-4">
              <button
                type="submit"
                onclick="document.getElementById('myModal').close();"
                class="px-4 py-2 text-white text-sm font-medium rounded-md"
                :style="{
                backgroundColor: isSaveHovered ? 'rgb(21, 131, 89)' : 'rgb(28, 161, 110)'
                }"
                @mouseover="isSaveHovered = true"
                @mouseleave="isSaveHovered = false"
              >
                Guardar
              </button>
              <button
                type="button"
                onclick="document.getElementById('myModal').close();"
                @click="cancelarModal"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                @mouseover="isCancelHovered =true"
                @mouseleave="isCancelHovered=false"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UseUserStore } from "../../store/user.store";
import {onMounted} from "vue";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { UseRolStore } from "../../store/rol.store";
import {CreateUser} from "../../types/user.type";

const validationSchema = yup.object().shape({
  rolId: yup.number().required("Rol es requerido")
 
});

const { handleSubmit, resetForm } = useForm<CreateUser>({
  validationSchema,
});

const showModal = ref(false);
const {rol} = storeToRefs(UseRolStore());
const { CreateUser } = UseUserStore();
const {GetAllRol} = UseRolStore();



const cancelarModal = () => {
  resetForm();
 
  showModal.value = false;
};
onMounted(async()=>{
  await GetAllRol()
});

const isAddHovered = ref(false);
const isSaveHovered = ref(false);
const isCancelHovered = ref(false);

const onSubmit = handleSubmit(async(values)=>{
  await CreateUser(values);
  showModal.value = false;
  resetForm();
})
</script>

<style lang="scss" scoped>
dialog[open] {
  animation: appear 0.15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
  backdrop-filter: blur(3px);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
