import { Task_Interface } from './task-interface';

export const Tasks: Task_Interface[] = [
    {
        id: 1,
        name: 'Aufgabe 1',
        description:  'Aufgabenbeschreibung',
        estimated_effort: '4 Stunden',
        start: new Date(),
        end: new Date(),
        previousTask: undefined,
        allocate: ['9b', '9a', 'Verena Steinmeier'],
        subject: undefined,
        materials: undefined,
        model_solution: undefined
    },
    {
          id: 2,
          name: 'Aufgabe 2',
          description:  'Aufgabenbeschreibung amnslkmd aäskldm lakdsm ääkadsm aklsdmaskd maklösdäm äaksdm alkdm alkd',
          estimated_effort: '8 Stunden',
          start: new Date(),
          end: new Date(),
          previousTask: undefined,
          allocate: ['9b', '9a', 'Verena Steinmeier'],
          subject: undefined,
          materials: undefined,
          model_solution: undefined
    },
    {
          id: 3,
          name: 'Aufgabe 3',
          description:  'Das hier ist eine Formel \\formel{\\frac{2}{3}} toll oder?',
          estimated_effort: '8 Stunden',
          start: new Date(),
          end: new Date(),
          previousTask: undefined,
          allocate: ['9b', '9a', 'Verena Steinmeier'],
          subject: undefined,
          materials: undefined,
          model_solution: undefined
    },
    {
          id: 4,
          name: 'Aufgabe 4',
          description:  'Das hier ist eine Formel \\formel{\\frac{2}{3}} toll oder, und noch eine \\formel{ \\pm 15 \\sqrt{ x ^ 2 }} schick!',
          estimated_effort: '8 Stunden',
          start: new Date(),
          end: new Date(),
          previousTask: undefined,
          allocate: ['9b', '9a', 'Verena Steinmeier'],
          subject: undefined,
          materials: undefined,
          model_solution: undefined
    },
    {
          id: 5,
          name: 'Aufgabe 5',
          description:  'Aufgabenbeschreibung',
          estimated_effort: '8 Stunden',
          start: new Date(),
          end: new Date(),
          previousTask: undefined,
          allocate: ['9b', '9a', 'Verena Steinmeier'],
          subject: undefined,
          materials: undefined,
          model_solution: undefined
    }
]