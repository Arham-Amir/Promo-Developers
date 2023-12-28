'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from '@api/dbConfig'
import { set, get, ref, child, remove, update } from 'firebase/database'
import { ref as sref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage'
import { toast } from 'react-toastify';

async function checkPathAvailable(path) {
  const snapshot = await get(path);
  if (!snapshot.exists()) {
    return false
  }
  return true
}
export const addItemsHeading = createAsyncThunk('addItemHeading',
  async (action) => {
    const dbRef = child(ref(db), 'Development/Items/' + action);
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Heading Already Available')
    }
    else {
      await update(ref(db, 'Development/Items/'), { [action]: 'null' })
      toast('Add Items Category')
    }
  })
export const shiftItems = createAsyncThunk('shiftItemsDisplay',
  async ({ item, head }) => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items/' + item))
    update(ref(db, 'Development/Items/' + head), { [item]: resp.val() })
    return true
  })
export const fetchItemsHeadings = createAsyncThunk('fetchItemsHeadingsforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items'))
    return resp.val()
  })
export const checkLandAvailaibility = createAsyncThunk('checkLandAvailaibilityForUpdate',
  async (land) => {
    const dbRef = ref(db);
    const landSizeRef = child(dbRef, 'Development/LandSize');
    try {
      const landSizeSnapshot = await checkPathAvailable(landSizeRef)
      if (!landSizeSnapshot) {
        await set(landSizeRef, {});
      }
      const landRef = child(landSizeRef, land);
      const landSnapshot = await checkPathAvailable(landRef)
      if (!landSnapshot) {
        await set(landRef, { 'images': "null" });
      }
    } catch (error) {
      console.error('Error checking land availability:', error);
    }
  }
)
export const fetchLandInfo = createAsyncThunk('fetchLandInfoForDisplay',
  async () => {
    try {
      const dbRef = ref(db)
      const resp = await get(child(dbRef, 'Development/LandSize/'))
      return resp.val()
    } catch (error) {
      return []
    }
  }
)
export const fetchLandExtraInfo = createAsyncThunk('fetchLandExtraInfoForDisplay',
  async (land) => {
    try {
      const dbRef = ref(db)
      const resp = await get(child(dbRef, 'Development/LandSize/' + land))
      return resp.val()
    } catch (error) {
      return {}
    }
  }
)
export const fetchLandSize = createAsyncThunk('fetchLandSizeforDisplay',
  async (are) => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Areas/' + are))
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
export const uploadMaps = createAsyncThunk('uploadMapsforDisplay',
  async ({ land, images }) => {
    const downloadURLs = [];
    try {
      await deleteFolder(land);
      const uploadPromises = Object.keys(images).map(async (imgKey) => {
        const imageFile = images[imgKey];
        const storageref = sref(storage, "Maps/" + land + "/" + imageFile.name);
        const uploadTask = uploadBytesResumable(storageref, imageFile);

        return new Promise(async (resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                downloadURLs.push(downloadURL);
                resolve();
              } catch (err) {
                reject(err);
              }
            }
          );
          await uploadTask;
        });
      });

      await Promise.all(uploadPromises);
      console.log(downloadURLs);
      const dbRef = ref(db);
      const landRef = child(dbRef, 'Development/LandSize/' + land + "/images");
      await set(landRef, downloadURLs);
    }
    catch (error) {
      console.error("Error during image upload:", error);
      throw error;
    }
  })
async function deleteFolder(land) {
  const desertRef = sref(storage, "Maps/" + land);
  const res = await listAll(desertRef);
  for (const itemRef of res.items) {
    await deleteObject(itemRef);
  }
}

const itemManagerSlice = createSlice({
  name: 'ItemManager',
  initialState: {
    items: {},
    categories: [],
    headings: {},
    land: {},
    landInfo: {},
    areas: {},
    selectedLand: {},
    RCC: {},
    PlinthADD: {},
    PlinthSUB: {},
    Radday: {},
    loading: false,
    headingloading: true,
    arealoading: false,
    loading_land: true,
    landOtherLoading: true,
  },
  reducers: {
    addItem: (state, action) => {
      // state.items[0] = (action.payload['item'])
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
    addLandExtraInfo: (state, action) => {
      set(ref(db, 'Development/LandSize/' + action.payload['land'] + '/' + action.payload['place'] + '/'), action.payload.value)
      toast((action.payload['place'] + ' Updated'));
    },
    editOrder: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + "/order"), action.payload['order'])
      toast('Order Edited Into Database');
    },
    editName: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/' + action.payload['category'] + '/name'), action.payload.name)
      toast('Name Edited Into Database');
    },
    editPrice: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/' + action.payload['category'] + '/price'), action.payload.price)
      toast('Price Edited Into DB');
    },
    editQuantity: (state, action) => {
      set(ref(db, 'Development/Areas/' + action.payload.area + '/' + action.payload.land + '/' + action.payload.item), action.payload.quantity)
      toast('Quantity Edited Into DB');
    },
    editItemUnit: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/itemUnit'), action.payload['unit'])
      toast('Item Unit Edited Into DB');
    },
    editSqFeet: (state, action) => {
      set(ref(db, 'Development/Areas/' + action.payload.area + '/' + action.payload.land + '/squareFeet'), action.payload.squareFeet)
      toast('Square Feet Edited Into DB');
    },
    deleteItem: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item']);
      remove(dbRef).then(() => {
        get(child(ref(db), 'Development/Areas')).then(
          (resp) => {
            const data = resp.val()
            Object.keys(data).forEach(area => {
              Object.keys(data[area]).forEach(land => {
                remove(ref(db, 'Development/Areas/' + area + '/' + land + '/' + action.payload['item']))
              });
            });
            toast('Item Removed From DB');
          })
      })
        .catch((error) => {
          toast('Error removing category: ' + error.message);
        });

    },
    deleteItemHeading: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head']);
      remove(dbRef)
    },
    deleteCategory: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/' + action.payload['category'] + '/');
      remove(dbRef).then(() => {
        toast('Category Removed From DB');
      })
        .catch((error) => {
          toast('Error removing category: ' + error.message);
        });

    },
    deleteLandSize: (state, action) => {
      const dbRef = ref(db, 'Development/Areas/' + action.payload['area'] + '/' + action.payload['land'] + '/');
      remove(dbRef).then(() => {
        toast('Land Removed From DB');
      })
        .catch((error) => {
          toast('Error removing category: ' + error.message);
        });

    },
    setRecomendedItemCategory: (state, action) => {
      update(ref(db, 'Development/Items/' + action.payload.head + '/' + action.payload.item), { 'recomended': action.payload.category })
      toast(`Set Recomended ${action.payload.item}`);
    },
    setLoading: (state) => {
      state.loading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsHeadings.pending, (state) => {
      state.headingloading = true;
    }).addCase(fetchItemsHeadings.fulfilled, (state, action) => {
      state.headings = action.payload;
      state.headingloading = false;
    }).addCase(fetchCategories.pending, (state) => {
      // state.catloading = true;
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      // state.catloading = false;
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
    }).addCase(checkLandAvailaibility.pending, (state) => {
      // state.loading = true;
    }).addCase(checkLandAvailaibility.fulfilled, (state, action) => {
      // state.land = action.payload;
      // state.loading = false;
    }).addCase(fetchLandInfo.pending, (state) => {
      state.loading_land = true;
    }).addCase(fetchLandInfo.fulfilled, (state, action) => {
      state.landInfo = action.payload;
      state.loading_land = false;
    }).addCase(uploadMaps.pending, (state) => {
      state.loading_land = true;
    }).addCase(uploadMaps.fulfilled, (state, action) => {
      toast('Images Added Successfully')
    }).addCase(fetchLandExtraInfo.pending, (state) => {
      state.landOtherLoading = true
    }).addCase(fetchLandExtraInfo.fulfilled, (state, action) => {
      state.RCC = action.payload["RCC"] || {}
      state.PlinthADD = action.payload["PlinthADD"] || {}
      state.PlinthSUB = action.payload["PlinthSUB"] || {}
      state.Radday = action.payload["Radday"] || {}
      state.landOtherLoading = false
    })
  }
})



export const ItemManagerActions = itemManagerSlice.actions
export default itemManagerSlice
