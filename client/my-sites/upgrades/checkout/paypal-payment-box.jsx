/**
 * External dependencies
 */
var assign = require( 'lodash/object/assign' ),
	classNames = require( 'classnames' ),
	React = require( 'react' );

/**
 * Internal dependencies
 */
var analytics = require( 'analytics' ),
	cartValues = require( 'lib/cart-values' ),
	CheckoutThankYou = require( './thank-you' ),
	CountrySelect = require( 'my-sites/upgrades/components/form/country-select' ),
	Input = require( 'my-sites/upgrades/components/form/input' ),
	notices = require( 'notices' ),
	PaymentBox = require( './payment-box' ),
	SubscriptionText = require( './subscription-text' ),
	TermsOfService = require( './terms-of-service' ),
	wpcom = require( 'lib/wp' ).undocumented();

module.exports = React.createClass( {
	displayName: 'PaypalPaymentBox',

	getInitialState: function() {
		return {
			country: null,
			formDisabled: false
		};
	},

	handleToggle: function( event ) {
		event.preventDefault();

		analytics.ga.recordEvent( 'Upgrades', 'Clicked Or Use Credit Card Link' );
		analytics.tracks.recordEvent( 'calypso_checkout_switch_to_card' );
		this.props.onToggle( 'credit-card' );
	},

	handleChange: function( event ) {
		var data = {};
		data[ event.target.name ] = event.target.value;

		this.setState( data );
	},

	setSubmitState: function( submitState ) {
		if ( submitState.error ) {
			notices.error( submitState.error );
		}
		if ( submitState.info ) {
			notices.info( submitState.info );
		}

		this.setState( {
			formDisabled: submitState.disabled
		} );
	},

	getLocationOrigin: function( l ) {
		return l.protocol + '//' + l.hostname + ( l.port ? ':' + l.port : '' );
	},

	redirectToPayPal: function( event ) {
		var cart, transaction, dataForApi,
			origin = this.getLocationOrigin( window.location );
		event.preventDefault();

		cart = this.props.cart;
		transaction = this.props.transaction;

		this.setSubmitState( {
			info: this.translate( 'Sending details to PayPal' ),
			disabled: true
		} );

		dataForApi = assign( {}, this.state, {
			successUrl: origin + this.props.redirectTo,
			cancelUrl: origin + '/checkout/' + this.props.selectedSite.slug,
			cart: cart,
			domainDetails: transaction.domainDetails
		} );

		// get PayPal Express URL from rest endpoint
		wpcom.paypalExpressUrl( dataForApi, function( error, paypalExpressURL ) {
			var errorMessage;
			if ( error ) {
				if ( error.message ) {
					errorMessage = error.message;
				} else {
					errorMessage = this.translate( 'Please specify a country and postal code.' );
				}

				this.setSubmitState( {
					error: errorMessage,
					disabled: false
				} );
			}

			if ( paypalExpressURL ) {
				this.setSubmitState( {
					info: this.translate( 'Redirecting you to PayPal' ),
					disabled: true
				} );
				analytics.ga.recordEvent( 'Upgrades', 'Clicked Checkout With Paypal Button' );
				analytics.tracks.recordEvent( 'calypso_checkout_with_paypal' );
				CheckoutThankYou.setLastTransaction( {
					cart: cart,
					selectedSite: this.props.selectedSite
				} );
				window.location = paypalExpressURL;
			}
		}.bind( this ) );
	},

	renderButtonText: function() {
		if ( cartValues.cartItems.hasRenewalItem( this.props.cart ) ) {
			return this.translate( 'Purchase %(price)s subscription with PayPal', {
				args: { price: this.props.cart.total_cost_display },
				context: 'Pay button on /checkout'
			} );
		}

		return this.translate( 'Pay %(price)s with PayPal', {
			args: { price: this.props.cart.total_cost_display },
			context: 'Pay button on /checkout'
		} );
	},

	content: function() {
		return (
			<form onSubmit={ this.redirectToPayPal }>
				<div className="payment-box-section">
					<CountrySelect
						additionalClasses="checkout-field"
						name='country'
						label={ this.translate( 'Country', { textOnly: true } ) }
						countriesList={ this.props.countriesList }
						value={ this.state.country }
						onChange={ this.handleChange }
						disabled={ this.state.formDisabled }
						eventFormName="Checkout Form" />
					<Input
						additionalClasses="checkout-field"
						name="postal-code"
						label={ this.translate( 'Postal Code', { textOnly: true } ) }
						onChange={ this.handleChange }
						disabled={ this.state.formDisabled }
						eventFormName="Checkout Form" />
				</div>

				<TermsOfService />

				<div className="payment-box-actions">
					<div className="pay-button">
						<button type='submit' className="button is-primary button-pay" disabled={ this.state.formDisabled }>
							{ this.renderButtonText() }
						</button>
						<SubscriptionText cart={ this.props.cart } />
					</div>

					{ cartValues.isCreditCardPaymentsEnabled( this.props.cart ) &&
						<a href="" className="credit-card-payment-box__switch-link" onClick={ this.handleToggle }>
							{ this.translate( 'or use a credit card', {
								context: 'Upgrades: PayPal checkout screen',
								comment: 'Checkout with PayPal -- or use a credit card'
							} ) }
						</a> }
				</div>
			</form>
		);
	},

	render: function() {
		var classSet = classNames( {
			'paypal-payment-box': true,
			selected: this.props.selected === true
		} );

		return (
			<PaymentBox
				classSet={ classSet }
				title={ this.translate( 'Secure Payment with PayPal' ) }>
				{ this.content() }
			</PaymentBox>
		);
	}
} );
