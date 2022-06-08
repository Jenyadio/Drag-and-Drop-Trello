import TaskManager from './taskManager';

const board = document.querySelector('.board');

const taskManager = new TaskManager(board);

taskManager.init();
