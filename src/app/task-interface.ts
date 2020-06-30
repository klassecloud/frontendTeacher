export class Task_Interface {
  id: number;
  name: string;
  description: string;
  estimated_effort: string;
  start: Date;
  end: Date;
  previousTask: string;
  allocate: object;
  subject: string;
  materials: object;
  model_solution: object;
  uebung: boolean;
}
