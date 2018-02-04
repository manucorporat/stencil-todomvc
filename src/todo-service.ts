import { Todo } from './todo';

const STORAGE_KEY = 'todos-stencil';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.save(this.todos.concat(new Todo(title)));
	}

	editTitle(todo: Todo, newTitle: string): Todo[] {
		return this.edit(todo.id, item => {
			item.title = newTitle;
			return item;
		});
	}

	toggleCompleted(todo: Todo): Todo[] {
		/* TODO change detection does not work with the following todo has to be recreated
		return this.edit(todo.id, item => {
			item.completed = !item.completed;
			return item;
		});
		*/
		return this.edit(todo.id, item => new Todo(item.title, !item.completed, item.id));
	}

	toggleAll(completed: boolean): Todo[] {
		return this.save(this.todos.map(item => new Todo(item.title, completed, item.id)));
	}

	delete(todo: Todo) {
		return this.save(this.todos
			.filter(entry => entry.id !== todo.id)
			// TODO change detection does not work when not recreating all items
			.map(item => new Todo(item.title, item.completed, item.id)),
		);
	}

	clearCompleted(): Todo[] {
		return this.save(this.todos.filter(todo => !todo.completed));
	}

	load(): Todo[] {
		if (window.localStorage) {
			return this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		}
		return this.todos = [];
	}

	private save(todos: Todo[]): Todo[] {
		if (window.localStorage) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
		return this.todos = todos;
	}

	private edit(id: string, change: (todo: Todo) => Todo) {
		return this.save(
			this.todos.map(item => id === item.id ? change(item) : item),
		);
	}
}
