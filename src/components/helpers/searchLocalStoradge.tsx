import { ITodoSearch, ITodoCreate } from '../types/todo/todo';
import moment from 'moment';

const isDateInRange = (date: string, startDate: string, endDate: string) => {
    const momentDate = moment(date, 'DD.MM.YYYY', true);
    const momentStartDate = moment(startDate, 'DD.MM.YYYY', true);
    const momentEndDate = moment(endDate, 'DD.MM.YYYY', true);

    return momentDate.isBetween(momentStartDate, momentEndDate, null, '[]');
};

export const searchLocalStoradge = (searchData: ITodoSearch) => {
    const lowerCaseSearchPhrase = searchData.searchByPhrase?.toLowerCase();
    const localStorageData = localStorage.getItem('ts-template_tasks');
    const currentDate = moment();

    if (localStorageData) {
        const tasks: ITodoCreate[] = JSON.parse(localStorageData);

        const filteredTasks = tasks.filter((task) => {
        // 1) Пошук за датою
            if (
                searchData.searchByDate &&
                !isDateInRange(searchData.searchByDate, task.dateFrom, task.dateTo)
            ) {
                return false;
            }

        // 2) Пошук за розділом
            if (searchData.searchByPart && task.part !== searchData.searchByPart) {
                return false;
            }

        // 3) Пошук за словом чи фразою
            if (
                lowerCaseSearchPhrase &&
                !(
                    task.subject.toLowerCase().includes(lowerCaseSearchPhrase) ||
                    (task.additionalInfo && task.additionalInfo.toLowerCase().includes(lowerCaseSearchPhrase))
                )
            ) {
                return false;
            }

        // 4) Пошук за статусом
            if (
                searchData.searchByStatus === 'Термін закінчився' &&
                moment(currentDate, 'DD.MM.YYYY', true).isBefore(moment(task.dateTo, 'DD.MM.YYYY', true))
            ) {
                return false;
            }

            if (
                searchData.searchByStatus === 'Виконується' &&
                moment(currentDate, 'DD.MM.YYYY', true).isAfter(moment(task.dateTo, 'DD.MM.YYYY', true))
            ) {
                return false;
            }

            return true;
        });

        if (filteredTasks.length > 0) {
            return filteredTasks;
        } else {
            if (tasks.length > 0) {
                return tasks;
            } else {
                return [];
            }
        }
    }
};