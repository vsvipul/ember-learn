import {
	module,
	test
} from 'qunit';
import {
	visit,
	currentURL,
	click
} from '@ember/test-helpers';
import {
	setupApplicationTest
} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | list rentals', function(hooks) {
	setupApplicationTest(hooks);
	setupMirage(hooks);
	test('should show rentals as home page', async function(assert) {
		await visit('/');
		assert.equal(currentURL(), '/rentals', 'should redirect automatically');
	});

	test('should link to info about the company', async function(assert) {
		await visit('/');
		await click(".menu-about");
		assert.equal(currentURL(), '/about', 'should navigate to about');
	});

	test('should link to contact info', async function(assert) {
		await visit('/');
		await click(".menu-contact");
		assert.equal(currentURL(), '/contact', 'should navigate to contact');
	});

	test('should list available rentals', async function(assert) {
		await visit('/');
		assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
	});

	// test ('should filter list of rentals by city', async function(assert){
	//
	// });
	// test ('should show details for a selected rental', async function(assert){
	//
	// });

});
