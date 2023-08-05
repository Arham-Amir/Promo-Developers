'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '@api/dbConfig'
import { set, get, ref, child, remove } from 'firebase/database'

const initialState = {
  items: [],
  categories: {},
  land: '',

  loading: false
}
