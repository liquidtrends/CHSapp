var keystone = require('keystone');
var Types = keystone.Field.Types;;

var Page = new keystone.List('Page',{
  map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
  title: { type: String, initial: true, default: '', required: true },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  createdAt: { type: Date, default: Date.now },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
});

Page.defaultSort = '-createdAt';
Page.defaultColumns = 'title', 'createdAt';
Page.schema.virtual('url').get(function() {
  return '/pages/'+this.slug;
});
Page.register();
