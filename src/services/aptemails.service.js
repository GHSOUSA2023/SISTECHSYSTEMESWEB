import { BaseCrudService } from './base-crud.service';

/**
 * Example service showing how to extend BaseCrudService
 * This demonstrates common CRUD operations and custom queries
 */
export class AptEmailService extends BaseCrudService {
  constructor() {
    super('aptemails');
  }


  // Example: Get item by ID with additional validation
  async getItemById(apt) {
    const item = await this.getById(apt);
    if (!item) return null;
    return item;
  }


// Example: Update only the email field with merge
async updateItem(apt, data) {
  const currentItem = await this.getById(apt);
  if (!currentItem) throw new Error('Item not found');
  if (currentItem.isLocked) throw new Error('Item is locked for editing');

  const now = new Date();

  const updatedData = {
    email: typeof data.email === 'string' ? data.email : '',
    metadata: {
      ...currentItem.metadata,
      lastModified: now.toLocaleString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(', ', ' ')
    }
  };

  return this.update(apt, updatedData);
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
export const aptEmailCrudService = new AptEmailService();
