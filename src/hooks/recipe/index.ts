import api from "@/service"
import FindMany from "@/shared/find-many.interface";
import { AxiosResponse } from "axios";
import {
    useQuery,
  } from '@tanstack/react-query';

const findMany = async ({skip, take, search}:FindMany) => {
    try{
        const {data} = await api.get('/recipes', {
            params: {
                skip,
                take,
                search,
            }
        }) as AxiosResponse<{total:number, records: []}>

        return data;

    }catch(error:any){
       console.log(error?.response?.data)
       return false;
    }
}

 const useRecipes = ({skip, take,search}: FindMany) => {
    return useQuery({
        queryKey: ['meals',skip,take, search],
        queryFn: () => findMany({skip, take, search}),
        staleTime: 600000,
        refetchInterval: 600000,
        refetchOnWindowFocus: false, 
        refetchOnReconnect: true,   
      });
 }


export  {findMany,useRecipes}


