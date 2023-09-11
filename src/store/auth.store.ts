import { defineStore } from "pinia";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { router } from '../routes/route';
import { make_login } from "../services/auth.service";
import { AddToken, RemoveToken } from "../utils/persists";
import { MakeLoginData } from "../types/auth.type";
import { AxiosError} from "axios";

export const UseAuthStore = defineStore('auth',{
    state: () => ({
        token: '' as string,
    }),
    actions:{
        async MakeLogin(data_send: MakeLoginData){
            try {
                const {data} = await make_login(data_send);
                console.log(data);
                if (data.token) {
                    router.push('/dashboard');
                    this.token = data.token;
                    AddToken(data.token);

                    Swal.fire({
                        icon:'success',
                        title:'Inicio de Sesion',
                        text:'¡Bienvenido!',
                        showConfirmButton:false,
                        timer:2000,
                    });
                }
            } catch (error:unknown) {
                if (isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response && axiosError.response.status ===401) {
                        Swal.fire({
                            icon:'error',
                            title:'Error',
                            text:'Las credenciales de inicio de sesion son incoorectas.',
                            showConfirmButton:false,
                            timer:2000,
                        });
                    }
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Error',
                        text:'Ha ocurrido un problema al iniciar sesion.',
                        showConfirmButton:false,
                        timer:2000,
                    });
                }
            }
        },
        MakeLogout(){
            RemoveToken();
            router.push('/auth');

            Swal.fire({
                icon:'info',
                title:'cierre de sesion',
                text:'¡Ha cerrado sesion correctamente!',
                showConfirmButton:false,
                timer:2000,
            });
        },
    },
});

function isAxiosError(error:unknown): error is AxiosError {
    return(error as AxiosError).isAxiosError !== undefined;
}
    