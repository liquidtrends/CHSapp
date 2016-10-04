var keystone = require('keystone');
var Types = keystone.Field.Types;;

var Story = new keystone.List('Story',{
  map: { name: 'title' },
  autokey: { from: 'title', path: 'slug', unique: true },
});

Story.add({
  title: { type: String, initial: true, default: '', required: true },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  createdAt: { type: Date, default: Date.now },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
});

Story.defaultSort = '-createdAt';
Story.defaultColumns = 'title', 'createdAt';
Story.schema.virtual('url').get(function() {
  return '/stories/'+this.slug;
});
Story.register();
