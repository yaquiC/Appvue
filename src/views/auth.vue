<template>
  <div class="bg-blue-200 w-full h-screen">
    
    <form @submit="onSubmit">
    <div class="flex justify-center h-screen w-screen items-center">
      <div class="w-full md:w-1/2 flex flex-col items-center">
        <!--text login-->
        <h1 class="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
        <!-- email  -->
        <div class="w-3/4 mb-6">
          <Field
          name="email"
          type="email"
            
            id="email"
            class="w-full py-4 px-8 bg-white placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
            class="text-red-600 text-sm"
          ></ErrorMessage>
        </div>
        <!-- password  -->
        <div class="w-3/4 mb-6">
          <Field
            type="password"
            name="password"
            id="password"
            class="w-full py-4 px-8 bg-white placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Password"
          />
          <ErrorMessages
          name="password"
          class="text-red-600 text-sm"
          ></ErrorMessages>
        </div>
        <!--button -->
        <div class="w-3/4 mt-4">
          <button type="submit" class="py-4 bg-blue-600 w-full rounded text-blue-50 font-bold hover:bg-blue-700" >  LOGIN</button>
          <a href=""></a>
        </div>
      </div>
    </div>
  </form>
  </div>
</template>

<script lang="ts" setup>
 import * as yup from 'yup';
  import { useForm , Field , ErrorMessage} from "vee-validate";
  import { UseAuthStore } from "../store/auth.store";

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email es requerido!"),
    password: yup.string().required("password es requerido"),
  });

  const {handleSubmit} =useForm({
    initialValues: { email: "", password:""},
    validationSchema,
  });

  const {MakeLogin} = UseAuthStore();

  const onSubmit = handleSubmit(async (values) => {
    MakeLogin(values);
  });


</script>


<style lang="scss" scoped></style>
