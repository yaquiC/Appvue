<template>
    <div >
      <div class="z-40 absolute w-[81.5%] h[calc(100% -20%)] left-[18.5%] top-[10%] flex justify-center ">
        <button 
        @click="showModal = true"
        class="flex items-center text-white font-semibold py-2 px-4 rounded-full shadow-md"
        :style="{
        backgroundColor: isAddHovered ? 'rgb(21, 131, 89)' : 'rgb(28, 161, 110)'
        }"
        @mouseover="isAddHovered = true"
        @mouseleave="isAddHovered = false"
      >
        <oh-vue-icon name="io-add-circle" class="m-1"></oh-vue-icon>
        <span>Agregar</span>
      </button>
      </div>
      
      <div
        v-show="showModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium mb-4 text-center">Agregar Rol</h3>
          <form @submit="onSubmit">
            <div class="mb-4">
              <label for="rol" class="block text-gray-700 text-sm font-medium mb-1"
                >Rol</label
              >
              <Field
                name="rol"
                as="input"
                type="text"
                class="w-full h-10 p-4 border rounded-xl"
                placeholder="Ingrese el rol"
                @input="formModified = true"
              />
              <ErrorMessage name="rol" v-slot="{ message }">
                <p class="font-semibold text-red-600 text-sm">{{ message }}</p>
              </ErrorMessage>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
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
                @click="cancelarModal"
                class="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                :style="{
                backgroundColor: isCancelHovered ? 'rgb(212, 237, 224)' : 'rgb(231, 243, 239)'
                }"
                @mouseover="isCancelHovered = true"
                @mouseleave="isCancelHovered = false"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { UseRolStore } from '../../store/rol.store';
    import * as yup from "yup"
    import { Field, useForm, ErrorMessage } from 'vee-validate'

    const validationSchema = yup.object().shape({
        rol: yup.string().required("Rol es requerido")
    });

    const { handleSubmit, resetForm } = useForm({
        validationSchema
    });

    const showModal = ref(false);
    const { CreateRol } = UseRolStore();
    const formModified = ref(false);
    const onSubmit = handleSubmit(async (values) => {
        await CreateRol(values.rol);
        resetForm();
        formModified.value = false;
        showModal.value = false;
    });

    const cancelarModal = () => {
        resetForm();
        formModified.value = false;
        showModal.value = false;
    }

    const isAddHovered = ref(false);
    const isSaveHovered = ref(false);
    const isCancelHovered = ref(false);

</script>

<style lang="scss" scoped>
dialog[open] {
    animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
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