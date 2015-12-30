/**
 * External dependencies
 */
var React = require( 'react' ),
	PureRenderMixin = require( 'react-pure-render/mixin' );

/**
 * Internal dependencies
 */
var FoldableCard = require( 'components/foldable-card' );

module.exports = React.createClass( {
	displayName: 'FoldableCard',

	mixins: [ PureRenderMixin ],

	render: function() {
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/design/foldable-card">Foldable Card</a>
				</h2>
				<p>
					<FoldableCard header="This is a foldable card">
						These are its contents
					</FoldableCard>
				</p>

				<p>
					<FoldableCard header="This is a compact card" compact>
						I'm tiny! :D
					</FoldableCard>
				</p>
				<p>
					<FoldableCard header="This is a disabled card" disabled>
						You can't see me!
					</FoldableCard>
				</p>
				<p>
					<FoldableCard
						header="This is a foldable card with a custom action icon"
						icon="arrow-down"
						>
						These are its contents
					</FoldableCard>
				</p>
				<p>
					<FoldableCard
						header="This is a compact box with summary"
						summary="Unexpanded Summary"
						expandedSummary="Expanded Summary"
						>
						This is the main content of the card.
					</FoldableCard>
				</p>
				<p>
					<FoldableCard
						header={ <div><div>This is a multiline foldable card</div><div><small> with a summary component & a expanded summary component</small></div></div> }
						summary={ <button className="button">Update</button> }
						expandedSummary={ <button className="button">Update</button> }>
						Nothing to see here. Keep walking!
					</FoldableCard>
				</p>
			</div>
		);
	}
} );
