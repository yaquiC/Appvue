
import {defineStore} from"pinia";
import { get_rol, create_rol, update_rol,delete_rol } from "../services/rol.service";
import { GetRol, RolPayload } from "../types/rol.type";
import {useToast} from "vue-toastification";

const toast = useToast();
export const UseRolStore = defineStore("rol",{
    state:() => ({
        rol: [] as GetRol[],
        pages:[] as Array<string |number>,
        paginates:{
            total:0,
            totalPages:0,
            nextPages:0,
            prevPages:0,
            currentPage:0,
        },
    }),

    actions:{
        async GetAllRol(){
            try {
                const data = await get_rol();
                this.rol = data.rol;
            } catch  {
               toast.error("Error");
            }
        },

        async CreateRol(rol:string){
           
                const data = await create_rol(rol);
                
                if (data.ok) {
                    toast.success("Rol creado")
                    await this.GetAllRol()
                } else {
                    toast.success("Error al crear Rol")
                }
           
             } ,

        async UpdateRol( id:number, rol: string){
            try {
                const data = await update_rol(id, rol);
                if (data.ok) {
                    toast.info("rol actualizado")
                    await this.GetAllRol()
                } else {
                    toast.error("Error al actualizar Rol")
                }
            } catch (error) {
                toast.error("Error el servidor")
            }
        },

        async DeleteRol(id:number){
            try {
                const data = await delete_rol(id);
                    if (data.ok) {
                        toast.success("Rol eliminado");
                        await this.GetAllRol()
                    }
            } catch  {
                toast.error("Error");
            }
        },
    },
});