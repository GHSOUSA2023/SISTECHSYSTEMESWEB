import { BaseCrudService } from './base-crud.service';

/**
 * Example service showing how to extend BaseCrudService
 * This demonstrates common CRUD operations and custom queries
 */
export class CrudService extends BaseCrudService {
  constructor() {
    super('packages');
  }

  // Example: Get all items with additional filtering
  async getAllActiveItems() {
    const items = await this.getAll();
    // console.log('CrudService - All items:', items); // Debug log
    // Update to filter for non-deleted items instead of active status
    const activeItems = items.filter(item => item.status !== 'deleted');
    // console.log('CrudService - Active items:', activeItems); // Debug log
    return activeItems;
  }

  // Example: Get item by ID with additional validation
  async getItemById(id) {
    const item = await this.getById(id);
    if (!item) return null;
    return item;
  }

  // Example: Create item with additional data
  async createItem(data) {
    const enrichedData = {
      ...data,
      status: 'Received', // Update to match your status convention
      createdAt: Date.now(),
      metadata: {
        createdBy: 'system',
        version: '1.0'
      }
    };
    return this.create(enrichedData);
  }

  // Example: Update with validation and partial updates
  async updateItem(id, data) {
    const currentItem = await this.getById(id);
    if (!currentItem) throw new Error('Item not found');
    if (currentItem.isLocked) throw new Error('Item is locked for editing');

    const updatedData = {
      ...currentItem,
      ...data,
      metadata: {
        ...currentItem.metadata,
        lastModified: Date.now()
      }
    };

    return this.update(id, updatedData);
  }

  // Example: Soft delete implementation
  async softDelete(id) {
    const currentItem = await this.getById(id);
    if (!currentItem) throw new Error('Item not found');
    
    return this.update(id, {
      ...currentItem,
      status: 'deleted', // This will mark it as deleted
      deletedAt: Date.now()
    });
  }

  // Example: Custom queries
  async getItemsByStatus(status) {
    // Update to match case-sensitive status in database
    return this.getFiltered('status', '==', status);
  }

  async searchItems(searchTerm) {
    const items = await this.getAll();
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

// Export singleton instance
export const crudService = new CrudService();
