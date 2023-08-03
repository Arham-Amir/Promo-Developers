'use client'
import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '@api/dbConfig'
import { set, get, ref, child, remove } from 'firebase/database'

const initialState = {
  items: [],
  categories: {},
  loading: false
}
export const fetchItems = createAsyncThunk('fetchItemsforDisplay',
  async () => {
    const dbRef = ref(db)
    const arr = []
    const resp = await get(child(dbRef, 'Development/Items'))
    Object.keys(resp.val()).forEach(element => {
      arr.push(element)
    })
    return arr
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
    console.log(obj)
    return obj
  })
const itemManagerSlice = createSlice({
  name: 'ItemManager',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items[0] = (action.payload)
      set(ref(db, 'Development/Items/' + state.items[0]), 'null')
      alert('Added')
    },
    addCategory: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category), { ...action.payload.data })
      alert('added into database');
    },
    editName: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/name'), action.payload.name)
      alert('Name Edited Into Database');
    },
    editPrice: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/price'), action.payload.price)
      alert('Price Edited Into DB');
    },
    deleteCategory: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload.item + '/' + action.payload.category + '/');
      remove(dbRef).then(() => {
        console.log('Category Removed From DB');
      })
        .catch((error) => {
          console.error('Error removing category: ', error);
        });
      alert('Category Removed From DB');
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    })
      ,
      builder.addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.categories = action.payload;
          state.loading = false;
        })
  }
})



export const ItemManagerActions = itemManagerSlice.actions
export default itemManagerSlice
