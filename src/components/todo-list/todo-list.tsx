import { Component, Element, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

@Component({
	tag: 'todo-list',
})
export class TodoList {

	@Prop() todos: Todo[];
	@State() editing: string | null;

	@Event() todoDeleted: EventEmitter;
	@Event() toggleCompleted: EventEmitter;
	@Event() editTitle: EventEmitter;
	@Event() toggleAll: EventEmitter;

	@Element() el: HTMLElement;

	private allCompleted() {
		return this.todos.every(item => item.completed);
	}

	private deleteTodo(todo: Todo) {
		this.todoDeleted.emit(todo);
	}

	private edit(todo: Todo) {
		this.editing = todo.id;

		setTimeout(() => {
			// set focus on edit item and put cursor to the end
			const editInput = this.el.getElementsByClassName('editing')[0]
				.getElementsByClassName('edit')[0] as HTMLInputElement;
			editInput.focus();
			editInput.selectionStart = editInput.value.length;
		}, 0);
	}

	private onKeyUp(todo: Todo, ev: KeyboardEvent) {
		if (ev.keyCode === ENTER_KEY) {
			this.doneEdit(todo, ev);
		} else if (ev.keyCode === ESCAPE_KEY) {
			this.editing = null;
		}
	}

	private doneEdit(todo: Todo, ev: UIEvent) {
		this.editing = null;
		const newTitle = (ev.target as HTMLInputElement).value.trim();
		if (newTitle && newTitle.length > 0) {
			this.editTitle.emit({ todo, newTitle });
		} else {
			this.deleteTodo(todo);
		}
	}

	private renderTodo(todo: Todo) {
		return (
			<li class={{ completed: todo.completed, editing: todo.id === this.editing }}>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={() => this.toggleCompleted.emit(todo) } />

					<label onDblClick={() => this.edit(todo)}>{todo.title}</label>
					<button class="destroy" onClick={() => this.deleteTodo(todo)}></button>
				</div>
				<input class="edit"
					onBlur={ev => this.doneEdit(todo, ev)}
					onKeyUp={ev => this.onKeyUp(todo, ev)}
					value={todo.title} />
			</li>
		);
	}

	render() {
		return this.todos.length <= 0 ? null : (
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox"
					onClick={() => this.toggleAll.emit(!this.allCompleted())}
					checked={this.allCompleted()} />

				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					{this.todos.map(todo => this.renderTodo(todo))}
				</ul>
			</section>
		);
	}
}
