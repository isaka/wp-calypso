WPORG Data 
=======


### Store
The WPorg Store is responsible for storing the state of plugins from .org so that we don't have to fetch them each time.

####The Data
The data that is stored in the store looks like this:

```
{
	akismet : { // plugin.slug
		author: "Automattic",
		author_url: "http://automattic.com/wordpress-plugins/",
		banners: undefined,
		description: "Akismet checks your comments against the Akismet Web service to see if they look like spam or not.",
		detailsFetched: 1431631567269,
		icon: "//ps.w.org/akismet/assets/icon-256x256.png?rev=969272",
		last_updated: "2015-04-28 2:50pm GMT",
		name: "Akismet",
		num_ratings: "216",
		rating: 92,
		ratings: undefined,
		section: {
			changelog: "stuff",
			description: "<p>Akismet checks your comments against the Akismet Web service to see if they look like spam or not and lets you review the spam it catches under your blog's \"Comments\" admin screen.</p>↵↵<p>Major features in Akismet include:</p>↵↵<ul>↵<li>Automatically checks all comments and filters out the ones that look like spam.</li>↵<li>Each comment has a status history, so you can easily see which comments were caught or cleared by Akismet and which were spammed or unspammed by a moderator.</li>↵<li>URLs are shown in the comment body to reveal hidden or misleading links.</li>↵<li>Moderators can see the number of approved comments for each user.</li>↵<li>A discard feature that outright blocks the worst spam, saving you disk space and speeding up your site.</li>↵</ul>↵↵<p>PS: You'll need an <a href=\"http://akismet.com/get/\">Akismet.com API key</a> to use it.  Keys are free for personal blogs; paid subscriptions are available for businesses and commercial sites.</p>",
			installation: "<p>Upload the Akismet plugin to your blog, Activate it, then enter your <a href=\"http://akismet.com/get/\">Akismet.com API key</a>.</p>↵↵<p>1, 2, 3: You're done!</p>"
		},
		slug: "akismet",
		version: "3.1.1"
	},
	nokismet: null // this plugin doesn't exist in on .org
	}, etc.
}
```

The data is stored in a private variable but can be accessed though the stores public methods.

####Public Methods

**PluginsStore.get( pluginSlug );**

Returns a plugin object or null
---

####Example Component Code:

```
/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var PluginsDataStore = require( 'lib/plugins/wporg-data/store' );

module.exports = React.createClass( { 

	displayName: 'yourComponent',
	
	componentDidMount: function() {
		PluginsDataStore.on( 'change', this.refreshWPorgPlugins );
	},
	
	componentWillUnmount: function() {
		PluginsDataStore.removeListener( 'change', this.refreshWPorgPlugins );
	},

	getInitialState: function() {
		return this.getWPorgPlugins();
	},
	
	getWPorgPlugins: function() {

		return {
			akismet: PluginsDataStore.get( 'akismet' )
		};
	},

	refreshWPorgPlugins: function() {
		this.setState( this.getWPorgPlugins() );
	},
	
	render: function() {
		
	}
	
} );

```

###Actions
Actions update the data stored in WPorg store. 

####Public methods. 

Triggers api call to fetch the plugin data and update the store.

**PluginsDataActions.fetchPluginData( pluginSlug );**

---

####Example Component Code:

```
/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var PluginsDataActions = require( 'lib/plugins/wporg-data/actions' );

module.exports = React.createClass( { 

	displayName: 'yourComponent',
	
	updatePlugin: function() {
		PluginsDataActions.fetchPluginData( this.props.plugin.slug );
	},
	
	render: function() {
		<button onClick={ this.updatePlugin } >Update { this.props.plugin.name }</button>
	}
	
} );

```
