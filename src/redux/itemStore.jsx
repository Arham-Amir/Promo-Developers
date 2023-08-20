'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '@api/dbConfig'
import { set, get, ref, child, remove, update } from 'firebase/database'
import { toast } from 'react-toastify';

export const fetchItems = createAsyncThunk('fetchItemsforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items'))
    return resp.val()
  })
export const fetchLandSize = createAsyncThunk('fetchLandSizeforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/LandSize'))
    return resp.val()
  })
export const fetchCategories = createAsyncThunk('fetchItemsCategoriesforDisplay',
  async () => {
    const dbRef = ref(db)
    let obj = {}
    const resp = await get(child(dbRef, 'Development/Items'))
    let resp2 = null;
    for (const element of Object.keys(resp.val())) {
      resp2 = await get(child(dbRef, 'Development/Items/' + element))
      obj[element] = resp2.val();
    }
    return obj
  })
export const setSelectLand = createAsyncThunk('selectLandForCalculator',
  async ({ land }) => {
    const resp = await get(child(ref(db), 'Development/LandSize/' + land))
    toast(land + ' Selected')
    return resp.val()
  })

const itemManagerSlice = createSlice({
  name: 'ItemManager',
  initialState: {
    items: {},
    categories: {},
    land: {},
    selectedLand: {},
    loading: false
  },
  reducers: {
    addItem: (state, action) => {
      state.items[0] = (action.payload)
      set(ref(db, 'Development/Items/' + state.items[0]), 'null')
      get(child(ref(db), 'Development/LandSize')).then(
        (resp) => {
          const data = resp.val()
          for (const size of Object.keys(data)) {
            set(ref(db, 'Development/LandSize/' + size + '/' + action.payload), 0)
          }
        })
      toast('Added')
    },
    addLandSize: (state, action) => {
      set(ref(db, 'Development/LandSize/' + action.payload.size), action.payload.value)
      toast('Added')
    },
    addCategory: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category), { ...action.payload.data })
      toast('added into database');
    },
    editName: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/name'), action.payload.name)
      toast('Name Edited Into Database');
    },
    editPrice: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/price'), action.payload.price)
      toast('Price Edited Into DB');
    },
    editQuantity: (state, action) => {
      set(ref(db, 'Development/LandSize/' + action.payload.land + '/' + action.payload.item), action.payload.quantity)
      toast('Quantity Edited Into DB');
    },
    deleteCategory: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/');
      remove(dbRef).then(() => {
        toast('Category Removed From DB');
      })
        .catch((error) => {
          toast('Error removing category: ' + error.message);
        });

    },
    setRecomendedItemCategory: (state, action) => {
      update(ref(db, 'Development/Items/' + action.payload.item), { 'recomended': action.payload.category })
      toast(`Set Recomended ${action.payload.item}`);
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    }).addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    }).addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })

    builder.addCase(fetchLandSize.pending, (state) => {
      state.loading = true;
    }).addCase(fetchLandSize.fulfilled, (state, action) => {
        state.land = action.payload;
        state.loading = false;
      })

    builder.addCase(setSelectLand.pending, (state, action) => {
      state.loading = true;
    }).addCase(setSelectLand.fulfilled, (state, action) => {
      state.selectedLand = action.payload;
      state.loading = false;
    })
  }
})



export const ItemManagerActions = itemManagerSlice.actions
export default itemManagerSlice
