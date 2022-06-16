import axios from "axios";

export default class BannerService {
  static async getAll(id){
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
      
      return response.data
    }catch(e){
      console.log(e);
    }
  }
}




 

