'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '@api/dbConfig'
import { set, get, ref, child, remove, update } from 'firebase/database'
import { toast } from 'react-toastify';

export const fetchItems = createAsyncThunk('fetchItemsforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items'))
    return await resp.val()
    // const data = await resp.val()
    // let temp = {}
    // let resp2 = ''
    // for (const head of Object.keys(data)) {
    //   resp2 = await get(ref(db, 'Development/Items/' + head))
    //   temp = {...temp, ...resp2.val() }
    // }
    // return temp
  })
export const shiftItems = createAsyncThunk('shiftItemsDisplay',
  async ({ item, head }) => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items/' + item))
    console.log(resp.val())
    update(ref(db, 'Development/Items/' + head), { [item]: resp.val() })
    console.log(db + 'Development/Items/' + head)
    return true
  })
export const fetchItemsHeadings = createAsyncThunk('fetchItemsHeadingsforDisplay',
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
    const resp = await get(child(dbRef, 'Development/Items'))
    return await resp.val()
  })
export const fetchAreas = createAsyncThunk('fetchAreasforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Areas'))
    return await resp.val()
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
    headings: {},
    land: {},
    areas: {},
    selectedLand: {},
    loading: false,
    catloading: false,
    arealoading: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.items[0] = (action.payload['item'])
      set(ref(db, 'Development/Items/' + action.payload['itemHead'] + '/' + action.payload['item']), 'null')
      get(child(ref(db), 'Development/Areas')).then(
        (resp) => {
          const data = resp.val()
          Object.keys(data).forEach(area => {
            Object.keys(data[area]).forEach(land => {
              set(ref(db, 'Development/Areas/' + area + '/' + land + '/' + action.payload['item']), 0)
            });
          });
        })
      toast('Add Item in DataBase')
    },
    addItemsHeading: (state, action) => {
      console.log('hi', action.payload)
      update(ref(db, 'Development/Items/'), { [action.payload]: 'null' })
      toast('Add Items Category')
    },
    addLandSize: (state, action) => {
      set(ref(db, 'Development/Areas/' + action.payload.areaName + '/' + action.payload.size), action.payload.value)
      toast('Add ' + action.payload.size + ' Land Size in ' + action.payload.areaName)
    },
    addAreaName: (state, action) => {
      set(ref(db, 'Development/Areas/' + action.payload.area), action.payload.value)
      toast('Added')
    },
    addCategory: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.head + '/' + action.payload.item + '/' + action.payload.category), { ...action.payload.data })
      toast('Category added into database');
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
      set(ref(db, 'Development/Areas/' + action.payload.area + '/' + action.payload.land + '/' + action.payload.item), action.payload.quantity)
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
    setLoading: (state) => {
      state.loading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    }).addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    }).addCase(fetchItemsHeadings.pending, (state) => {
      state.loading = true;
    }).addCase(fetchItemsHeadings.fulfilled, (state, action) => {
      state.headings = action.payload;
      state.loading = false;
    }).addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.catloading = true;
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.catloading = false;
    }).addCase(fetchAreas.pending, (state) => {
      state.loading = true;
      state.arealoading = true;
    }).addCase(fetchAreas.fulfilled, (state, action) => {
      state.areas = action.payload;
      state.loading = false;
      state.arealoading = false;
    }).addCase(fetchLandSize.pending, (state) => {
      state.loading = true;
    }).addCase(fetchLandSize.fulfilled, (state, action) => {
      state.land = action.payload;
      state.loading = false;
    }).addCase(setSelectLand.pending, (state) => {
      state.loading = true;
    }).addCase(setSelectLand.fulfilled, (state, action) => {
      state.selectedLand = action.payload;
      state.loading = false;
    })
  }
})



export const ItemManagerActions = itemManagerSlice.actions
export default itemManagerSlice
