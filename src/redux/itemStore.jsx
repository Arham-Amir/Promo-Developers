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
export const setDate = createAsyncThunk('setDate',
  async (date) => {
    await set(ref(db, 'Development/Date'), date)
    toast('Date Saved Successfully')
  })
export const getDate = createAsyncThunk('getDate',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Date'))
    return resp.val()
  })
export const getUserLogs = createAsyncThunk('getUserLogs',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'UsersLog'))
    return await resp.val()
  })
export const addItem = createAsyncThunk('addItem',
  async (action) => {
    const dbRef = child(ref(db), 'Development/Items/' + action['itemHead'] + '/' + action['item']);
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Item Already Available')
    }
    else {
      await set(ref(db, 'Development/Items/' + action['itemHead'] + '/' + action['item']), 'null')
      get(child(ref(db), 'Development/Areas')).then(
        (resp) => {
          const data = resp.val()
          Object.keys(data).forEach(area => {
            Object.keys(data[area]).forEach(land => {
              set(ref(db, 'Development/Areas/' + area + '/' + land + '/' + action['item']), 0)
            });
          });
        })
      toast('Item Added into DataBase')
    }
  })
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
export const addFinishingItemsHeading = createAsyncThunk('addFinishingItemsHeading',
  async (action) => {
    const dbRef = child(ref(db), 'Finishing/' + action);
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Heading Already Available')
    }
    else {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map(async (key) => {
        await set(ref(db, 'Finishing/' + key + "/" + action), 'null')
      })
      toast('Add Finishing Items Category')
    }
  })
export const addLandSize = createAsyncThunk('addLandSize',
  async ({ area, land, value }) => {
    const dbRef = child(ref(db), 'Development/Areas/' + area + '/' + land);
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Land Already Available')
    }
    else {
      await update(ref(db, 'Development/Areas/' + area + '/'), { [land]: value })
      toast('Add ' + land + ' Land Size in ' + area)
    }
  })
export const addCommonLandSize = createAsyncThunk('addCommonLandSize',
  async ({ land }) => {
    const dbRef = child(ref(db), 'Development/LandSize/' + land);
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Land Already Available')
    }
    else {
      await set(ref(db, 'Development/LandSize/' + land), 'null')
      toast('Land Added Successfully.')
    }
  })
export const addAreaName = createAsyncThunk('addAreaName',
  async ({ area, value }) => {
    const dbRef = child(ref(db), 'Development/Areas/' + area)
    const resp = await checkPathAvailable(dbRef)
    if (resp) {
      toast('Area Already Available')
    }
    else {
      await set(ref(db, 'Development/Areas/' + area), value)
      toast('Area Added Successffully')
    }
  })
export const shiftItems = createAsyncThunk('shiftItemsDisplay',
  async ({ item, head }) => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items/' + item))
    update(ref(db, 'Development/Items/' + head), { [item]: resp.val() })
    return true
  })
export const fetchMembers = createAsyncThunk('fetchMembersforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Members'))
    return await resp.val()
  })
export const fetchFinishingItems = createAsyncThunk('fetchFinishingItemsforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, '/Finishing'))
    return await resp.val()
  })
export const fetchItemsHeadings = createAsyncThunk('fetchItemsHeadingsforDisplay',
  async () => {
    const dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items'))
    return resp.val()
  })
export const fetchLandInfo = createAsyncThunk('fetchLandInfoForDisplay',
  async () => {
    try {
      const dbRef = ref(db)
      const resp = await get(child(dbRef, 'Development/LandSize/'))
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
export const renameCategory = createAsyncThunk('renameCategoryforDisplay',
  async (action) => {
    let dbRef = ref(db)
    const resp = await get(child(dbRef, 'Development/Items/' + action['head']))
    await set(ref(db, 'Development/Items/' + action['name']), await resp.val())
    dbRef = ref(db, 'Development/Items/' + action['head']);
    await remove(dbRef)
    toast('Category Renamed Successfully')
  })
export const renameFinishingCategory = createAsyncThunk('renameFinishingCategory',
  async (action) => {
    let dbRef = ref(db)
    const keys = ["Standard", "Premium", "Luxury"]
    await Promise.all(keys.map(async (key) => {
      const resp = await get(child(dbRef, 'Finishing/' + key + "/" + action['category']));
      await set(ref(db, 'Finishing/' + key + "/" + action['name']), await resp.val());
      dbRef = ref(db, 'Finishing/' + key + "/" + action['category']);
      await remove(dbRef);
    }));
    toast('Category Renamed Successfully')
  })
export const uploadMaps = createAsyncThunk('uploadMapsforDisplay',
  async ({ area, land, images }) => {
    const downloadURLs = [];
    try {
      await deleteFolder("Maps/" + area + '/' + land);
    }
    catch (error) {
      console.error(error)
    }
    try {
      const uploadPromises = Object.keys(images).map(async (imgKey) => {
        const imageFile = images[imgKey];
        const storageref = sref(storage, "Maps/" + area + "/" + land + "/" + imageFile.name);
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
      const dbRef = ref(db);
      const landRef = child(dbRef, 'Development/Areas/' + area + '/' + land + "/images");
      downloadURLs.sort()
      await set(landRef, downloadURLs);
    }
    catch (error) {
      console.log(error)
      return
    }

  })
export const uploadMemberLogo = createAsyncThunk('uploadMemberLogoforDisplay',
  async ({ name, images }) => {
    const downloadURLs = [];
    try {
      const uploadPromises = Object.keys(images).map(async (imgKey) => {
        const imageFile = images[imgKey];
        const storageref = sref(storage, "Members/" + name + "/" + imageFile.name);
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
      const dbRef = ref(db);
      const landRef = child(dbRef, 'Members/' + name);
      await set(landRef, downloadURLs);
      toast.success("Member Added Successfully")
    }
    catch (error) {
      throw error;
    }
  })
async function deleteFolder(land) {
  try {
    const desertRef = sref(storage, land);
    const res = await listAll(desertRef)
    for (const itemRef of res.items) {
      await deleteObject(itemRef);
    }
  }
  catch (error) {
    console.error(error)
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
    userLogs: {},
    members: {},
    finishingItems: {},
    lastPriceUpdateDate: "",
    loading: false,
    dateloading: true,
    logsloading: true,
    headingloading: true,
    arealoading: false,
    landloading: true,
    membersloading: true,
    finishingItemsloading: true,
    imageUploading: false,
  },
  reducers: {
    addUserForLog: (state, action) => {
      set(ref(db, 'UsersLog/' + action.payload["id"]), action.payload["data"])
      toast.success("Thanks for filling the form.")
    },
    addFinishingItem: (state, action) => {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map((key) => {
        set(ref(db, 'Finishing/' + key + "/" + action.payload["itemHead"] + "/" + action.payload["item"]), "null")
      })
      toast.success("Item Added into Finishing.")
    },
    addCategory: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload.head + '/' + action.payload.item + '/' + action.payload.category), { ...action.payload.data })
      toast('Category added into database');
    },
    addLandExtraInfo: (state, action) => {
      set(ref(db, 'Development/LandSize/' + action.payload['land'] + '/' + action.payload['place'] + '/'), action.payload.value)
      toast((action.payload['place'] + ' Updated'));
    },
    addByLaws: (state, action) => {
      set(ref(db, 'Development/Areas/' + action.payload['area'] + '/' + action.payload['land'] + '/ByLaws/'), action.payload['value'])
      toast("ByLaws Updated SuccessFully");
    },
    editCategoryOrder: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + "/order"), action.payload['order'])
      toast('Order Edited Into Database');
    },
    editFinishingPakcageOrder: (state, action) => {
      set(ref(db, 'Finishing/' + action.payload['head'] + "/order"), action.payload['order'])
      toast('Order Edited Into Database');
    },
    editFinishingCategoryOrder: (state, action) => {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map((key) => {
        set(ref(db, 'Finishing/' + key + "/" + action.payload['category'] + "/order"), action.payload['order'])
      })
      toast('Order Edited Into Database');
    },
    editFinishingItemPrice: (state, action) => {
      set(ref(db, 'Finishing/' + action.payload['package'] + "/" + action.payload['category'] + "/" + action.payload['item'] + "/price"), action.payload['price'])
      toast('Price Edited Into Database');
    },
    editFinishingItemOrder: (state, action) => {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map((key) => {
        set(ref(db, 'Finishing/' + key + "/" + action.payload['category'] + "/" + action.payload['item'] + "/order"), action.payload['order'])
      })
      toast('Order Edited Into Database');
    },
    editItemOrder: (state, action) => {
      set(ref(db, 'Development/Items/' + action.payload['head'] + "/" + action.payload['item'] + "/order"), action.payload['order'])
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
    setLogCheck: (state, action) => {
      set(ref(db, 'UsersLog/' + action.payload["user"] + "/status"), action.payload["value"])
      toast('Log Status Updated');
    },
    deleteMember: (state, action) => {
      const dbRef = ref(db, 'Members/' + action.payload["member"]);
      remove(dbRef)
      deleteFolder("Members/" + action.payload["member"]);
      toast.success('Member Deleted Successfully');
    },
    deleteLog: (state, action) => {
      const dbRef = ref(db, 'UsersLog/' + action.payload["user"]);
      remove(dbRef)
      toast('Log Deleted Successfully');
    },
    deleteOldLogs: (state, action) => {
      set(ref(db, 'UsersLog/'), action.payload["value"])
      toast('Old Logs Deleted Successfully');
    },
    deleteFinishingCategory: (state, action) => {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map((key) => {
        remove(ref(db, 'Finishing/' + key + "/" + action.payload['category']))
      })
      toast.success("Item deleted from Finishing categories.")
    },
    deleteFinishingItem: (state, action) => {
      const keys = ["Standard", "Premium", "Luxury"]
      keys.map((key) => {
        remove(ref(db, 'Finishing/' + key + "/" + action.payload['category'] + "/" + action.payload["item"]))
      })
      toast.success("Item deleted from Finishing categories.")
    },
    deleteItem: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item']);
      remove(dbRef).then(() => {
        get(child(ref(db), 'Development')).then(
          (resp) => {
            const data = resp.val()
            Object.keys(data["Areas"]).forEach(area => {
              Object.keys(data["Areas"][area]).forEach(land => {
                remove(ref(db, 'Development/Areas/' + area + '/' + land + '/' + action.payload['item']))
              });
            });
            Object.keys(data["LandSize"]).forEach(land => {
              Object.keys(data["LandSize"][land]).forEach(el => {
                try {
                  remove(ref(db, 'Development/LandSize/' + land + '/' + el + '/' + action.payload['item']))
                } catch (error) {
                }
              });
            });
            toast('Item Removed From DB');
          })
      })
        .catch((error) => {
          toast('Error removing category: ' + error.message);
        });

    },
    deleteCommonLand: (state, action) => {
      const dbRef = ref(db, 'Development/LandSize/' + action.payload['land']);
      remove(dbRef)
      toast('Land Deleted Successfully');
    },
    deleteItemHeading: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head']);
      remove(dbRef)
    },
    deleteCategory: (state, action) => {
      const dbRef = ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/' + action.payload['category'] + '/');
      remove(dbRef).then(() => {
        get(child(ref(db), 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/recomended')).then(
          (resp) => {
            if (resp && resp.val() == action.payload['category']) {
              remove(ref(db, 'Development/Items/' + action.payload['head'] + '/' + action.payload['item'] + '/recomended'))
            }
          })
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
      state.arealoading = true;
    }).addCase(fetchAreas.fulfilled, (state, action) => {
      state.areas = action.payload;
      state.arealoading = false;
    }).addCase(fetchLandSize.pending, (state) => {
      state.loading = true;
    }).addCase(fetchLandSize.fulfilled, (state, action) => {
      state.land = action.payload;
      state.loading = false;
    }).addCase(fetchLandInfo.pending, (state) => {
      state.landloading = true;
    }).addCase(fetchLandInfo.fulfilled, (state, action) => {
      state.landInfo = action.payload;
      state.landloading = false;
    }).addCase(uploadMaps.pending, (state) => {
      state.imageUploading = true
    }).addCase(uploadMaps.fulfilled, (state, action) => {
      state.imageUploading = false
      toast('Images Added Successfully')
    }).addCase(getDate.pending, (state) => {
      state.dateloading = true
    }).addCase(getDate.fulfilled, (state, action) => {
      state.lastPriceUpdateDate = action.payload
      state.dateloading = false
    }).addCase(getUserLogs.pending, (state) => {
      state.logsloading = true
    }).addCase(getUserLogs.fulfilled, (state, action) => {
      state.userLogs = action.payload
      state.logsloading = false
    }).addCase(fetchMembers.pending, (state) => {
      state.membersloading = true
    }).addCase(fetchMembers.fulfilled, (state, action) => {
      state.members = action.payload
      state.membersloading = false
    }).addCase(fetchFinishingItems.pending, (state) => {
      state.finishingItemsloading = true
    }).addCase(fetchFinishingItems.fulfilled, (state, action) => {
      state.finishingItems = action.payload
      state.finishingItemsloading = false
    }).addCase(renameFinishingCategory.pending, (state) => {
      state.finishingItemsloading = true
    })
  }
})



export const ItemManagerActions = itemManagerSlice.actions
export default itemManagerSlice
