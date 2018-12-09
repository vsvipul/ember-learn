import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

test('should update with matching listings', async function (assert) {
  this.set('filterByCity', (val) =>  {
    if (val === '') {
      return resolve({
        query: val,
        results: ITEMS });
    } else {
      return resolve({
        query: val,
        results: FILTERED_ITEMS });
    }
  });

  await render(hbs`
    {{#list-filter filter=(action filterByCity) as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // fill in the input field with 's'
  await fillIn(this.element.querySelector('.list-filter input'),'s');
  // keyup event to invoke an action that will cause the list to be filtered
  await triggerKeyEvent(this.element.querySelector('.list-filter input'), "keyup", 83);

  return settled().then(() => {
    assert.equal(this.element.querySelectorAll('.city').length, 1, 'One result returned');
    assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
  });
});

test('should filter the list of rentals by city', async function(assert) {
  await visit('/');
  await fillIn('.list-filter input', 'seattle');
  await triggerKeyEvent('.list-filter input', 'keyup', 69);
  assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
  assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
});
