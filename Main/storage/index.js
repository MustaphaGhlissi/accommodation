import AsyncStorage from "@react-native-async-storage/async-storage"

const storeExaminations = async(examinations) => {
    try {
        const jsonExaminations = JSON.stringify(examinations);
        //const jsonTasks = JSON.stringify(tasks);
        
        const examinationsData = ["@examinations", jsonExaminations]
        //const tasksData = ["@examinationTasks", jsonTasks]

        await AsyncStorage.multiSet([examinationsData])

    } catch (error) {

    }
}

const readExaminations = async() => {
    try {
        return await AsyncStorage.multiGet(['@examinations'])      
    } catch(e) {

    }
}
  
const removeStorage = async () => {
    const keys = ['@examinations']
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // remove error
    }
}
  
  
export {
  storeExaminations,
  readExaminations,
  removeStorage
}