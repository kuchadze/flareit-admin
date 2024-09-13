import { atom } from 'recoil';

export const DeleteState = atom({
    key: 'delete',
    default: false,
});

export const clickState = atom({
    key: 'click',
    default: false,
});
