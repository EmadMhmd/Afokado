import { TASK_ADDED, TASK_UPDATED, TASK_DELETED, TASKS_FETCHING_SUCCESS } from '../actions/actionTypes';

const initState = {
    added: false,
    deleted: false,
    updated: false,
    tasks: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case TASK_ADDED:
            return { ...state, added: true }
        case TASK_DELETED:
            return { ...state, deleted: true }
        case TASK_UPDATED:
            return { ...state, updated: true }
        case TASKS_FETCHING_SUCCESS:
            return { ...state , tasks:action.payload }
        default:
            return state;
    }
}