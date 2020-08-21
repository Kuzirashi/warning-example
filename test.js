import { Selector } from 'testcafe';

fixture `Warning examples`;

export const assertClaimJurisdiction = async (
    t,
    conditionIndex,
    claimIndex,
    jurisdictionIndex,
    value
  ) => {
    const selector = Selector('span')
      .withExactText(`Condition ${conditionIndex}`)
      .parent()
      .sibling(1)
      .child(claimIndex)
      .child(1)
      .child(jurisdictionIndex)
      .child()
      .child()
      .child()
      .child()
      .child()
      .withAttribute('class', /singleValue/);
  
    if (value) {
      await t.expect(selector.textContent).eql(value);
    } else {
      await t.expect(selector.exists).notOk();
    }
  };

test.page('./page-first.html')('First example', async t => {
    const claimIndex        = 0;
    const jurisdictionIndex = 0;
    const value             = 'value';

    for (let i = 0; i < 2; i++) {
        await assertClaimJurisdiction(t, 1, claimIndex, jurisdictionIndex, value);
    }
});

test.page('./page-second.html')('Second example', async t => {
    const checkbox = Selector(`#test-checkbox`);

    for (let i = 0; i < 2; i++) {
        await t.expect(checkbox.checked).eql(false).click(checkbox).expect(checkbox.checked).eql(true);

        // reset to make tests pass despite the loop
        await t.click(checkbox);
    }
});