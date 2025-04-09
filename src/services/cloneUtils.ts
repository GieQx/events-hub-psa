
import { generateId } from './cmsUtils';

/**
 * Creates a clone of an item with a new ID
 * @param item The object to clone
 * @param nameProperty The property name to modify (usually "title" or "name")
 * @returns A cloned object with a new ID
 */
export const cloneItem = <T extends { id: string }>(
  item: T, 
  nameProperty: keyof T = 'title' as keyof T
): T => {
  const newId = generateId();
  
  const result = {
    ...item,
    id: newId,
  } as T;
  
  // If the item has a name/title property, add "(Copy)" to it
  if (nameProperty in item) {
    const originalValue = item[nameProperty];
    if (typeof originalValue === 'string') {
      result[nameProperty] = `${originalValue} (Copy)` as any;
    }
  }
  
  return result;
};

/**
 * Takes an array of items and clones the one with the matching ID
 * @param items Array of items
 * @param idToClone ID of the item to clone
 * @param nameProperty The property name to modify (usually "title" or "name")
 * @returns New array with the cloned item added
 */
export const cloneItemInArray = <T extends { id: string }>(
  items: T[], 
  idToClone: string,
  nameProperty: keyof T = 'title' as keyof T
): T[] => {
  const itemToClone = items.find(item => item.id === idToClone);
  
  if (!itemToClone) {
    return items;
  }
  
  const clonedItem = cloneItem(itemToClone, nameProperty);
  return [...items, clonedItem];
};
