'use strict';

import { Selector } from 'testcafe';

fixture `Getting Started`
	.page `https://freshbroccoli.ru`;

test('My first test', async t => {
	await t
		.typeText('#search__input', 'Купить Дуриан')
		.click('.search__submit')
		.typeText('#search__input', 'Нету ну и довай до свидания!');
});