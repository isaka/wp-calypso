/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';
import classNames from 'classnames';
import noop from 'lodash/utility/noop';

/**
 * Internal dependencies
 */
import Site from 'my-sites/site';
import SiteSelector from 'components/site-selector';
import sitesList from 'lib/sites-list';
import Gridicon from 'components/gridicon';

const sites = sitesList();

export default React.createClass( {

	displayName: 'SitesDropdown',

	mixins: [ PureRenderMixin ],

	propTypes: {
		selected: React.PropTypes.oneOfType( [
			React.PropTypes.number,
			React.PropTypes.string
		] ),
		showAllSites: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		onSiteSelect: React.PropTypes.func,
		filter: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			showAllSites: false,
			onClose: noop,
			onSiteSelect: noop
		};
	},

	getInitialState() {
		const primary = sites.getPrimary();
		return {
			selected: this.props.selected || primary && primary.slug
		};
	},

	getSelectedSite() {
		return sites.getSite( this.state.selected );
	},

	selectSite( siteSlug ) {
		this.props.onSiteSelect( siteSlug );
		this.setState( {
			selected: siteSlug,
			open: false
		} );
	},

	render() {
		return (
			<div className={ classNames( 'sites-dropdown', { 'is-open': this.state.open } ) }>
				<div className="sites-dropdown__wrapper">
					<div
						className="sites-dropdown__selected"
						onClick={ () => this.setState( { open: ! this.state.open } ) }
					>
						<Site
							site={ this.getSelectedSite() }
							indicator={ false }
						/>
						<Gridicon icon="chevron-down" />
					</div>
					{ this.state.open &&
						<SiteSelector
							sites={ sites }
							autoFocus={ true }
							onClose={ this.props.onClose }
							onSiteSelect={ this.selectSite }
							selected={ this.state.selected }
							hideSelected={ true }
							filter={ this.props.filter }
						/>
					}
				</div>
			</div>
		);
	}
} );
