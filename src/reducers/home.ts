import { createAction, handleActions } from 'redux-actions'
const HOMEDATA = 'a'

interface defaultStateType {
    a: string
}

const defaultState: defaultStateType = {
    a: '1'
}

export const HOMEDATAACTION = createAction(
    HOMEDATA,
    async (payload: string): Promise<any> => {
        return new Promise((resolve: any, reject: any): void => {
            resolve({
                a: payload
            })
        })
    }
)

export default handleActions(
    {
        [HOMEDATA](state: any, action: any) {
            return {
                ...state,
                ...action.payload
            }
        }
    },
    defaultState
)
