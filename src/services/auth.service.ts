
import axios from 'axios';
import { API_URL } from '../utils/contans';
import { MakeLoginData, Response } from '../types/auth.type';
import {router} from '../routes/route';
import { RemoveToken } from '../utils/persists';

export async function make_login(values:MakeLoginData) {
    const data = await axios.post<Response>(API_URL + "/user/login",values);
    return data
}

export async function log_out() {
    RemoveToken();
    router.push('/auth');
    
};

