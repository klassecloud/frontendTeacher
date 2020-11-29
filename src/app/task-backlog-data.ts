import { Task_Interface } from './task-interface';

export const TaskBacklog: Task_Interface[] = [
    {
        id: 1,
        name: 'Aufgabe 27',
        description:  'Aufgabenbeschreibung',
        estimated_effort: '4 Stunden',
        start: new Date(),
        end: new Date(),
        previousTask: undefined,
        allocate: ['9b', '9a', 'Verena Steinmeier'],
        subject: undefined,
        materials: {},
        modelSolution: {},
        uebung: true,
    },
    {
        id: 2,
        name: 'Aufgabe 23 b',
        description:  'Aufgabenbeschreibung amnslkmd aäskldm lakdsm ääkadsm aklsdmaskd maklösdäm äaksdm alkdm alkd',
        estimated_effort: '8 Stunden',
        start: new Date(),
        end: new Date(),
        previousTask: undefined,
        allocate: ['9b', '9a', 'Verena Steinmeier'],
        subject: undefined,
        materials: {},
        modelSolution: {},
        uebung: true,
    }
]