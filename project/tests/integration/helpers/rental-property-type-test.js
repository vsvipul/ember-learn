import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | rental-property-type', function(hooks) {
	setupRenderingTest(hooks);
	test('it renders correctly for a standalone rental', async function(assert) {
		this.set('inputValue', 'Estate');
		await render(hbs`{{rental-property-type inputValue}}`);
		assert.equal(this.element.textContent.trim(), 'Standalone');
	});

	test('it renders correctly for a community rental', async function(assert) {
		this.set('inputValue', 'Apartment');
		await render(hbs`{{rental-property-type inputValue}}`);
		assert.equal(this.element.textContent.trim(), 'Community');
	});
});
