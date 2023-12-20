import { a, td, tr, useAtomSelector, useAtomSetter } from '@rendrjs/core';
import { makeIcon } from './RemoveIcon';
import { dataAtom, selectedAtom } from './store';
 
let icon = makeIcon();
let emptyTd = td({ class: 'col-md-6' });

export let Row = ({ item: { id, label } }) => {
  let setData = useAtomSetter(dataAtom);
  let setSelected = useAtomSetter(selectedAtom);
  let selected = useAtomSelector(selectedAtom, s => s === id);

  return tr({
    class: selected ? 'danger' : undefined,
    slot: [
      td({ class: 'col-md-1', slot: `${id}` }),
      td({
        class: 'col-md-4',
        slot: a({
          onclick: () => setSelected(id),
          slot: label,
        }),
      }),
      td({
        class: 'col-md-1',
        slot: a({
          onclick: () => setData(old => {
            old.splice(old.findIndex(d => d.id === id), 1);
            return [ ...old ];
          }),
          slot: icon,
        }),
      }),
      emptyTd,
    ],
  });
};
