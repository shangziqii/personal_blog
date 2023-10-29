// ActionTypes
// 用于定义和导出Redux的action

export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';

// Action Creators
export const setScrollPosition = (textId: number, scrollPosition: string) => ({
    type: SET_SCROLL_POSITION,
    payload: {
        textId,
        scrollPosition,
    },
});