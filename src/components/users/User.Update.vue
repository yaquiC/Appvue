<template>
  <div>
      <button @click="showModal = true"
          class="flex items-center text-white font-semibold py-2 px-4 rounded-full shadow-md"
          :style="{ backgroundColor: isAddHovered ? 'rgb(1, 132, 92)' : 'rgb(1, 91, 64)' }"
          @mouseover="isAddHovered = true" @mouseleave="isAddHovered = false">
          <span>Actualizar</span>
      </button>

      <div v-show="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-medium mb-4 text-center">Actualizar usuario</h3>

              <form @submit="onSubmit">

                  <div class="flex flex-col w-full mt-1">
                      <label class="block text-gray-700 text-sm font-medium mb-1">Rol</label>
                      <field v-model="form.rolId" name="rolId" as="select" class="w-full h-10 border rounded-xl mb-4">
                          <option disabled value="">Seleccione un Rol</option>
                          <option v-for="roles in rol" :value="roles.id" :key="roles.id">
                                  {{ roles.rol }}
                              </option>
                      </field>
                  </div>

                  <div class="flex flex-col w-full mt-1">

                      <field v-model="form.name" as="input" @input="formModified = true" type="text" name="name"
                          placeholder="Nombre"
                          class="mt-1 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                     

                      <field v-model="form.lastName" as="input" @input="formModified = true" type="text" name="lastName"
                          placeholder="Apellido"
                          class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                      

                      <Field v-model="form.age" as="input" @input="formModified = true" type="text" name="age"
                          placeholder="Edad"
                          class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                      

                      <Field v-model="form.gender" as="input" @input="formModified = true" type="text" name="gender"
                          placeholder="Genero"
                          class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                      

                      <Field v-model="form.email" as="input" @input="formModified = true" type="text" name="email"
                          placeholder="Correo"
                          class="mt-2 p-2 block w-full rounded-md bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                      

                     

                      <!-- botones -->
                      <div class="flex justify-end">
                          <button type="submit" class="px-4 py-2 text-white text-sm font-medium rounded-md" :style="{
                              backgroundColor: isSaveHovered ? 'rgb(21, 131, 89)' : 'rgb(28, 161, 110)'
                          }" @mouseover="isSaveHovered = true" @mouseleave="isSaveHovered = false">
                              Actualizar
                          </button>
                          <button type="button" @click="cancelarModal"
                              class="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2" :style="{
                                  backgroundColor: isCancelHovered ? 'rgb(212, 237, 224)' : 'rgb(231, 243, 239)'
                              }" @mouseover="isCancelHovered = true" @mouseleave="isCancelHovered = false">
                              Cancelar
                          </button>
                      </div>
                  </div>

              </form>
          </div>
      </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { UseUserStore } from '../../store/user.store';
import { GetUser, UpdateUser } from "../../types/user.type.ts"
import { Field, useForm } from 'vee-validate';
import { storeToRefs } from "pinia";
import { UseRolStore } from '../../store/rol.store';


const {  user } = defineProps<{ user: GetUser }>();

const { rol } = storeToRefs(UseRolStore());
const { GetAllRol } = UseRolStore();

const { handleSubmit, resetForm } = useForm<UpdateUser>({
  // validationSchema
})

const showModal = ref(false)
const { UpdateUser } = UseUserStore();
const form = ref({
name: user.name,
rolId: user.rolId,
lastName: user.lastName,
age: user.age,
gender: user.gender,
email: user.email,
password: user.password,

})

const cancelarModal = () => {
  resetForm();
  formModified.value = false;
  showModal.value = false;
};

const onSubmit = handleSubmit(async (values) => {
 await UpdateUser(user.id, values);
  showModal.value = false;
});

// const modalOpenedBefore = false;
onMounted(async () => {
  // if()
  await GetAllRol()
})

const isAddHovered = ref(false);
const isSaveHovered = ref(false);
const isCancelHovered = ref(false);

const formModified = ref(false);

</script>

<style lang="scss" scoped>
dialog[open] {
  animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
  backdrop-filter: blur(3px);
}


// @keyframes appear {
//   from {
//       opacity: 0;
//       transform: translateX(-3rem);
//   }

//   to {
//       opacity: 1;
//       transform: translateX(0);
//     }
// }
</style>