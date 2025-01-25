import { db } from '@/config/firebase-config';
import { ref, get, set, push, update, query, orderByChild, equalTo } from 'firebase/database';

/**
 * Base CRUD Service
 * Provides core CRUD operations using Realtime Database
 * Extend this class to create specific services
 */
export class BaseCrudService {
  constructor(path) {
    this.path = path;
    this.dbRef = ref(db, path);
  }

  async getAll() {
    const snapshot = await get(this.dbRef);
    // console.log('BaseCrudService - Raw snapshot:', snapshot.val()); // Debug log
    const items = snapshot.val() || {};
    const itemsArray = Object.values(items);
    // console.log('BaseCrudService - Transformed items:', itemsArray); // Debug log
    return itemsArray;
  }

  async getById(id) {
    const itemRef = ref(db, `${this.path}/${id}`);
    const snapshot = await get(itemRef);
    return snapshot.val();
  }

  async create(data) {
    const newRef = push(this.dbRef);
    const newItem = { ...data, id: newRef.key };
    await set(newRef, newItem);
    return newItem;
  }

  async update(id, data) {
    const itemRef = ref(db, `${this.path}/${id}`);
    await update(itemRef, data);
    return { ...data, id };
  }

  async delete(id) {
    const itemRef = ref(db, `${this.path}/${id}`);
    await set(itemRef, null);
  }

  async getFiltered(field, operation, value) {
    const filterQuery = query(this.dbRef, orderByChild(field), equalTo(value));
    const snapshot = await get(filterQuery);
    const items = snapshot.val() || {};
    return Object.values(items);
  }
}
