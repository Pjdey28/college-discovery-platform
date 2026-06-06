import { create } from "zustand";

interface CompareStore {

  colleges:any[];

  addCollege:
  (college:any)=>void;

  removeCollege:
  (id:string)=>void;

  clearCompare:
  ()=>void;
}

export const useCompareStore =
create<CompareStore>((set)=>({

  colleges:[],

  addCollege:(college)=>

    set((state)=>{

      if(
        state.colleges.find(
          c=>c.id===college.id
        )
      ){
        return state;
      }

      if(
        state.colleges.length >= 3
      ){
        return state;
      }

      return {
        colleges:[
          ...state.colleges,
          college
        ]
      };
    }),

  removeCollege:(id)=>

    set((state)=>({

      colleges:
      state.colleges.filter(
        c=>c.id!==id
      )
    })),

  clearCompare:()=>

    set({
      colleges:[]
    })
}));