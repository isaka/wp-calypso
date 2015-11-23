/**
 * External dependencies
 */
import { expect } from 'chai';
import Dispatcher from 'dispatcher';
import defer from 'lodash/function/defer';
import find from 'lodash/collection/find';

/**
 * Internal dependencies
 */
import { action as actionTypes } from 'lib/upgrades/constants';
import PurchasesStore from '../store';

describe( 'Purchases Store', () => {
	it( 'should return an object with the list of purchases when fetching completed', done => {
		Dispatcher.handleServerAction( {
			type: actionTypes.PURCHASES_USER_FETCH_COMPLETED,
			purchases: [ { id: 1 }, { id: 2 } ]
		} );

		defer( () => {
			Dispatcher.handleServerAction( {
				type: actionTypes.PURCHASES_SITE_FETCH_COMPLETED,
				purchases: [ { id: 2 }, { id: 3 } ]
			} );

			expect( PurchasesStore.get() ).to.be.eql( {
				data: [ { id: 2 }, { id: 3 }, { id: 1 } ],
				error: null,
				hasLoadedFromServer: true,
				isFetching: false
			} );

			done();
		} );
	} );
} );
