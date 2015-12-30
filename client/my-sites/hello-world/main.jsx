/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Main from 'components/main';

export default React.createClass( {
	displayName: 'HelloWorld',
	render() {
		return (
			<Main>
				<h1>Hello, NEW Wordpress.com World!</h1>

				<div>
					<p>For what it doesn, this is a little verbose and convoluted.</p>
					<p>Good effort, however.</p>
					<p>It's never easy to reinvent your software.</p>
				</div>
			</Main>
		);
	}
} );




