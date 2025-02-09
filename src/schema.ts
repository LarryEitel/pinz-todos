// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import { createSchema, table, string, boolean, relationships } from '@rocicorp/zero';

const types = table('type')
	.columns({
		id: string(),
		name: string()
	})
	.primaryKey('id');

const todos = table('todo')
	.columns({
		id: string(),
		title: string(),
		completed: boolean(),
		type_id: string()
	})
	.primaryKey('id');

const todoRelationship = relationships(todos, ({ one }) => ({
	type: one({
		sourceField: ['type_id'],
		destField: ['id'],
		destSchema: types
	})
}));

export const schema = createSchema(1, {
	tables: [types, todos],
	relationships: [todoRelationship]
});

export type Schema = typeof schema;

type AuthData = {
	// The logged-in user.
	sub: string;
};

export const permissions = {};
