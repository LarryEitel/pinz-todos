import {
	createSchema,
	definePermissions,
	ExpressionBuilder,
	Row,
	NOBODY_CAN,
	ANYONE_CAN,
	table,
	string,
	boolean,
	number,
	relationships,
} from "@rocicorp/zero";


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

// The contents of your decoded JWT.
type AuthData = {
	sub: string | null;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	const allowIfLoggedIn = (
		authData: AuthData,
		{ cmpLit }: ExpressionBuilder<Schema, keyof Schema["tables"]>
	) => cmpLit(authData.sub, "IS NOT", null);

	const allowIfMessageSender = (
		authData: AuthData,
		{ cmp }: ExpressionBuilder<Schema, "message">
	) => cmp("senderID", "=", authData.sub ?? "");

	return {
		medium: {
			row: {
				insert: NOBODY_CAN,
				update: {
					preMutation: NOBODY_CAN,
				},
				delete: NOBODY_CAN,
			},
		},
		user: {
			row: {
				insert: NOBODY_CAN,
				update: {
					preMutation: NOBODY_CAN,
				},
				delete: NOBODY_CAN,
			},
		},
		message: {
			row: {
				// anyone can insert
				insert: ANYONE_CAN,
				// only sender can edit their own messages
				update: {
					preMutation: [allowIfMessageSender],
				},
				// must be logged in to delete
				delete: [allowIfLoggedIn],
			},
		},
	};
});
