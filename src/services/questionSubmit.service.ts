import { callApi } from './http.service';
import { API } from '@utils/enums';
import { IQuestion } from '@/interfaces';


class QuestionSubmitService{
    submitQuestion = async (questionDetailsPayload:IQuestion) => {
      const url = `question/write/insert-or-update`;
      return await callApi(url, API.POST,questionDetailsPayload );
    }
}

export const QuestionSubmitServiceInstance = new QuestionSubmitService();