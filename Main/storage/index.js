import AsyncStorage from "@react-native-async-storage/async-storage"

const storeExaminations = async(examinations, tasks, photos = []) => {
    try {
        const jsonExaminations = JSON.stringify(examinations);
        const jsonTasks = JSON.stringify(tasks);
        const jsonPhotos = JSON.stringify(photos);
        
        const examinationsData = ["@examinations", jsonExaminations];
        const tasksData = ["@tasks", jsonTasks];
        const photosData = ["@photos", jsonPhotos];

        await AsyncStorage.multiSet([examinationsData, tasksData, photosData])

    } catch (error) {

    }
}

const readExaminations = async() => {
    try {
        return await AsyncStorage.multiGet(['@examinations', '@tasks', '@accommodation_ip', '@photos'])      
    } catch(e) {

    }
}
  
const removeStorage = async () => {
    const keys = ['@examinations', '@tasks']
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // remove error
    }
}
  
const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    // save error
  }
}

const storeMultipleItems = async(items) => {
  try {
      await AsyncStorage.multiSet(items)

  } catch (error) {

  }
}


const readItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(e) {
    // read error
  }
}
  
export {
  storeExaminations,
  readExaminations,
  storeItem,
  storeMultipleItems,
  readItem,
  removeStorage
}