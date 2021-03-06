// export const API_BASE_URL = 'http://localhost:5000/api';
export const API_BASE_URL = '/api';
export const ACCESS_TOKEN = 'accessToken';

export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

// export const brchOptions = [
//     {
//         name: "یک یزد",
//         value: 1
//     },
//     {
//         name: "دو یزد",
//         value: 2
//     },
//     {
//         name: "سه یزد",
//         value: 3
//     }
// ];
// export const unitOptions = [
//     {
//         name: "مالی",
//         value: 1
//     },
//     {
//         name: "فناوری اطلاعات",
//         value: 2
//     },
//     {
//         name: "درآمد",
//         value: 3
//     }];
export const brchOptions = ["اداره کل استان یزد", "یک یزد", "دو یزد", "سه یزد", "چهار یزد", "پنج یزد", "یک اردکان", "میبد", "زارچ", "اشکذر", "تفت","مهریز", "بافق", "ابرکوه", "خاتم", "بهاباد", "دو اردکان"];
export const unitOptions = ["مالی","اداری","آمار","بودجه", "فناوری اطلاعات", "درآمد","فنی","مستمری","نامنویسی","بازرسی"];

export const Actions = {
    Read: 'READ',
    Edit: 'EDIT',
    Delete: 'DELETE',
    Create: 'CREATE',
};

export const Subjects = {
    Todo: 'TODO',
    Header: 'HEADER'
};

export const roles = [
    "ROLE_USER",
    "ROLE_ADMIN",
    "ROLE_ED_BOSS",
    "ROLE_SHOB_BOSS",
    "ROLE_SHOB_UNIT_BOSS"];

export const ConfirmRoles = {
    ROLE_ED_BOSS: "ROLE_ED_BOSS",
    ROLE_SHOB_BOSS: "ROLE_SHOB_BOSS",
    ROLE_SHOB_UNIT_BOSS: "ROLE_SHOB_UNIT_BOSS"
};

export const SRStatus = {
    NEW: "NEW",
    ED_BOSS_CONFIRM: "ED_BOSS_CONFIRM",
    SHOB_BOSS_CONFIRM: "SHOB_BOSS_CONFIRM",
    SHOB_UNIT_BOSS_CONFIRM: "SHOB_UNIT_BOSS_CONFIRM"
};