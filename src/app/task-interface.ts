export interface Task_Interface {
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
}
