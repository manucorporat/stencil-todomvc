import { Component, Listen, State } from '@stencil/core';
import { Todo, TodoFilter } from '../../todo';
import { TodoService } from '../../todo-service';

@Component({
	tag: 'todo-app',
})
export class TodoApp {

	private todoService = new TodoService();

	@State() todos: Todo[] = this.todoService.load();
	@State() filter: TodoFilter = 'all';

	@Listen('todoDeleted')
	protected todoDeleted(event: CustomEvent<Todo>) {
		this.todos = this.todoService.delete(event.detail as Todo);
	}

	@Listen('toggleCompleted')
	protected toggleCompleted(event: CustomEvent<Todo>) {
		this.todos = this.todoService.toggleCompleted(event.detail);
	}

	@Listen('editTitle')
	protected editTitle(event: CustomEvent<{ todo: Todo; newTitle: string }>) {
		this.todos = this.todoService.editTitle(event.detail.todo, event.detail.newTitle);
	}

	@Listen('toggleAll')
	protected toggleAll(event: CustomEvent<boolean>) {
		this.todos = this.todoService.toggleAll(event.detail);
	}

	@Listen('keyup.enter')
	protected onKeyUp(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;
		const title = input.value.trim();
		if (title !== '') {
			this.todos = this.todoService.add(input.value);
			input.value = '';
		}
	}

	@Listen('window:hashchange')
	private hashChanged() {
		const url = document.location.href;
		this.filter = ((url && url.split('#/')[1]) || 'all') as TodoFilter;
	}

	@Listen('clearCompleted')
	protected clearCompleted() {
		this.todos = this.todoService.clearCompleted();
	}

	componentWillLoad() {
		this.hashChanged();
	}

	protected get filteredTodos(): Todo[] {
		switch (this.filter) {
			case 'active':
				return this.todos.filter(todo => !todo.completed);
			case 'completed':
				return this.todos.filter(todo => todo.completed);
			default:
				return this.todos;
		}
	}

	render() {
		return (
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" autoComplete="on" autoFocus/>
				</header>
				<todo-list todos={this.filteredTodos} />
				{this.todos.length > 0 && <todo-footer todos={this.todos} filter={this.filter} /> }
			</section>
		);
	}
}
