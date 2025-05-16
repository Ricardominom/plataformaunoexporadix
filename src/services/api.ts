// Mock API service that returns data from mocks instead of making actual API calls
import { users } from '../data/users';
import agreementsData from '../data/agreements.json';
import todosData from '../data/todos.json';
import { Agreement } from '../types/agreement';
import { Todo, TodoList } from '../types/todo';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API response structure
const createResponse = (data: any) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
});

// Auth API
export const loginApi = async (email: string, password: string) => {
  await delay(500);
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const { password: _, ...userData } = user;
  return createResponse({
    token: 'mock-jwt-token',
    user: userData
  });
};

// Lists API
export const fetchLists = async () => {
  await delay(300);
  return createResponse(todosData.lists);
};

export const createListApi = async (list: Partial<TodoList>) => {
  await delay(300);
  const newList = {
    id: Math.random().toString(36).substring(2, 9),
    name: list.name || '',
    color: list.color || '#ff9500',
    userId: '1'
  };
  todosData.lists.push(newList);
  return createResponse(newList);
};

export const updateListApi = async (id: string, list: Partial<TodoList>) => {
  await delay(300);
  const index = todosData.lists.findIndex(l => l.id === id);
  if (index === -1) throw new Error('List not found');
  
  todosData.lists[index] = { ...todosData.lists[index], ...list };
  return createResponse(todosData.lists[index]);
};

export const deleteListApi = async (id: string) => {
  await delay(300);
  const index = todosData.lists.findIndex(l => l.id === id);
  if (index === -1) throw new Error('List not found');
  
  todosData.lists.splice(index, 1);
  // Also remove todos associated with this list
  todosData.todos = todosData.todos.filter(t => t.listId !== id);
  return createResponse({ success: true });
};

// Todos API
export const fetchTodos = async () => {
  await delay(300);
  return createResponse(todosData.todos);
};

export const createTodoApi = async (todo: Partial<Todo>) => {
  await delay(300);
  const newTodo = {
    id: Math.random().toString(36).substring(2, 9),
    listId: todo.listId || '1',
    title: todo.title || '',
    completed: todo.completed || false,
    dueDate: todo.dueDate || null,
    priority: todo.priority || 'none',
    notes: todo.notes || '',
    createdAt: new Date().toISOString(),
    userId: '1'
  };
  todosData.todos.push(newTodo);
  return createResponse(newTodo);
};

export const updateTodoApi = async (id: string, todo: Partial<Todo>) => {
  await delay(300);
  const index = todosData.todos.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Todo not found');
  
  todosData.todos[index] = { ...todosData.todos[index], ...todo };
  return createResponse(todosData.todos[index]);
};

export const toggleTodoApi = async (id: string) => {
  await delay(300);
  const index = todosData.todos.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Todo not found');
  
  todosData.todos[index].completed = !todosData.todos[index].completed;
  return createResponse(todosData.todos[index]);
};

export const deleteTodoApi = async (id: string) => {
  await delay(300);
  const index = todosData.todos.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Todo not found');
  
  todosData.todos.splice(index, 1);
  return createResponse({ success: true });
};

// Agreements API
export const fetchAgreements = async () => {
  await delay(300);
  return createResponse({
    data: agreementsData.agreements
  });
};

export const createAgreementApi = async (agreement: Partial<Agreement>) => {
  await delay(300);
  const newAgreement = {
    id: Math.random().toString(36).substring(2, 9),
    element: agreement.element || '',
    responsible: agreement.responsible || '',
    status: agreement.status || 'not_started',
    requestDate: agreement.requestDate || new Date().toISOString(),
    deliveryDate: agreement.deliveryDate || new Date().toISOString(),
    description: agreement.description || '',
    sjRequest: agreement.sjRequest || '',
    sjStatus: agreement.sjStatus || 'not_started',
    listId: agreement.listId || '1'
  };
  agreementsData.agreements.push(newAgreement);
  return createResponse(newAgreement);
};

export const updateAgreementApi = async (id: string, agreement: Partial<Agreement>) => {
  await delay(300);
  const index = agreementsData.agreements.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Agreement not found');
  
  agreementsData.agreements[index] = { ...agreementsData.agreements[index], ...agreement };
  return createResponse(agreementsData.agreements[index]);
};

export const deleteAgreementApi = async (id: string) => {
  await delay(300);
  const index = agreementsData.agreements.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Agreement not found');
  
  agreementsData.agreements.splice(index, 1);
  return createResponse({ success: true });
};

// Default export for general API calls
const api = {
  get: async (url: string) => {
    await delay(300);
    if (url.includes('/agreements')) {
      return createResponse({
        data: agreementsData.agreements
      });
    }
    if (url.includes('/todos')) {
      return createResponse(todosData.todos);
    }
    if (url.includes('/lists')) {
      return createResponse(todosData.lists);
    }
    return createResponse([]);
  },
  post: async (url: string, data: any) => {
    await delay(300);
    if (url.includes('/auth/login')) {
      return loginApi(data.email, data.password);
    }
    if (url.includes('/agreements')) {
      return createAgreementApi(data);
    }
    if (url.includes('/todos')) {
      return createTodoApi(data);
    }
    if (url.includes('/lists')) {
      return createListApi(data);
    }
    return createResponse({ success: true });
  },
  put: async (url: string, data: any) => {
    await delay(300);
    const id = url.split('/').pop();
    if (url.includes('/agreements')) {
      return updateAgreementApi(id || '', data);
    }
    if (url.includes('/todos')) {
      return updateTodoApi(id || '', data);
    }
    if (url.includes('/lists')) {
      return updateListApi(id || '', data);
    }
    return createResponse({ success: true });
  },
  patch: async (url: string, data: any) => {
    await delay(300);
    if (url.includes('/todos') && url.includes('/toggle')) {
      const id = url.split('/').slice(-2)[0];
      return toggleTodoApi(id);
    }
    return createResponse({ success: true });
  },
  delete: async (url: string) => {
    await delay(300);
    const id = url.split('/').pop();
    if (url.includes('/agreements')) {
      return deleteAgreementApi(id || '');
    }
    if (url.includes('/todos')) {
      return deleteTodoApi(id || '');
    }
    if (url.includes('/lists')) {
      return deleteListApi(id || '');
    }
    return createResponse({ success: true });
  }
};

export default api;