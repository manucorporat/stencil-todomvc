exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list'] }
	],
	namespace: 'todo',
	outputTargets: [
		{
			type: 'www',
		}
	]
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
