var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Resource Model
 * ==========
 */

var Resource = new keystone.List('Resource', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt'
});

Resource.add({
	title: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
  author: { type: Types.Relationship, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
  publishedAt: Date,
	categories: { type: Types.Relationship, ref: 'ResourceCategory', many: true },
  organization: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  contactPerson: { type: String, required: false },
  email: { type: String, required: false },
  website: { type: String, required: false },
	// categories: { type: Types.Relationship, ref: ResourceCategory', many: true },
});

Resource.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Resource.defaultColumns = 'title';
Resource.register();
