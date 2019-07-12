import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = '/user';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id:string) {
      try {
          const endpoint = `/user/${_id}`;
         return await callApi(endpoint, 'GET');

      } catch (error) {
          throw error;
      }
  }

    async updateFighter(_id:string, user:object) {
        try {
            const endpoint = `/user/${_id}`;
            const apiResult = await callApi(endpoint, 'PUT', user);

            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async deleteFighter(_id:string) {
        try {
            const endpoint = `/user/${_id}`;
            const apiResult = await callApi(endpoint, 'DELETE');

            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

export const fighterService = new FighterService();
