import {SUBMIT_FILTER} from './types';

export function filterHandler(filterText){
    return {
        type: SUBMIT_FILTER,
        payload: filterText
    }
}