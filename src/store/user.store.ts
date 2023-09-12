

import {defineStore} from "pinia";
import { get_user, create_user,update_user,delete_user, get_paginated_users } from "../services/user.service";
import { CreateUser, GetUser,UpdateUser } from "../types/user.type";
import {useToast} from"vue-toastification";
import {paginate} from "../algorith/paginated";

const toast = useToast();
export const UseUserStore = defineStore("user",{
    state: () => ({
        user: [] as GetUser[],
        pages: [] as Array<string | number>,
        paginates: {
            total: 0,
            totalPages: 0,
            nextPag: 0,
            prevPag: 0,
            currentPage: 0,
        },
    }),
    actions:{
        async GetAllUser(){
            try{
                const data = await get_user();
                this.user = data.users;
            } catch {
                toast.error("Error");
            }
        },

        async GetUsers(page: number, take: number){
            try{
                const data = await get_paginated_users(page, take);
                this.user = data.users;
                this.paginates = {
                    total: data.total,
                    totalPages: data.totalPages,
                    currentPage: page,
                    nextPag: data.nextPage,
                    prevPag: data.prevPage,
                };
                this.pages = paginate(page,data.totalPages);
            }catch {
                toast.error("error de servidor")
            }
        },
       
       
        async CreateUser(values: CreateUser) {
            try{
                const data = await create_user(values);

                if (data.ok) {
                    toast.success("Usuario creado");
                    await this.GetAllUser()
                    await this.GetUsers(this.paginates.currentPage, 5);

                }else{
                    toast.error("Error al crear el usuario");
                }
            } catch (error) {
                toast.error("Error en el servidor");
            }
        },

        async DeleteUser(id: number){
            try{
                const data = await delete_user(id);
                if (data.ok){
                    const currentPage = this.paginates.currentPage;
                    const totalUsers = this.user.length;
                    await this.GetAllUser()
                    toast.success("Usuario eliminado");

                    if (currentPage > 1 && totalUsers === 1){
                        await this.GetUsers(currentPage - 1, 5);
                  }else{
                    await this.GetUsers(currentPage, 5)
                  }
                }
            } catch{
                toast.error("Error");
            }
        },

        async UpdateUser(id: number, values: UpdateUser){
            try{
                const data = await update_user(id, values);
               if (data.ok){
                    toast.info("Usuario actualizado");
                    await this.GetAllUser()
                    await this.GetUsers(this.paginates.currentPage, 5);
                }else {
                    toast.error("Error al actualizar el usuario");
                }
            } catch (error) {
                toast.error("Error en el servidor");
            }
        },
    },
});